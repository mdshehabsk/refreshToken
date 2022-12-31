import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import Axios from '../common/jwtInterceptor'
import { useToasts } from 'react-toast-notifications'
const Navbar = () => {
    const {addToast} = useToasts()
    const navigate = useNavigate()
    const logoutFn = async () => {
        try {
            const res = await Axios.post('http://localhost:4000/auth/logout')
            addToast(res.data,{appearance:'success',autoDismiss:true})
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <nav>
        <div className="nav_container">
            <div className="logo">
                <Link to='/' >Refresh Token </Link>
            </div>
            <div className="btn">
                <button className='logout'  onClick={logoutFn} >Logout</button>
            </div>
        </div>
    </nav>
  )
}

export default Navbar