import axios from 'axios'
import jwt_decode from 'jwt-decode'

const baseURL = import.meta.env.VITE_BACKEND_HOST

export const axi = axios.create({
    baseURL,
})

export const authAxios = axios.create({
    baseURL,
    withCredentials: true,
})

authAxios.interceptors.request.use(async (config) => {
    const access = localStorage.getItem('access')
    config.headers = {
        'Authorization': `Bearer ${access}`,
 
    }
   
    const decoded = jwt_decode(access)

    const exp = new Date(decoded.exp * 1000)
    const now = new Date()
    const five = 1000 * 60 * 5

    if(exp.getTime() - now.getTime() < five)
        try{
            const oldRefresh = localStorage.getItem('refresh')
            const rest = await axi.post('/users/refresh/', {oldRefresh})
            const { access, refresh } = rest.data
    
            localStorage.setItem('access', access)
            localStorage.setItem('refresh', refresh)
            
        } catch(err){
            localStorage.clear()
            window.location.href = '/login'
        }
    
        return config
    
})