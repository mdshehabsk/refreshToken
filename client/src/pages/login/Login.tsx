
import './login.css'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications'

const Login = () => {
  const {addToast} = useToasts()
  const navigate = useNavigate()
  const [value,setValue] = useState({
    email:'',
    password:'',
  })
  function inputChange (e: any){
    setValue({
      ...value,
      [e.target.name]:e.target.value
    })
  }
   async function lgSubmit(e:any){
    try {
      e.preventDefault()
    const {data} = await axios.post('http://localhost:4000/auth/local/signin',value)
    localStorage.setItem('session',JSON.stringify(data))
    addToast('login successfull',{appearance:'success',autoDismiss:true})
    navigate('/')
    } catch (error:any) {
     const err = error.response.data
       addToast(err.message,{appearance:'error',autoDismiss:true})
    }
      }
  const {email,password} = value
  return (
    <div className="login-page">
  <div className="form">
    <form className="login-form" onSubmit={lgSubmit} >
    <input type="text" placeholder="email address" name='email'  value={email} onChange={inputChange} />
        <input type="password" placeholder="password" name='password' value={password} onChange={inputChange} />
      <button>login</button>

      <p className="message">Not registered? <Link to="/register">Create an account</Link></p>
    </form>
  </div>
</div>
  )
}

export default Login