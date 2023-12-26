import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import "../../styles/logIn.css";

const LogIn = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await actions.login(email, password);

            Swal.fire({
                icon: "success",
                title: "Has accedido correctamente!"
            });

            const token = response.token;  // Obtener el token de la respuesta

            setTimeout(() => {
                navigate("/");
            }, 1500);

            setTimeout(() => {
                window.location.reload(false);
            }, 1500);

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Datos erróneos o usuario inexistente!",
            });

            console.log("error catch login", error)

            // Resetear campos
            setEmail("");
            setPassword("");
        }
    };

    return (
        <>
            <div className="container w-25 container-acceso">
                <h2 className="text-center mt-3">Acceso</h2>

                <form onSubmit={handleLogin}>
                    {/*  input email */}
                    <div className="input-group-login">
                        <div className="input-field pt-4">
                            <span className="far fa-user py-2 px-2"></span>
                            <input value={email}
                                id="email"
                                type="text"
                                placeholder="Correo usuario"
                                className="input-field-login"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* input contraseña */}
                        <div className="py-1 pb-2">
                            <div className="input-field">
                                <span className="fas fa-lock py-2 px-2"></span>
                                <input value={password}
                                    id="password"
                                    type="password"
                                    placeholder="Contraseña"
                                    className="input-field-login"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                    </div>

                    {/*  boton ingresar */}
                    <div className="boton-login col-12 mx-auto">
                        <button type="submit" className="btn btn-dark data-bs-dismiss w-100">Ingresar</button>
                    </div>
                </form>

                <div>

                </div>

                {/*  olvide mi contraseña */}
                <div className="container-olvide-contraseña">
                    <button className="olvide-mi-contraseña" onClick={() => { alert("Oww... que pena, bueno, cosas que pasan!") }}>¿Olvidaste tu contraseña?</button>
                </div>

                {/* link para registro */}
                <div className="crear-cuenta-login mb-3">
                    <span>
                        <Link to="/registro" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Crear una cuenta
                        </Link>
                    </span>
                </div>
            </div>
        </>

    );
};

export default LogIn;