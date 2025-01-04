import React, { useState,useEffect } from 'react'
import { Button } from './Button'
import axios from 'axios'



export function Users() {
    const[user,setUser] = useState([])
    const [search, setSearch] = useState('')

    useEffect( () => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/api/v1/user/bulk', {
                params: {
                  filter: search
                }
              })
            setUser(response.data.users)
        }
        fetchData();
      }, [search]);

      
     
  return <>
    <div className='m-3'>
    <div className='font-bold text-lg'>Users</div>
    <div className='my-2'>
        <input onChange={(evt) => { 
            setSearch( evt.target.value) 
            }} type="text" placeholder='Search Users...' className='w-full px-2 py-1 border border-slate-300 rounded'></input>
    </div>
        {user.map((user)=><User  user={user} />)}
    </div>
</> 
}

function User({ user }) {
    
    return <div className='flex justify-between'>
        <div className='flex p-1'>
            <div className='bg-gray-300 h-8 w-8  rounded-full flex justify-center '>
                <p className='font-medium ml-2 mt-1 mr-2'>{user.firstName[0]}</p>
            </div>
                <div className='font-semibold mt-1 ml-1'>{user.firstName} {user.lastName}</div>
        </div>
        <div className='-mt-8'>
        <Button  label={"Send Money"} user={user} />
        </div>
    </div>
}
