import { useEffect, useState } from 'react'
import './home.css'
import axios from 'axios'
import unplash from '../../components/env'
import Axios from '../../common/jwtInterceptor';
const Home = () => {
    
    const [imgArr,setImgArr] = useState<any>(null)
    const fetch = async () => {
        try {

            const data = await Axios.get('http://localhost:4000/home')
            setImgArr(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=> {
        fetch()
    },[])
  return (
    <>
           <div className='all-img' >
                {
                 imgArr && imgArr.data.map((elem:any,i:any)=> <img key={i} src={elem.urls.small} alt="no image" /> )
                }
            </div>
    </>
  )
}

export default Home