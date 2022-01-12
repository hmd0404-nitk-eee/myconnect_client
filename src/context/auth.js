import React, { useReducer, createContext } from "react";
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null,
};

if(localStorage.getItem('JSON_WEB_TOKEN')) {
    const decodeToken = jwtDecode(localStorage.getItem('JSON_WEB_TOKEN'));

    if(decodeToken.exp*1000 < Date.now()) {
        localStorage.removeItem('JSON_WEB_TOKEN');
    } else {
        initialState.user = decodeToken;
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {},
});

function authReducer(state, action) {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
            };
        default: 
            return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    function login(userData) {
        localStorage.setItem('JSON_WEB_TOKEN', userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData,
        });
    }

    function logout() {
        localStorage.removeItem('JSON_WEB_TOKEN');
        dispatch({
            type: 'LOGOUT',
        });
    }

    return (
        <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />
    );
}

export { AuthContext, AuthProvider };