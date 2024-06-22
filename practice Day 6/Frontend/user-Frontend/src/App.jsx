import { useState } from 'react'
import FormInput from './components/FormInput'
import FormButton from './components/FormButton'
import { createUser } from './utils/api'
import { addUser } from './Store/Slice/userSlice'
import { useSelector,useDispatch } from 'react-redux'

function App() {
const[data,setData]=useState({name:"",email:"",password:""})
const dispatch=useDispatch()
const handleChange=(e)=>{
  const{name,value}=e.target
  setData({...data,[name]:value})
}

const handleSubmit=async(e)=>{
  e.preventDefault()
  console.log(data)
  const response=await createUser(data)
  if(response.status===201){
    dispatch(addUser(response.data))
    setData({name:"",email:"",password:""})
  }
}

  return (
    <>
     <h1 className=' text-[25px] text-center text-blue-300 uppercase p-3'>User Creation App With Backend</h1>
    <div className='w-2/4 mx-auto'>
    <FormInput label="Name" type="text" name="name" placeholder="Enter Your Name" value={data.name} required onChange={handleChange}  />
    <FormInput label="Email" type="email" name="email" placeholder="Enter your Email" value={data.email} required onChange={handleChange} />
    <FormInput label="Password" type="text" name="password" placeholder="Enter your Password" value={data.password} required onChange={handleChange} />
    <FormButton  text="Add User" onClick={handleSubmit}/>
    </div>
    </>
  )
}

export default App
