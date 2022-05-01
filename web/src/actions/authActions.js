export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const ACTUALIZAR_INFO_PERSONAL = "ACTUALIZAR_INFO_PERSONAL";
export const ACTUALIZAR_EMAIL = "ACTUALIZAR_EMAIL";

export const login = (nombre, apellido, email, uid) => ({
  type: LOGIN,
  payload: { nombre, apellido, email, uid },
});

export const actualizarInfoPersonalAction = (nombre, apellido) => ({
  type: ACTUALIZAR_INFO_PERSONAL,
  payload: { nombre, apellido },
});

export const actualizarEmailAction = (email) => ({
  type: ACTUALIZAR_EMAIL,
  payload: email,
});

export const logout = () => ({
  type: LOGOUT,
});
