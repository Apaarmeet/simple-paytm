import React from 'react'
import { useEffect, useState } from 'react'
import { AppBar } from '../Components/AppBar'
import { Balance } from '../Components/Balance'
import { Users } from '../Components/Users'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

function Dashboard() {
    const token = localStorage.getItem("token")
    const location = useLocation();
    const [balance, setBalance] = useState()
    console.log(balance)
    useEffect(() => { axios.get("http://localhost:3001/api/v1/account/balance", {
            params: { userId: JSON.stringify(location.state.id) },
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setBalance(res.data.balance)
        })
    }), []



    return (
        <div>
            <AppBar />
            <Balance value={parseInt(balance)} />
            <Users />
        </div>
    )
}

export default Dashboard
