import React, { useState } from 'react'

import SearchForm from './SearchForm'
import NewProductForm from './NewProductForm'
import EditProductPopUp from './EditProductPopUp'
import AccountPopUp from './AccountPopUp'

import { editProductPopUpManager } from '../services/storeManager'

function Main({ data, hasSearchParam, hasPages, page, inc, dec }) {
	const { isOpen, setIsOpen } = editProductPopUpManager()
	const [editProduct, setEditProduct] = useState({
		id: '',
		productName: '',
		brand: '',
		stock: '',
	})

	function onClick({_id, productName, brand, stock}) {
		setEditProduct({
			_id,
			productName,
			brand,
			stock
		})
		setIsOpen()
	}
	console.log(data)
	return(
		<main>
			<div className='products-form-conteiner'>
				<SearchForm />
				<NewProductForm />
			</div>
			<div className='main'>
				<div className='product-conteiner'>
					{
						hasSearchParam
						? (<h1>Principais buscas para: {hasSearchParam}</h1>)
						: (null)
					}
					<div className='product-table label'>
						<div>ID</div>
						<div>Nome</div>
						<div>MARCA</div>
						<div>QUANTIDADE</div>
						<div></div>
					</div>
					{
						data.length == 0
						? (<span>Não há produtos!</span>)
						: (
							data.map(product => (
								<div key={product._id}>
									<div className='product-table single-product'>
										<div>{product._id}</div>
										<div>{product.productName}</div>
										<div>{product.brand}</div>
										<div>{product.stock}</div>
										<div>
											<button
											className='edit-product'
												onClick={
													()=>onClick(product)
												}
											>
												<i class="fa-solid fa-pen-to-square"></i>
											</button>
										</div>
									</div>
								</div>
							))
						)
					}
					{
						hasPages
						? (
							<div className='next-previous-pages'>
								<button
									onClick={() => {
										if(page > 1) 
											return dec()
									}}
								><i class="fa-solid fa-angles-left"></i>
								</button>
								<div>{page}</div>
								<button
									onClick={() => {
										if(data.length > 0)
											return inc()
									}}
								><i class="fa-solid fa-angles-right"></i>
								</button>
							</div>
						)
						: (null)
					}

				</div>
			</div>
			{
				isOpen
				? (<EditProductPopUp products={editProduct} />)
				: (null)
			}
			<AccountPopUp />
		</main>
	)
}

export default Main