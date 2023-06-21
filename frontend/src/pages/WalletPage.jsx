import React from "react"
import { useNavigate, useLocation, Navigate } from "react-router-dom"
import { LoginContext } from "../App"
import useFetch from "../hooks/UseFetch"



export default function WalletPage() {

    const navigate = useNavigate()
    const location = useLocation()

    const [loggedIn, setLoggedIn] = React.useContext(LoginContext)
    const username = localStorage.getItem('username')

    // USER DETAILS 
    const {request: userInfo, updateData, data: {user} = {}, errorStatus} = useFetch(`http://127.0.0.1:8000/api/user/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access')
        },
    })

    // USER TRANSACTIONS
    const {request, data: {transactions} = {}} = useFetch(`http://127.0.0.1:8000/api/transactions/${username}`, {
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
    }, [])

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

    const elements = transactions
        ? transactions.map(transaction => {
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
                <div className="transaction--container" onClick={() => transaction.note && console.log(transaction.note)} key={transaction.id}>
                    <div>
                        {transaction.transaction_type}
                    </div>
                    <div>
                        {'$' + transaction.amount}
                    </div>
                    <div>
                    {transaction.note ? transaction.note.substring(0, 15) + '...' : ''}
                    </div>
                    <div>
                        {formattedDate}
                    </div>
                </div>
            )
        })
        : <></>

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
                    required
                    readOnly
                    onChange={handleChange}
                    autoComplete="off"
                    id="balance" 
                    type="number" 
                    name="balance"
                    value={form.balance}
                ></input>
            </div>

            <div className="button--group">
                <div className="currency--button">
                    <button>Add Cash</button>
                </div>
                <div className="currency--button">
                    <button>Withdraw Cash</button>
                </div>
            </div>

            <hr />
        </div>
        <div className="mobile--container">
            {elements}
        </div>
        </>
    )
}
{/* <div className="input--container">
    <label 
        className="label--text"
        htmlFor="addCash"
    >
    Add Cash
    </label>

    <input 
        required
        onClick={handleCashState}
        onChange={handleChange}
        autoComplete="off"
        id="addCash" 
        type="number" 
        name="addCash"
        value={form.addCash}
    ></input>
</div>

<div className="input--container">
    <label 
        className="label--text"
        htmlFor="withdraw"
    >
    Withdraw Cash
    </label>

    <input 
        required
        onClick={handleCashState}
        onChange={handleChange}
        autoComplete="off"
        id="withdraw" 
        type="number" 
        name="withdraw"
        value={form.withdraw}
    ></input>
</div> */}