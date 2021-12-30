import axios from 'axios'

export const reg = async (obj) => {
    let response = await axios.post("https://localhost:44394/api/register",obj)
    return response
}
