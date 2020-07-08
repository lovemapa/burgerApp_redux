import axios from 'axios'

const instance = axios.create({
    baseURL: "https://fir-a21e3.firebaseio.com/"
})


export default instance;