export interface IUser {
    id: number,
    username: string,
    gender: string,
    access_token: string,
    refresh_token: string,
    type: string
}


export interface IUserLogin {
    username: string,
    password: string
}

export interface IUserChange {
    username: string,
    password: string,
    new_password: string
}

export interface IUserRegister {
    name: string,
    username: string,
    email: string,
    password: string,
    gender: string
}

export interface IForgot{
    password: string
}


export interface IFetch {
    data: JSON | null,
    err: string | null,
    loading: boolean
}


export interface IReport {
    id: number,
    lat: string,
    lon: string,
    status: string,
    user_id: number,
    username: string,
    url: string,
}


export interface IContext {
    loggedIn: boolean,
    setLoggedIn: (userLoggedIn: boolean, user: IUser | null) => void,
    updateTokens: () => void,
    user: IUser | null,
    isLoaded: boolean
};


export interface ILocation {
    lat: string | undefined,
    lng: string | undefined
};


export interface IIssue {
    name: string,
    description: string | undefined;
}

