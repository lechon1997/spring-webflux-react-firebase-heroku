import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import firebaseApp from "./firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { login, logout } from "./actions/authActions";
import { PublicNavbar, PrivateNavbar } from "./components/Navbar";
import { Alert } from "reactstrap";
import HomePage from "./pages/HomePage";
import SingleQuestionPage from "./pages/SingleQuestionPage";
import QuestionsPage from "./pages/QuestionsPage";
import QuestionFormPage from "./pages/QuestionFormPage";
import AnswerFormPage from "./pages/AnswerFormPage";
import OwnerQuestionsPage from "./pages/OwnerQuestionsPage";
import ProfilePage from "./pages/ProfilePage";
import Registrarse from "./components/Registrarse";
import { Link } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);

const App = ({ dispatch }) => {
  const [invalidUser, setInvalidUser] = useState(false);
  const [invalidPass, setInvalidPass] = useState(false);
  const firestore = getFirestore(firebaseApp);
  const [user] = useAuthState(auth);

  if (user) {
    const docRef = doc(firestore, `usuarios/${auth.currentUser.uid}`);
    getDoc(docRef).then((p) => {
      dispatch(login(p.data().nombre, p.data().apellido, user.email, user.uid));
    });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email);
    console.log(password);
    if (password.length < 6) {
      setInvalidUser(false);
      setInvalidPass(true);
      return false;
    } else {
      setInvalidPass(false);
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      setInvalidUser(true);
    }
  };

  return (
    <Router>
      {user ? (
        <>
          <PrivateNavbar />
          <Switch>
            <Route
              exact
              path="/"
              component={() => {
                return (
                  <HomePage>
                    <SignOut dispatch={dispatch} />
                  </HomePage>
                );
              }}
            />
            <Route exact path="/questions" component={QuestionsPage} />
            <Route exact path="/question/:id" component={SingleQuestionPage} />
            <Route exact path="/list" component={OwnerQuestionsPage} />
            <Route exact path="/answer/:id" component={AnswerFormPage} />
            <Route exact path="/new" component={QuestionFormPage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Redirect to="/" />
          </Switch>
        </>
      ) : (
        <>
          <PublicNavbar />
          <Switch>
            <Route
              exact
              path="/"
              component={() => {
                return (
                  <HomePage>
                    <form
                      onSubmit={submitHandler}
                      className="d-flex flex-column"
                    >
                      <input
                        type="email"
                        name="email"
                        className="w-50"
                        placeholder="Usuario"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />

                      <input
                        type="password"
                        name="password"
                        className="w-50"
                        placeholder="Contraseña"
                        id="exampleInputPassword1"
                      />
                      <div className="">
                        <button type="submit" className="button">
                          Ingresar
                        </button>
                        <Link to="/registrarse">
                          <button type="button" className="ms-3 button">
                            Registrarse
                          </button>
                        </Link>
                      </div>
                      <Alert
                        className="mt-2"
                        isOpen={invalidUser}
                        color="danger"
                      >
                        El Usuario ingresado no es válido
                      </Alert>
                      <Alert
                        className="mt-2"
                        isOpen={invalidPass}
                        color="danger"
                      >
                        La contraseña debe tener más de 6 caracteres
                      </Alert>
                    </form>
                    <SignIn dispatch={dispatch} />
                  </HomePage>
                );
              }}
            />
            <Route exact path="/questions" component={QuestionsPage} />
            <Route exact path="/question/:id" component={SingleQuestionPage} />
            <Route exact path="/answer/:id" component={AnswerFormPage} />
            <Route exact path="/registrarse" component={Registrarse} />
            <Redirect to="/" />
          </Switch>
        </>
      )}
    </Router>
  );
};

function SignIn() {
  const signInWithGooglexd = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  return (
    <button className="button mt-3" onClick={signInWithGooglexd}>
      Sign in with google
    </button>
  );
}

function SignOut({ dispatch }) {
  return (
    auth.currentUser && (
      <button
        className="button right"
        onClick={() => {
          dispatch(logout());
          auth.signOut();
        }}
      >
        Sign out
      </button>
    )
  );
}

export default App;
