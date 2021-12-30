import axios from 'axios'

export const login = async (obj) => {
    let response = await axios.post("https://localhost:44394/api/login",obj)
    return response
}
