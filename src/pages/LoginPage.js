import React, { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import '../styles/LoginPage.css'

import { login } from '../services/requests/applicationRequests'

function LoginPage() {
	const [isOpen, setIsOpen] = useState(false)
	const [loginForm, setLoginForm] = useState({
		account: '',
		password: '',
	})
	useEffect(()=>{
		setTimeout(()=>setIsOpen(!isOpen), 1500)
	}, [])

	const queryClient = useQueryClient()
	const loginMutation = useMutation({
		mutationFn: login,
		onSuccess: data => {
			if(data.isAuthenticated){
				localStorage.setItem('token', data.token)
				window.location.pathname = '/'
			}
		},
	})

	function onSubmit(event) {
		event.preventDefault()
		loginMutation.mutate({
			account: loginForm.account,
			password: loginForm.password,
		})
	}

	function onChange(event) {
		setLoginForm({
			...loginForm,
			[event.target.id]: event.target.value,
		})
	}

	function closePopUp(event) {
		if(!event.target.matches('.popup')){
			setIsOpen()
		}
	}
	return(
		<div className='login-conteiner'>
			<form onSubmit={onSubmit}>
				<div className='login-form'>
					<h1>Login</h1>

					<div className='input-box'>
						<label for='account'>Conta</label><br />
						<div className='input-field'>
							<i class="fa-solid fa-user"></i>
							<input
								type='text'
								id='account'
								placeholder='digite o usuário'
								onChange={onChange}
								value={loginForm.account}
								required
							/>
						</div>
					</div>
					<div className='input-box'>
						<label for='password'>Senha</label>
						<div className='input-field'>
							<i class="fa-solid fa-lock"></i>
							<input
								type='password'
								id='password'
								placeholder='digite a senha'
								onChange={onChange}
								value={loginForm.password}
								required
							/>
						</div>
					</div>
					<input className='submit' type='submit' />
					<i class="fa-solid fa-info info" onClick={setIsOpen}></i>
				</div>
			</form>
			{
				isOpen
				? (<div onClick={closePopUp} className='pop-up-conteiner'>
					<div className='login-pop-up popup'>
						<p className='popup'>
							Este é um projeto pessoal,
							com intuito acadêmico e ilustrativo!
						</p>
						<p className='popup'>
							Para acessa-lo, utilize o usuário:
							<b className='popup'> admin</b>,
							e a senha:
							<b className='popup'> 12345678</b>.
						</p>
						<button>X</button>
					</div>
				</div>)
				: (null)
			}
		</div>
	)
}

export default LoginPage