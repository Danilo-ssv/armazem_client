import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import '../styles/SearchForm.css'

import { newProduct } from '../services/requests/applicationRequests'
import {
	newProductStatusPopUp,
	ProductErrorStatusPopUp,
	homePage
} from '../services/storeManager'

function NewProductForm() {
	const { setDefaultValue } = homePage()
	const { setIsNewOpen } = newProductStatusPopUp()
	const { setIsErrorOpen } = ProductErrorStatusPopUp()

	const [form, setForm] = useState({
		productName: '',
		brand: '',
		stock: 0,
	})

	const queryClient = useQueryClient()
	const newProductMutation = useMutation({
		mutationFn: newProduct,
		onSettled: ({data}) => {
			if(!data.err){
				setIsNewOpen()
				setTimeout(()=>setIsNewOpen(), 2000)

				setDefaultValue()
				queryClient.invalidateQueries(['products'])
				setForm({
					productName: '',
					brand: '',
					stock: 0,
				})
			}else {
				setIsErrorOpen()
				setTimeout(()=>setIsErrorOpen(), 2000)
			}
		}
	})

	function onSubmit(event) {
		event.preventDefault()

		newProductMutation.mutate({
			token: localStorage.getItem('token'),
			productName: form.productName,
			brand: form.brand,
			stock: form.stock,
		})
	}

	function onChange(event) {
		setForm({
			...form,
			[event.target.id]: event.target.value,
		})
	}

	return(
		<div className='new-product-form'>
		<form onSubmit={onSubmit}>
			<h2>Crie nova Mercadoria!</h2>
			<div clasName='input-fields'>
				<input
					id='productName'
					placeholder='produto'
					type='text'
					onChange={onChange}
					value={form.productName}
					required
					className='especial-input'
				/>
				<input
					id='brand'
					placeholder='marca'
					type='text'
					onChange={onChange}
					value={form.brand}
					required
					className='especial-input'
				/>
				<input
					id='stock'
					placeholder='quantidade'
					type='number'
					min='0'
					onChange={onChange}
					value={form.stock}
					required
					className='especial-input'
				/>
				<button className='submit' type='submit'>+ Criar</button>
			</div>
		</form>
		</div>
	)
}

export default NewProductForm