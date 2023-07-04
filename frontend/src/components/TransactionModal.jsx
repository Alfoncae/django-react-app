import { useState } from 'react';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useFetch from "../hooks/UseFetch"

function TransactionModal() {
  const [show, setShow] = useState(false);
  const [form, setForm] = React.useState({
    amount: '',
    category: '',
    type: '',
    note: ''
  })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const username = localStorage.getItem('username')

  const {request, makeTransaction, data: {user} = {}, errorStatus} = useFetch(`http://127.0.0.1:8000/api/user/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access')
        },
    })

  React.useEffect(() => {
    request()
  }, [])

  function handleChange(event){
    setForm(oldForm => {
        return {
            ...oldForm,
            [event.target.name]: event.target.value
        }
    })
  }

  function handleSubmit(){
    makeTransaction(form);
    setForm({
      amount: '',
      category: '',
      type: '',
      note: ''
    });
}

  return (
    <>
      <div className="currency--button" onClick={handleShow}>
          <button>Upload Transaction</button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body className="modal--body">
          <div className="input--container">
          <label htmlFor="amount">Amount</label>
            <input 
              type="number" 
              autoFocus
              required
              autoComplete='off'
              name="amount"
              value={form.amount}
              onChange={handleChange}
            />
          </div>
          
          <div className="input--container">
          <label htmlFor="category">Category</label>
            <input 
              type="text" 
              required
              autoComplete='off'
              name="category"
              value={form.category}
              onChange={handleChange}
            />
          </div>

          <div className="input--container">
          <label htmlFor="note">Note</label>
            <input 
              type="text" 
              autoComplete='off'
              required
              name="note"
              value={form.note}
              onChange={handleChange}
            />
          </div>

          <select 
            name="type" 
            className="input--container"
            value={form.type}
            onChange={handleChange}
          >
            <option disabled>Type</option>
            <option value="IN">Income</option>
            <option value="EX">Expense</option>
            <option value="SA">Saving</option>
          </select>
          
        </Modal.Body>
        <Modal.Footer className="modal--footer">
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
            <Button onClick={handleSubmit} variant="dark">Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TransactionModal;