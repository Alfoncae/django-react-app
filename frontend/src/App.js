import axios from 'axios';
import React from 'react';
import LogIn from './components/Login';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';


// Capitalizes first letter
function capitalizeFirstLetter(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}


function App() {

  const [transactions, setTransactions] = React.useState([])
  const [users, setUsers] = React.useState([])

  // TRANSACTIONS API
  React.useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/transactions/')
      .then(response => {
        setTransactions(response.data)
      })
      .catch(error => console.error(error));
  }, []);

  // USERS API
  React.useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/users/')
      .then(response => {
        setUsers(response.data)
      })
      .catch(error => console.error(error));
  }, []);

  // ELEMENTS FOR TRANSACTIONS
  const transactionsElements = transactions.map(transaction => {
    const user = users.find(user => user.id === transaction.user);
    return (
      <div key={transaction.id}>
        <h3>{user ? capitalizeFirstLetter(user.username) : 'Unknown User'} - {transaction.amount}</h3> 
        <h4>{transaction.note}</h4>
      </div>
    )
  })

  const [isLoggingIn, setIsLoggingIn] = React.useState(true)

  function changeForm() {
    setIsLoggingIn(oldState => !oldState);
  }

  return (
    <div className="App">
      <Navbar />
      <div onClick={changeForm}>Change form</div>
      {isLoggingIn ? <LogIn /> : <SignUp />}
    </div>
  );
}

export default App;