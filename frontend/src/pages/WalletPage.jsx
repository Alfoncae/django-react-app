import React from "react"
import { useNavigate, useLocation, Navigate } from "react-router-dom"
import { LoginContext } from "../App"
import useFetch from "../hooks/UseFetch"
import AddModal from "../components/AddModal"
import WithdrawModal from "../components/WithdrawModal"



export default function WalletPage() {

    const navigate = useNavigate()
    const location = useLocation()

    const [loggedIn, setLoggedIn] = React.useContext(LoginContext)
    const username = localStorage.getItem('username')
    const [currentPage, setCurrentPage] = React.useState(1);

    // USER DETAILS 
    const {request: userInfo, updateData, data: {user} = {}, errorStatus} = useFetch(`http://127.0.0.1:8000/api/user/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access')
        },
    })

    // USER TRANSACTIONS
    const {request, data: {results, next, previous} = {}} = useFetch(`http://127.0.0.1:8000/api/transactions/${username}?page=${currentPage}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access')
        },
    })

    // calls fetch function
    React.useEffect(() => {
        userInfo();
        request();
    }, [currentPage])

    // form state
    const [form, setForm] = React.useState({
        balance: '',
        addCash: '',
        withdraw: ''
    })


    // value presets
    React.useEffect(() => {

        if (user){
            setForm(oldForm => {
                return {
                    ...oldForm,
                    balance: user.balance
                }
            })
        }
    }, [user])


    function handleChange(event){
        setForm(oldForm => {
            return{
                ...oldForm,
                [event.target.name]: [event.target.value]
            }
        })
    }

    
    
    const handleNext = () => {
        if (next) {
            setCurrentPage(currentPage + 1); // Increase currentPage by 1
        }
    };
    
    const handlePrevious = () => {
        if (previous) {
            setCurrentPage(currentPage - 1);  // Decrease currentPage by 1
        }
    };
    
    const elements = results
        ? results.map(transaction => {
            if (transaction.transaction_type === 'EX'){
                transaction.transaction_type = 'Expense'
            } else if (transaction.transaction_type === 'IN'){
                transaction.transaction_type = 'Income'
            } else if (transaction.transaction_type === 'SA'){
                transaction.transaction_type = 'Savings';
            }


            let date = new Date(transaction.created);  // assuming transaction.created is in a valid date format
            let formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
            
            return (
                <div className="transaction--container" key={transaction.id}>
                    <div>
                        {transaction.transaction_type}
                    </div>
                    <div>
                        {'$' + transaction.amount}
                    </div>
                    <div>
                    {transaction.note ? transaction.note.substring(0, 15) + '...' : 'no details'}
                    </div>
                    <div>
                        {formattedDate}
                    </div>
                </div>
            )
        })
        : <></>

    let leftArrow = '\u2190';
    let rightArrow = '\u2192';

    return (
        <>
        <div className="mobile--container">
            <div className="page--title">Wallet</div>
            <div className="input--container">
                <label 
                    className="label--text"
                    htmlFor="balance"
                >
                Balance
                </label>
                <input 
                    readOnly
                    id="balance" 
                    type="number" 
                    name="balance"
                    value={form.balance}
                ></input>
            </div>

            <div className="button--group">
                <AddModal />
                <WithdrawModal />
            </div>
            <hr />
        </div>
        <div className="mobile--container">
            {elements}
            <div className="pagination--button">
                <button disabled={!previous} onClick={handlePrevious}>{leftArrow}</button>
                <button disabled>{currentPage}</button>
                <button disabled={!next} onClick={handleNext}>{rightArrow}</button>
            </div>
        </div>
        </>
    )
}