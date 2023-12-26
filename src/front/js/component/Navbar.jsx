import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-dark bg-dark py-4">
			<Link to="/" className="text-decoration-none">
				<h3 className="text-white ms-5">Home</h3>
			</Link>

			<div className="dropdown me-5">
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
			</div>

		</nav>
	);
};
