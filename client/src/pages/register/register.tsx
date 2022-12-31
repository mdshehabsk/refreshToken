import './register.css'
import {Link,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications'
const Register = () => {
   const { addToast } = useToasts()
   const navigate = useNavigate()
  const [value,setValue] = useState({
    email:'',
    password:'',
    cpassword:''
  })
  function inputChange (e:any) {
    setValue({
      ...value,
      [e.target.name]:e.target.value
    })
  }
  const rgSubmit = async (e:any) => {
     try {
         e.preventDefault()
      const {data} = await axios.post('http://localhost:4000/auth/local/signup',value)
      addToast(data.message,{appearance:'success',autoDismiss:true})
      navigate('/login')
     } catch (error:any) {
       const err = error.response.data
       addToast(err.message,{appearance:'error',autoDismiss:true})
     }  }
  const {email,password,cpassword} = value
  return (
    <div className="register-page">
    <div className="form">
      <form className="register-form" onSubmit={rgSubmit} >
        <input type="text" placeholder="email address" name='email'  value={email} onChange={inputChange} />
        <input type="password" placeholder="password" name='password' value={password} onChange={inputChange} />
        <input type="password" placeholder="confirm password" name='cpassword' value={cpassword} onChange={inputChange} />
        <button>create</button>
        <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
      </form>
    </div>
  </div>
  )
}

export default Register