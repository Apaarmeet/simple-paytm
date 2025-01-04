import React from 'react'
import { Link } from 'react-router-dom'

export function BottomWarning({label,to,buttonText}) {
  return (
    <div className="mt-8 flex justify-center">
          <p>
            {label}
            <Link className="font-medium hover:underline" to ={to}>{buttonText}</Link>
          </p>
        </div>
  )
}

