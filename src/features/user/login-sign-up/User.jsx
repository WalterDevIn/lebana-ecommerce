import React, { useState } from 'react';
import './user.css';
import { auth } from "../../../services/api";
import { useNavigate } from 'react-router-dom';

const User = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Estados para LOGIN
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  // Estados para REGISTER
  const [Nombre, setNombre] = useState("");
  const [Apellido, setApellido] = useState("");
  const [Email, setEmail] = useState("");
  const [Telefono, setTelefono] = useState("");
  const [Pass, setPass] = useState("");
  const [Pass2, setPass2] = useState("");

  // -------------------------
  //      HANDLERS LOGIN
  // -------------------------

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await auth.login(loginEmail, loginPass);

      console.log("LOGIN OK:", res);

      navigate("/"); // Redirige al home
    } catch (err) {
      setError("Email o contraseña incorrectos");
    }
  };

  // -------------------------
  //      HANDLERS REGISTER
  // -------------------------

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    if (Pass !== Pass2) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const userData = {
        Nombre,
        Apellido,
        Email,
        Telefono,
        Pass
      };

      const res = await auth.register(userData);

      console.log("REGISTRO OK:", res);

      setIsLogin(true); // Cambia a login
    } catch (err) {
      setError("Error al registrar usuario");
    }
  };

  return (
    <div className='general-container'>
      <div className="user-container">
        <div className="user-left">
          <div className="text">
            <h1>Hola!</h1>
            <h2><strong>Ten un</strong></h2>
            <h2><strong>BUEN DIA</strong></h2>
          </div>
        </div>

        <div className="user-right">

          {error && <p className="error">{error}</p>}

          {isLogin ? (
            <form className="form-card" onSubmit={handleLogin}>
              <h2>Iniciar Sesión</h2>

              <input 
                type="email" 
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />

              <input 
                type="password" 
                placeholder="Contraseña"
                required
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
              />

              <div className="options">
                <label>
                  <input type="checkbox" /> Recordarme
                </label>
                <a href="#">Olvidaste tu Contraseña?</a>
              </div>

              <button className="login-btn" type="submit">Ingresar</button>

              <p>
                No tienes una cuenta?{" "}
                <span className="toggle-link" onClick={() => setIsLogin(false)}>
                  Crear cuenta
                </span>
              </p>
            </form>
          ) : (
            <form className="form-card" onSubmit={handleRegister}>
              <h2>Registrarse</h2>

              <input 
                type="text" 
                placeholder="Nombre"
                required
                value={Nombre}
                onChange={(e) => setNombre(e.target.value)}
              />

              <input 
                type="text" 
                placeholder="Apellido"
                required
                value={Apellido}
                onChange={(e) => setApellido(e.target.value)}
              />

              <input 
                type="email" 
                placeholder="Email"
                required
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input 
                type="number" 
                placeholder="Telefono"
                required
                value={Telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />

              <input 
                type="password" 
                placeholder="Contraseña"
                required
                value={Pass}
                onChange={(e) => setPass(e.target.value)}
              />

              <input 
                type="password" 
                placeholder="Repetir Contraseña"
                required
                value={Pass2}
                onChange={(e) => setPass2(e.target.value)}
              />

              <label className="terms">
                <input type="checkbox" /> Acepto los Términos y Condiciones
              </label>

              <button className="register-btn" type="submit">Registrarse</button>

              <p>
                Ya tienes una cuenta?{" "}
                <span className="toggle-link" onClick={() => setIsLogin(true)}>
                  Iniciar Sesion
                </span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
