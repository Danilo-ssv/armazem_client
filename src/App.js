import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ProductSearchPage from './pages/ProductSearchPage'
import AccountPage from './pages/AccountPage'
import HomePage from './pages/HomePage'
import './styles/App.css'
import './styles/ProductsStatusPopUp.css'

import {
	editProductStatusPopUp,
	newProductStatusPopUp,
	ProductErrorStatusPopUp,
} from './services/storeManager'

function App() {
	function PopUp({content}) {
		return(
			<div className='products-status-pop-up'>
				{content}
			</div>
		)
	}
	const { isEditOpen } = editProductStatusPopUp()
	const { isNewOpen } = newProductStatusPopUp()
	const { isErrorOpen } = ProductErrorStatusPopUp()

	return(
		<div className='app'>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/product_search' element={<ProductSearchPage />} />
				<Route path='/account' element={<AccountPage />} />
				<Route path='/login' element={<LoginPage />} />
			</Routes>
			{
				isEditOpen
				? (<PopUp content='Documento Atualizado!' />)
				: (null)
			}
			{
				isNewOpen
				? (<PopUp content='Documento criado!' />)
				: (null)
			}
			{
				isErrorOpen
				? (<PopUp content='Ocorreu um erro!' />)
				: (null)
			}
		</div>
	)
}

export default App