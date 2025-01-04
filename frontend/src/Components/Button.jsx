import React from 'react'
import { useNavigate } from "react-router-dom";

export function Button({label ,user}) {
    
    const navigate = useNavigate();
    function handleClick() {
        navigate("/send",   {state:{user}});
    }
  return (
    <div className="flex flex-col mt-8">
            <button
              onClick={handleClick}
              className="bg-black text-white p-2 rounded-md
          font-medium shadow-md mt-2"
            >
              {label}
            </button>
          </div>
  )
}

