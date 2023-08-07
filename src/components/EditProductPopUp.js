import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import '../styles/EditProductPopUp.css'

import {
	editProductStatusPopUp,
	ProductErrorStatusPopUp,
	editProductPopUpManager,
	homePage,
} from '../services/storeManager'
import {
	editProduct,
	deleteProduct,
} from '../services/requests/applicationRequests'

function EditProductPopUp({products}) {
	const [isLock, setIsLock] = useState(true)
	const [editType, setEditType] = useState('EDIT')

	const { setDefaultValue } = homePage()
	const { setIsOpen } = editProductPopUpManager()
	const { setIsEditOpen } = editProductStatusPopUp()
	const { setIsErrorOpen } = ProductErrorStatusPopUp()

	const [form, setForm] = useState({
		productName: products.productName,
		brand: products.brand,
		stock: products.stock,
	})

	const queryClient = useQueryClient()
	const editProductMutation = useMutation({
		mutationFn: editProduct,
		onSettled: (data) => {
			if(!data.err) {
				setIsEditOpen()
				setTimeout(()=>setIsEditOpen(), 2000)
			
				setIsOpen()
				setDefaultValue()
				queryClient.invalidateQueries(['products'])
			}else {
				setIsOpen()
				
				setIsErrorOpen()
				setTimeout(()=>setIsErrorOpen(), 2000)
			}
		},
	})
	const deleteMutation = useMutation({
		mutationFn: deleteProduct,
		onSettled: (data, error) => {
			if(!data.err) {
				setIsEditOpen()
				setTimeout(()=>setIsEditOpen(), 2000)
			
				setIsOpen()
				setDefaultValue()
				queryClient.invalidateQueries(['products'])
			}else {
				setIsOpen()

				setIsErrorOpen()
				setTimeout(()=>setIsErrorOpen(), 2000)
			}	
		},
	})

	function onSubmit(event) {
		event.preventDefault()
		if(isLock)
			return;

		if(editType == 'EDIT')
			return editProductMutation.mutate({
				token: localStorage.getItem('token'),
				_id: products._id,
				productName: form.productName,
				brand: form.brand,
				stock: form.stock,
			})
		else if(editType == 'DELETE')
			return deleteMutation.mutate({
				token: localStorage.getItem('token'),
				_id: products._id,
			})
		else setIsOpen()
	}

	function onChange(event) {
		setIsLock(false)
		setForm({
			...form,
			[event.target.id]: event.target.value,
		})
	}

	function closePopup(event) {
		if(!event.target.matches('.ed-popup-e')){
			setIsOpen()
		}
	}

	return(
		<div onClick={closePopup} className='edit-product-pop-up-conteiner'>
			<form onSubmit={onSubmit} className='ed-popup-e'>
				<div className='edit-product-pop-up ed-popup-e'>
					<h2 className='ed-popup-e'>Editar Mercadoria!</h2>
					<div className='input-fields ed-popup-e'>
						<input
							id='productName'
							onChange={onChange}
							value={form.productName}
							placeholder='produto'
							required
							className='edit-product-input ed-popup-e'
						/>
						<input
							id='brand'
							onChange={onChange}
							value={form.brand}
							placeholder='marca'
							required
							className='edit-product-input ed-popup-e'
						/>
						<input
							id='stock'
							onChange={onChange}
							value={form.stock}
							placeholder='quantidade'
							type='number'
							min='0'
							required
							className='edit-product-input ed-popup-e'
						/>
						<button
							onClick={() => {
								setEditType('DELETE')
								setIsLock(false)
							}}
							className='delete ed-popup-e'
							type='submit'
							>
							<i class="fa-solid fa-trash-can ed-popup-e"></i>
						</button>
					</div>
					{
						isLock
						? (<button
							className='lock-submit ed-popup-e'
							type='submit'
								>salvar
						</button>)
						: (<button
							className='submit ed-popup-e'
							type='submit'
								>salvar
						</button>)
					}
					<button className='closePopup'>X</button>
				</div>
			</form>
		</div>
	)
}

export default EditProductPopUp