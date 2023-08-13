import React from 'react'
import '../styles/Header.css'
import { Navigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'

import { getProducts } from '../services/requests/applicationRequests'
import { homePage } from '../services/storeManager'

function Home() {
	const { page, inc, dec } = homePage()

	const productsQuery = useQuery({
		queryKey: ['products', page],
		keepPreviousData: true,
		queryFn: () => getProducts(page, localStorage.getItem('token')),
	})
	
	if(productsQuery.isLoading)
		return (<h1>Carregando...</h1>)
	if(productsQuery.data.invalidToken){
		return (<Navigate to='/login' />)
	}
	
	return(
		<div>
			<Header />
			<Main
				data={productsQuery.data}
				hasPages={true}
				page={page}
				inc={inc}
				dec={dec}
			/>
			<Footer />
		</div>
	)
}

export default Home