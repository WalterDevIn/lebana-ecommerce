import React, { useState } from 'react';
import './user.css';

const User = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="user-container">
      <div className="user-left">
        <div className="text">
            <h1>Hola!</h1>
            <h2><strong>Ten un</strong></h2>
            <h2><strong>BUEN DIA</strong></h2>
        </div>
      </div>

      <div className="user-right">
        {isLogin ? (
          <form className="form-card">
            <h2>Iniciar Sesión</h2>
            <input type="text" placeholder="Nombre de usuario" required/>
            <input type="password" placeholder="Contraseña" required/>
            <div className="options">
              <label>
                <input type="checkbox" /> Recordarme
              </label>
              <a href="#">Olvidaste tu Contraseña?</a>
            </div>
            <button className="login-btn">Ingresar</button>
            {/* <button className="google-btn">Ingresar con Google</button> */}
            <p>
              No tienes una cuenta?{' '}
              <span className="toggle-link" onClick={() => setIsLogin(false)}>Crear cuenta</span>
            </p>
          </form>
        ) : (
          <form className="form-card">
            <h2>Registrarse</h2>
            <input type="text" placeholder="Nombre" required/>
            <input type="text" placeholder="Apellido" required/>
            <input type="email" placeholder="Email" required/>
            <input type="number" placeholder="Telefono" required/>
            <input type="password" placeholder="Contraseña" required/>
            <input type="password" placeholder="Repetir Contraseña" required/>
            <label className="terms">
              <input type="checkbox" /> Acepto los Términos y Condiciones
            </label>
            <button className="register-btn">Registrarse</button>
            <p>
              Ya tienes una cuenta?{' '}
              <span className="toggle-link" onClick={() => setIsLogin(true)}>Iniciar Sesion</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default User;
