import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { LoginContext } from "../App";
import useFetch from "../hooks/UseFetch";
import SaveModal from "../components/SaveModal";

export default function HomePage() {

    const [loggedIn, setLoggedIn] = React.useContext(LoginContext)
    const username = localStorage.getItem('username')

    const [form, setForm] = React.useState({
        savings: '',
        addSavings: ''
    })

    // USER DETAILS 
    const {request: userInfo, updateData, data: {user} = {}, errorStatus} = useFetch(`http://127.0.0.1:8000/api/user/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access')
        },
    })

    const {request, data: {transactions} = {}} = useFetch(`http://127.0.0.1:8000/api/transactions/today/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access')
        },
    });

    React.useEffect(() => {
        request();
        userInfo();
    }, [form])

    // value presets
    React.useEffect(() => {
        if (user){
            setForm(oldForm => {
                return {
                    ...oldForm,
                    savings: user.savings,
                }
            })
        }
    }, [user])

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

    return (
        <>
        <div className="mobile--container">
            <div className="page--title">Home</div>
            <div className="input--container">
                <label 
                    className="label--text"
                    htmlFor="balance"
                >
                Savings
                </label>
                <input 
                    readOnly
                    id="balance" 
                    type="number" 
                    name="balance"
                    value={form.savings}
                ></input>
            </div>
        <SaveModal />
        </div>
        <br />
        <div className="mobile--container">
            Today's transactions
            {elements}
        </div>
        </>
    )
}
