export interface UserInterface {
    id: number,
    username: string,
    gender: string,
    access_token: string,
    refresh_token: string,
    type: string
}


export interface UserLogin {
    username: string,
    password: string
}

export interface UserChange {
    username: string,
    password: string,
    new_password: string
}

export interface UserRegister {
    name: string,
    username: string,
    email: string,
    password: string,
    gender: string
}

export interface ForgotInterface{
    password: string
}


export interface FetchReturn {
    data: JSON | null,
    err: string | null,
    loading: boolean
}


export interface ReportInterface {
    id: number,
    lat: string,
    lon: string,
    status: string,
    url: string,
}


export interface ContextInterface {
    loggedIn: boolean,
    setLoggedIn: (userLoggedIn: boolean, user: UserInterface | null) => void,
    updateTokens: () => void,
    user: UserInterface | null,
    isLoaded: boolean
};


export interface LocationInterface {
    lat: string | undefined,
    lng: string | undefined
};


export interface IssueElementTemplate {
    name: string,
    description: string | undefined;
}

