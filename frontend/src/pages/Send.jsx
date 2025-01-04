import React, { useState } from 'react';
import { Heading } from '../Components/Heading';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Send() {
    const [value, setValue] = useState(0);
    const location = useLocation();
    const user = location.state.user;
    const token = localStorage.getItem("token")

    const handleClick = async (e) => {
            e.preventDefault();
            const response = await axios.post("http://localhost:3001/api/v1/account/transfer",  {
                 
                    to: user.id,
                    amount: parseInt(value)
                },
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }})
            if(response.data.message === "Transfer Successful"){
                alert("Transfer successful")
            }
            else{
                alert("Insufficient balance/invalid Account")
            }   
        } 
    

    return (
        <div className="bg-slate-200 h-screen w-screen flex justify-center items-center">
            <div className="bg-white border-solid border-2 h-[400px] w-96 rounded-xl p-2 px-8">
                <Heading label={"Send Money"} />
                <div className="flex p-1 mt-7">
                    <div className="bg-green-400 h-11 w-11 rounded-full flex justify-center">
                        <p className="font-bold text-xl ml-2 mt-1.5 mr-2">{user.firstName[0]}</p>
                    </div>
                    <div className="font-bold mt-1 ml-1 text-xl p-1">{user.firstName}</div>
                </div>
                <div className="mt-4">
                    <div className="font-medium">Amount (In Rs)</div>
                    <div className="my-2">
                        <input
                            onChange={(e) => setValue(e.target.value)}
                            type="number"
                            placeholder="Enter Amount"
                            className="w-full px-2 py-1 border border-slate-300 rounded"
                        />
                    </div>
                </div>
                <div className="flex flex-col mt-8">
                    <button
                        onClick={handleClick}
                        className="bg-black text-white p-2 rounded-md font-medium shadow-md mt-2"
                    >
                        Initiate Transfer
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Send;
