import axios from 'axios'
import { Link } from 'react-router-dom'
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const login = payload => api.post('/login', payload)
export const signIn = () => api.post('/signIn')
export const signOut = () => api.put('/signOut')
// export const deleteMovieById = id => api.delete(`/movie/${id}`)
// export const getMovieById = id => api.get(`/movie/${id}`)

const apis = {
   login, 
   signIn,
   signOut
}

export default apis