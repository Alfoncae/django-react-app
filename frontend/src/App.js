import './App.css';
import axios from 'axios';
import React from 'react';

function App() {

  const [transactions, setTransactions] = React.useState([])
  const [users, setUsers] = React.useState([])

  React.useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/transactions/')
      .then(response => {
        setTransactions(response.data)
      })
      .catch(error => console.error(error));
  }, []); // the empty array ensures the useEffect hook only runs once, after the initial render.

  React.useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/users/')
      .then(response => {
        setUsers(response.data)
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="App">
      <h2>Lorem</h2>
      {transactions.map(transaction => {
        const user = users.find(user => user.id === transaction.user);
        return (
          <div key={transaction.id}>
            <h3>{user ? user.username : 'Unknown User'} - {transaction.amount}</h3> 
            <h4>{transaction.note}</h4>
          </div>
        )
      })}
    </div>
  );
}

export default App;