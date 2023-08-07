import axios from 'axios'

export default axios.create({
	baseURL: 'https://armazem-server.vercel.app',
})