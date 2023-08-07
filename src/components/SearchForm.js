import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import '../styles/SearchForm.css'

import { searchProduct } from '../services/requests/applicationRequests'

function SearchForm() {
	const navigate = useNavigate()
	const [form, setForm] = useState({
		id: '',
		productName: '',
	})
	const [validForm, setValidForm] = useState(true)

	const productsSearchMutation = useMutation({
		mutationFn: searchProduct,
		onSettled: ({data})=>{
			navigate('/product_search', {
				state: {
					products: data.products,
					searchParam: data.searchParam
				},
			})
		},
	})

	function onSubmit(event) {
		event.preventDefault()
		if(form.id == '' && form.productName == '') {
			return setValidForm(false)
		} else {
			setValidForm(true)

			return productsSearchMutation.mutate({
				token: localStorage.getItem('token'),
				id: form.id,
				productName: form.productName,
			})
		}
	}

	function onChange(event) {
		setForm({
			...form,
			[event.target.id]: event.target.value,
		})
	}

	return(
		<div className='search-product-form'>
		<form onSubmit={onSubmit}>
			<h2>Procure sua Mercadoria!</h2>
			<div className='input-fields'>
				<input
					id='id'
					onChange={onChange}
					value={form.id}
					placeholder='id'
					className='especial-input'
				/>
				<span>ou</span>
				<input
					id='productName'
					onChange={onChange}
					value={form.product}
					placeholder='produto'
				/>
				<p className='warming'>
					{
						validForm
						?(null)
						:(<div>
							<i class="fa-regular fa-circle-xmark"></i>
							Preencha algum campo!
						</div>)
					}
				</p>
				<button className='submit' type='submit'>
					Buscar
				</button>
			</div>
		</form>
		</div>
	)
}

export default SearchForm