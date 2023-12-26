import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export const Navbar = () => {

	const token = localStorage.getItem('token');

	const navigate = useNavigate()

	const handleCerrarSesion = () => {
		localStorage.removeItem('token');

		Swal.fire({
			icon: "success",
			title: "Tu sesión se cerró correctamente!"
		});

		setTimeout(() => {
			navigate("/")
		}, 1500);

		setTimeout(() => {
			window.location.reload(false)
		}, 500);

	}

	return (
		<nav className="navbar navbar-dark bg-dark py-4">
			<Link to="/" className="text-decoration-none">
				<h3 className="text-white ms-5">Home</h3>
			</Link>

			<div className="dropdown me-5">
				{!token ? (
					<>
						<button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Registro/login
						</button>

						<ul className="dropdown-menu">

							<Link to="/acceso" className="text-decoration-none">
								<li><a className="dropdown-item border-bottom" href="#">Acceder</a></li>
							</Link>

							<Link to="/registro" className="text-decoration-none">
								<li><a className="dropdown-item" href="#">Registrarse</a></li>
							</Link>

						</ul>
					</>
				) : (
					<>
						<button className="btn btn-light" type="button" onClick={handleCerrarSesion}>
							Cerrar sesión
						</button>
					</>
				)

				}


			</div>

		</nav>
	);
};
