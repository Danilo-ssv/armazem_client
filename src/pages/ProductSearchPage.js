import React from 'react'
import { useLocation } from 'react-router-dom'

import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'

function ProductSearchPage() {
	const { products, searchParam } = useLocation().state

	return(
		<div>
			<Header />
			<Main
				data={products}
				hasSearchParam={searchParam}
				hasPages={false}
			/>
			<Footer />
		</div>
	)
}

export default ProductSearchPage