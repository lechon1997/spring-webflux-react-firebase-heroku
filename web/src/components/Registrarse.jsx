import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../firebase/config";
import { useHistory } from "react-router-dom";

const auth = getAuth(firebaseApp);

const Registrarse = () => {
  const history = useHistory();

  const onSubmitRegistrarse = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      window.alert("la contraseña debe tener más de 6 caracteres");
      return false;
    }

    const infoUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    history.push("/");
  };

  const onClickVolver = () => {
    history.push("/");
  };

  return (
    <div>
      <div className="w-100 ms-3 mt-2">
        <button onClick={onClickVolver}>Volver</button>
      </div>
      <div className="w-100 d-flex justify-content-center mt-2">
        <div className="w-25">
          <form onSubmit={onSubmitRegistrarse}>
            <input type="email" name="email" placeholder="Nombre" />
            <input type="password" name="password" placeholder="Contraseña" />
            <div className="d-flex justify-content-end">
              <button>Registrarse</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registrarse;
