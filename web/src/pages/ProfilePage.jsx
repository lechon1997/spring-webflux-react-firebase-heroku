import React, { useState, useEffect } from "react";
import firebaseApp from "../firebase/config";
import {
  actualizarInfoPersonalAction,
  actualizarEmailAction,
} from "../actions/authActions";
import { connect } from "react-redux";
import {
  getAuth,
  updateEmail,
  reauthenticateWithCredential,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
  Alert,
  Button,
} from "reactstrap";

const auth = getAuth(firebaseApp);

const ProfilePage = ({ nombre, apellido, email, uid, dispatch }) => {
  const [nombreU, setNombreU] = useState(nombre);
  const [apellidoU, setApellidoU] = useState(apellido);
  const [emailU, setEmailU] = useState(email);

  const [isOpen, setIsOpen] = useState(false);
  const [pass, setPass] = useState("");
  const firestore = getFirestore(firebaseApp);
  const docRef = doc(firestore, `usuarios/${auth.currentUser.uid}`);

  const onChangePass = (e) => {
    setPass(e.target.value);
  };

  const ocultarModal = () => {
    setIsOpen(false);
  };

  const actualizarInfoPersonal = async () => {
    setDoc(
      docRef,
      {
        nombre: nombreU,
        apellido: apellidoU,
      },
      { merge: true }
    ).then((e) => {
      dispatch(actualizarInfoPersonalAction(nombreU, apellidoU));
    });

    if (emailU !== email) {
      setIsOpen(true);
    }
  };

  const actualizarEmail = (e) => {
    e.preventDefault();
    updateEmail(auth.currentUser, emailU)
      .then(() => {
        // email actualizado
        dispatch(actualizarEmailAction({ email: emailU }));
        console.log("actualizado");
      })
      .catch((error1) => {
        console.log("error 1: ", error1);
        reauthenticateWithCredential(auth.currentUser, pass)
          .then(() => {
            // User re-authenticated.
          })
          .catch((error2) => {
            // An error ocurred
            // ...
            console.log("error 2: ", error2);
          });
        // An error occurred
        // ...
      });

    //console.log("el id token: ", asd);

    //const xd = setDoc(docuRef, { nombre: nombre, apellido: apellido });
    setIsOpen(false);
  };
  return (
    <div className="w-100 d-flex justify-content-center">
      <main className="w-50 mt-2">
        <div className="mt-3">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="w-100"
            defaultValue={nombre}
            onChange={(e) => {
              setNombreU(e.target.value);
            }}
            placeholder="Ingresar nombre"
          />
        </div>
        <div className="mt-3">
          <label>Apellido</label>
          <input
            type="text"
            name="apellido"
            className="w-100"
            defaultValue={apellido}
            onChange={(e) => {
              setApellidoU(e.target.value);
            }}
            placeholder="Ingresar apellido"
          />
        </div>
        <div className="mt-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="w-100"
            defaultValue={email}
            onChange={(e) => {
              setEmailU(e.target.value);
            }}
          />
        </div>
        <button type="button" onClick={actualizarInfoPersonal}>
          Guardar
        </button>
        <Modal className="mt-3" isOpen={isOpen}>
          <ModalHeader>
            <div>
              <h4>Confirm with password</h4>
            </div>
          </ModalHeader>
          <form onSubmit={actualizarEmail}>
            <ModalBody>
              <FormGroup>
                <label>Password:</label>
                <input
                  className="form-control"
                  name="password"
                  id="password"
                  type="password"
                  onChange={onChangePass}
                />
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              <Button color="danger" id="btn-cancelar" onClick={ocultarModal}>
                Cancel
              </Button>

              <Button type="submit" color="primary" id="btn-nuevo-miembro">
                Confirm
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  nombre: state.auth.nombre,
  apellido: state.auth.apellido,
  email: state.auth.email,
  uid: state.auth.uid,
});

export default connect(mapStateToProps)(ProfilePage);
