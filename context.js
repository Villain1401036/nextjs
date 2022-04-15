import router from 'next/router';
import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggedIn: true,
    accounttype: true ,
    firebase: null,
    changeaccount: () => {
        accounttype = !accounttype ;
 
    
    },
    login: () => {isLoggedIn = true},
    logout: () =>{ localStorage.removeItem("access_token"); localStorage.removeItem("refresh_token");isLoggedIn = false },
});

