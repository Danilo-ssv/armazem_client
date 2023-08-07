import React from 'react'
import { Link } from 'react-router-dom'

import { accountPopUpManager } from '../services/storeManager'

function Header() {
	const { isOpen, setIsOpen } = accountPopUpManager()

	function onClick() {
		if(isOpen)
			return setIsOpen()
	}
	return(
		<header>
			<div className='header-conteiner'>
				<h1>Logo</h1>
				<nav>
					<Link onClick={onClick} to='/'>Home</Link>
					<a id='user-feature' onClick={ setIsOpen}>
						<i class="fa-regular fa-user"></i>
						<div>perfil</div>
					</a>
				</nav>
			</div>
		</header>
	)
}

export default Header