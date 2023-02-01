import React, { useState, useEffect } from "react";

import { IUser, IContext } from "../interfaces/interfaces";


const initial_state: IContext = {
    loggedIn: false,
    setLoggedIn: () => { return },
    updateTokens: () => { return },
    user: null,
    isLoaded: false
};

export const GlobalContext = React.createContext<IContext | null>(initial_state);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, setState] = useState<IContext>(initial_state);

    const setLoggedIn = (userLoggedIn: boolean, user: IUser | null): void => {
        setState({
            ...state,
            loggedIn: userLoggedIn,
            user
        });
        localStorage.setItem("logged_in", userLoggedIn ? "true" : "false")
    }

    const updateTokens = (): void => {
        setState({
            ...state,
            user: {
                id: parseInt(localStorage.getItem("id")!),
                username: localStorage.getItem("username")!,
                gender: localStorage.getItem("gender")!,
                access_token: localStorage.getItem("access_token")!,
                refresh_token: localStorage.getItem("refresh_token")!,
                type: localStorage.getItem("type")!
            }
        })
    }

    useEffect(() => {
        if (localStorage.getItem("logged_in") === "true") {
            setState({
                ...state,
                loggedIn: true,
                user: {
                    id: parseInt(localStorage.getItem("id")!),
                    username: localStorage.getItem("username")!,
                    gender: localStorage.getItem("gender")!,
                    access_token: localStorage.getItem("access_token")!,
                    refresh_token: localStorage.getItem("refresh_token")!,
                    type: localStorage.getItem("type")!
                },
                isLoaded: true
            });
        }
        else {
            setState({
                ...state,
                isLoaded: true
            })
            localStorage.setItem("logged_in", "false");
        }
    }, [])

    return (
        <GlobalContext.Provider value={{
            loggedIn: state.loggedIn,
            setLoggedIn,
            updateTokens,
            user: state.user,
            isLoaded: state.isLoaded
        }}>
            {children}
        </GlobalContext.Provider>);
}