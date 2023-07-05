import { useState } from 'react';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useFetch from "../hooks/UseFetch"

function WithdrawModal() {
  const [show, setShow] = useState(false);
  const [form, setForm] = React.useState({
    withdraw: ''
  })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const username = localStorage.getItem('username')

  const {request, updateBalance, data: {user} = {}, errorStatus} = useFetch(`http://127.0.0.1:8000/api/user/${username}`, {
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
    const expense = 'EX'
    setShow(false)
    updateBalance(form.withdraw, expense);
    setForm({
        withdraw: ''
    });
}


  return (
    <>
      <div className="currency--button" onClick={handleShow}>
          <button>Withdraw Cash</button>
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
            <input 
              type="number" 
              autoFocus
              required
              name="withdraw"
              value={form.withdraw}
              onChange={handleChange}
            />
          </div>
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

export default WithdrawModal;