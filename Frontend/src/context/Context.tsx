import React, { createContext, useState, useEffect , FC} from "react";

export type contextInterface = {
    loggedIn: boolean,
    setLoggedIn: (userLoggedIn: boolean) => void,
};

const initial_state: contextInterface = {
    loggedIn: false,
    setLoggedIn: () => {return},
};

export const GlobalContext = React.createContext<contextInterface | null>(initial_state);

export const GlobalProvider: React.FC<{children: React.ReactNode}> = ( {children} ) => {

    const [state, setState] = useState<contextInterface>(initial_state);

    const setLoggedIn =(userLoggedIn: boolean): void => {
        setState({
            ...state,
            loggedIn : userLoggedIn
        });
        localStorage.setItem("logged_in", userLoggedIn ? "true" : "false")
    }

    useEffect(() => {
        if (localStorage.getItem("logged_in") == "true") {
            setState({
                ...state,
                loggedIn : true
            }); 
        }
    }, [])

    return(
        <GlobalContext.Provider value={{
            loggedIn : state.loggedIn,
            setLoggedIn,
        }}>
            {children}
        </GlobalContext.Provider>);
}