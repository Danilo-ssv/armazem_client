import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import '../styles/AccountPage.css'

import { updateAccount } from '../services/requests/applicationRequests'

import Header from '../components/Header'
import Footer from '../components/Footer'
import AccountPopUp from '../components/AccountPopUp'

function AccountPage() {
	const navigate = useNavigate()
	const [form, setForm] = useState({
		currentAccount: '',
		newAccount: '',
		currentPassword: '',
		newPassword: '',
		confirmNewPassword: '',
	})

	const queryClient = useQueryClient()
	const accountMutation = useMutation({
		mutationFn: updateAccount,
		onSettled: () => {
			localStorage.setItem('token', null)
			queryClient.invalidateQueries(['products'])
			alert('Usuário atualizado!')
			navigate('/login')
		},
	})

	function onSubmit(event) {
		event.preventDefault()

		accountMutation.mutate({
			token: localStorage.getItem('token'),
			currentAccount: form.currentAccount,
			newAccount: form.newAccount,
			currentPassword: form.currentPassword,
			newPassword: form.newPassword,
			confirmNewPassword: form.confirmNewPassword,
		})
	}

	function onChange(event) {
		setForm({
			...form,
			[event.target.id]: event.target.value,
		})
	}

	return(
		<div className='account-page'>
			<Header />
			<div className='account-page-conteiner'>
				<form onSubmit={onSubmit}>
					<h1>Alterar configuraçoes de conta!</h1>
					<div className='input-fields flex-start'>
						<label for='currentAccount'>Usuário atual:</label>
						<input
							id='currentAccount'
							className='account-inputs'
							placeholder='Usuário atual'
							onChange={onChange}
							value={form.currentAccount}
						/>
						<label for='newAccount'>Usuário:</label>
						<input
							id='newAccount'
							className='account-inputs'
							placeholder='Novo usuário'
							onChange={onChange}
							value={form.newAccount}
						/>
						<label for='currentPassword'>Senha autal:</label>
						<input
							id='currentPassword'
							className='account-inputs'
							placeholder='Senha atual'
							type='password'
							onChange={onChange}
							value={form.currentPassword}
						/>
						<label for='newPassword'>Senha:</label>
						<input
							id='newPassword'
							className='account-inputs'
							placeholder='Nova senha'
							type='password'
							onChange={onChange}
							value={form.newPassword}
						/>
						<label for='confirmNewPassword'>Confirmar senha:</label>
						<input
							id='confirmNewPassword'
							className='account-inputs'
							placeholder='Confirmar senha'
							type='password'
							onChange={onChange}
							value={form.confirmNewPassword}
						/>
					</div>
					<button className='submit'>Salvar!</button>
				</form>

				<AccountPopUp />
			</div>
			<Footer />
		</div>
	)
}

export default AccountPage