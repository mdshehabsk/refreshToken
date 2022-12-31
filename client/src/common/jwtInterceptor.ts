import axios from "axios";


const Axios = axios.create({})


Axios.interceptors.request.use((config:any) => {
    // @ts-ignore
    const session = JSON.parse(localStorage.getItem('session'))
    config.headers = {
        'Authorization': `Bearer ${session.access_token}`,
    }
    return config
})
Axios.interceptors.response.use(response => {
    return response
},async (error)=> {
    if(error.response.status === 401){
         // @ts-ignore
    const session = JSON.parse(localStorage.getItem('session'))
        let {data} = await axios.post('http://localhost:4000/auth/refresh',null,{
            headers:{
                'Authorization': `Bearer ${session.refresh_token}`
            }
        })
        localStorage.setItem('session',JSON.stringify(data))
        error.config.headers = {
            'Authorization': `Bearer ${data.access_token}`,
        }
        return axios(error.config)
    }else {
        Promise.reject(error)
    }
})
export default Axios