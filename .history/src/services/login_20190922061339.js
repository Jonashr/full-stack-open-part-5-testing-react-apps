import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
    console.log('Anything happening here?')
    const response =  await axios.post(baseUrl, credentials)    
    console.log(response.data)
    return response.data
}

export default { login }