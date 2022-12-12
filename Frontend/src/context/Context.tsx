import React, { createContext, useState, useEffect , FC} from "react";
import { UserInterface } from "../interfaces/interfaces";

export type contextInterface = {
    loggedIn: boolean,
    setLoggedIn: (userLoggedIn: boolean, user: UserInterface | null) => void,
    user: UserInterface | null
};

const initial_state: contextInterface = {
    loggedIn: false,
    setLoggedIn: () => {return},
    user: null
};

export const GlobalContext = React.createContext<contextInterface | null>(initial_state);

export const GlobalProvider: React.FC<{children: React.ReactNode}> = ( {children} ) => {

    const [state, setState] = useState<contextInterface>(initial_state);

    const setLoggedIn =(userLoggedIn: boolean, user: UserInterface | null): void => {
        setState({
            ...state,
            loggedIn : userLoggedIn,
            user
        });
        localStorage.setItem("logged_in", userLoggedIn ? "true" : "false")
    }

    useEffect(() => {
        if (localStorage.getItem("logged_in") === "true") {
            setState({
                ...state,
                loggedIn : true,
                user : {
                    id: parseInt(localStorage.getItem("id")!),
                    username: localStorage.getItem("username")!,
                    gender: localStorage.getItem("gender")!,
                    access_token: localStorage.getItem("access_token")!,
                    refresh_token: localStorage.getItem("refresh_token")!,
                    type: localStorage.getItem("type")!
                }
            }); 
        }
    }, [])

    return(
        <GlobalContext.Provider value={{
            loggedIn : state.loggedIn,
            setLoggedIn,
            user : state.user
        }}>
            {children}
        </GlobalContext.Provider>);
}