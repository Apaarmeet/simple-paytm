import React from 'react'

export function InputBox({label,placeholder,type,onchange}) {
  return (
    <div className='flex flex-col mt-5'>
    <label className='font-semibold' >{label}</label>
    <input onChange={onchange} type={type} placeholder={placeholder} className='mt-1x border p-1 rounded-md shadow-md mt-2' />
  </div>
  )
}
