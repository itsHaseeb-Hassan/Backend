import React from 'react'

const FormButton = ({text,onClick}) => {
  return (
    <div>
        <button onClick={onClick} type="submit" className=" mt-3 p-3 w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            {text}
        </button>
    </div>
  )
}

export default FormButton