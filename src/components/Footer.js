import React from 'react'
import '../styles/Footer.css'

function Footer() {
	return(
	    <footer id="footer">
	        <span>© 2023 Danilo. Todos os direitos reservados.</span>
	        <div>
	        	<a href="https://www.linkedin.com/in/danilo-souza-vieira-217b15237" target="_blank">
	                <i class="fa-brands fa-linkedin"></i>
	            </a>
	            <a href="https://www.github.com/Danilo-ssv" target="_blank">
	                <i class="fa-brands fa-github"></i>
	            </a>
	            <a href="https://t.me/DaniloSVieira" target="_blank">
	                <i class="fa-brands fa-telegram"></i>
	            </a>
	        </div>
	    </footer>
	)
}

export default Footer