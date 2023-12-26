import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Bienvenido/a a nuestro gran y decorado home!</h1>

			<Link to="/private">
				<h3 className="mt-5">Ruta privada</h3>
			</Link>
		</div>
	);
};

export default Home;