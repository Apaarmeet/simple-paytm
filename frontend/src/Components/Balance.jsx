import React from 'react'

export function Balance({value}) {
    return (
        <div className='flex m-3'>
            <p className='font-semibold'>Your Balance:</p>
            <div className='font-medium ml-2'>Rs {value}</div>
        </div>
    )
}

