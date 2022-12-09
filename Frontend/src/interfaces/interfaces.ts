export interface UserLogin {
    username: string,
    password: string
}

export interface UserChange {
    username:string,
    password:string,
    new_password:string
}

export interface UserRegister{
    name: string,
    username: string,
    email: string,
    password: string,
    gender: string 
}

export interface fetchReturn{
    data: JSON|null,
    err: string|null,
    loading: boolean
}