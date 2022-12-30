import { UserChange, UserLogin, UserRegister, Location } from "../interfaces/interfaces";

//constants
export const domain: string = '127.0.0.1:5000';// needs to change to DOMAIN for better practices throughtout the whole project
export const STATIC_URL = "127.0.0.1:88/"
export const UNSAFE_PASSWORD: number = 6
export type methodType = "POST" | "PUT" | "GET" | "DELETE"
export const MACEDONIA_CENTER = {
    lat: 41.56,
    lng: 21.8
};
export const DEFAULT_ZOOM = 9.5;


//fetches
const FetchData = (url: string, myHeaders: Headers, AbtCnt: AbortController, setData: any, setLoading: any, setErr: any) => {
    fetch(url, {
        method: "GET",
        headers: myHeaders,
        body: null,
        signal: AbtCnt.signal
    })
    .then(data => {
        setLoading(false);
        if (!data.ok){
            throw Error("Something went wrong!")
        }
        return data.json()
    })
    .then(json => {
        setLoading(false);
        setData(json);
        setErr(null);
    })
    .catch(err => {
        setLoading(false);
        setErr(err.message);
    })
}

const FetchUserChange = (url: string, method: methodType, myHeaders: Headers, user: UserChange | UserRegister | UserLogin, setMessage: any, setMistake: any) => {
    fetch(url, {
        method:method,
        headers:myHeaders,
        body:JSON.stringify(user),
    })
    .then(data => {
            if(!data.ok){
                throw Error("Something went wrong!")
                }
            return data.json();

    })
    .then(json => {
        if(json.msg === "success"){
            setMistake(false);
            setMessage('');
        }
    })
    .catch((err) => {
        setMistake(true)
    })
}

const FetchReportChange = (url: string, method: methodType, myHeaders: Headers) => {
    fetch(url, {
        method:method,
        headers:myHeaders,
    })
    .then(data => {
        if (!data.ok){
            throw Error("Something went wrong!")
        }
        return data.json();
    })
    .then(json => {
        if(json.msg === "success")
            window.location.reload();
    })
    .catch(err => Error(err.message))
}

export const FetchRefreshToken = (url: string, method: methodType | undefined, AbtCnt: AbortController | undefined, user: UserChange | UserRegister | UserLogin | undefined, setData: any, setLoading: any, setErr: any,
    setMessage: any, setMistake: any, fetchData: string) => {
        
    let refreshHeaders = new Headers();
    
    refreshHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("refresh_token")}`);
    refreshHeaders.append("Content-Type", "application/json");

    fetch(`http://${domain}/user/refresh_token`, {
        method:"GET",
        headers: refreshHeaders
    })
    .then(data => {
        if (!data.ok)
            throw Error("There was a mistake!")
        return data.json();
    })
    .then(json => {
        localStorage.setItem("access_token", json.access_token);
        localStorage.setItem("refresh_token", json.refresh_token);

        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${json.access_token}`);
        myHeaders.append("Content-Type", "application/json");

        if (fetchData === "data")
            FetchData(url, myHeaders, AbtCnt!, setData, setLoading, setErr);
        else if (fetchData === "report")
            FetchReportChange(url, method!, myHeaders)
        else if (fetchData === "user")
            FetchUserChange(url, method!, myHeaders, user!, setMessage, setMistake);

    })
    .catch(e => {
        if (window.localStorage.getItem('logged_in') === "true"){
            window.alert("Session expired!");
            window.location.assign('/account/login');
            window.localStorage.clear();    
        }
    })
}

//functions
const fileTypes = [
    "image/apng",
    "image/bmp",
    "image/gif",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/svg+xml",
    "image/tiff",
    "image/webp",
    "image/x-icon"
];

const validFileType = (file: File) => {
    return fileTypes.includes(file.type);
}

export const updateImageDisplay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const preview: Element | null = document.querySelector('.preview');
    const input: HTMLInputElement | null = document.querySelector('.upload');

    if (preview === null || input === null) return;

    while(preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    const curFiles = input.files;

    if (curFiles === null) return;

    if (curFiles.length === 0) {
        const para = document.createElement('p');
        para.textContent = 'No files currently selected for upload';
        preview.appendChild(para);
    } else {
        const list = document.createElement('ol');
        preview.appendChild(list);

        for (const file in curFiles) {
            const listItem = document.createElement('li');
            const para = document.createElement('p');
            
            if (validFileType(curFiles[file])) {
                para.textContent = `File name: ${curFiles[file].name}.`;
                const image = document.createElement('img');
                image.src = URL.createObjectURL(curFiles[file]);
                image.style.maxHeight = "150px";

                listItem.appendChild(image);
                listItem.appendChild(para);
            }

            list.appendChild(listItem);
        }
    }

}

export const getLocation = (setLocation: React.Dispatch<React.SetStateAction<Location>>) => {
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude.toFixed(2)
        let long = position.coords.longitude.toFixed(2)
        setLocation({
            lat: lat,
            lng: long
        })
    });
}