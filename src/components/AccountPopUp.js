import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import '../styles/AccountPopUp.css'

import { accountPopUpManager } from '../services/storeManager'

function AccountPopUp() {
	const Navigate = useNavigate()
	const { isOpen, setIsOpen } = accountPopUpManager()

	const queryClient = useQueryClient()
	function loggout() {
		if(isOpen) { setIsOpen() }
		localStorage.removeItem('token')
		Navigate('/login')
		queryClient.invalidateQueries(['products'])
	}

	function onClick(event) {
		if(!event.target.matches('.ac-popup-e')){
			setIsOpen()
		}
	}

	if(!isOpen)
		return null
	else
		return(
			<div onClick={onClick} className='account-pop-up-conteiner'>
				<div className='account-pop-up ac-popup-e'>
					<div className='ac-popup-e'>
						<i class="fa-solid fa-pen-to-square ac-popup-e"></i>
						<Link to='/account'>Editar</Link>
					</div>
					
					<div className='ac-popup-e'>
						<i class="fa-solid fa-right-from-bracket ac-popup-e"></i>
						<a onClick={loggout} className='ac-popup-e'>Loggout</a>
					</div>
					
				</div>
			</div>
		)
}

export default AccountPopUp