import axios from 'axios'
import React from 'react'


export default function HomePage() {

    const getTran = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/transactions/')
        console.log(response)
    }
    return (
        <>
            {getTran}
        </>
    )
} 