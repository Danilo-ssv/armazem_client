import axios from '../serverConnection'

export const login = ({account, password}) => {
	return axios.post('/login', {
		account,
		password,
	}).then(res=>res.data)
}

export const updateAccount = ({token, currentAccount, newAccount, currentPassword, newPassword, confirmNewPassword,}) => {
	return axios.put('/update_account', {
		currentAccount,
		newAccount,
		currentPassword,
		newPassword,
		confirmNewPassword,
	},
	{
		headers: {
			'authorization': token,
		}
	}).then(res=>res.data)
}

export const getProducts = (page, token) => {
	return axios.get('/get_products', {
		headers:{
			'authorization': token,
			page,
		}
	}).then(res=>res.data)
}

export const editProduct = ({token, _id, productName, brand, stock}) => {
	return axios.put('/edit_product', {
		_id,
		productName,
		brand,
		stock,
	},
	{
		headers: {
			'authorization': token,
		}
	}).then(res=>res.data)
}

export const deleteProduct = ({token, _id,}) => {
	return axios.put('/delete_product', {
		_id,
	},
	{
		headers: {
			'authorization': token,
		}
	}).then(res=>res.data)
}

export const newProduct = ({token, productName, brand, stock})=>{
	return axios.post('/new_product', {
		productName,
		brand,
		stock,
	},
	{
		headers: {
			'authorization': token,
		}
	})
}

export const searchProduct = ({token, id, productName})=>{
	return axios.get(`/search_product?id=${id}&productName=${productName}`, {
		headers: {
			'authorization': token,
		}
	})
}