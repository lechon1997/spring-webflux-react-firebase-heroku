import * as actions from "../actions/authActions";

export const initialState = {
  nombre: "",
  apellido: "",
  email: null,
  uid: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOGIN:
      const payload = action.payload;
      return {
        nombre: payload.nombre,
        apellido: payload.apellido,
        email: payload.email,
        uid: payload.uid,
      };
    case actions.ACTUALIZAR_INFO_PERSONAL:
      return {
        ...state,
        nombre: action.payload.nombre,
        apellido: action.payload.apellido,
      };

    case actions.ACTUALIZAR_EMAIL:
      return {
        ...state,
        email: action.payload.email,
      };
    case actions.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
