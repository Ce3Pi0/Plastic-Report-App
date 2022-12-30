export interface UserInterface {
    id: number,
    username: string,
    gender: string,
    access_token:string,
    refresh_token:string,
    type: string
}

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

export interface ReportInterface{
    id:number,
    location:string,
    status:string,
    url:string,
}

export interface Location{
    lat: string | undefined,
    lng: string | undefined
}