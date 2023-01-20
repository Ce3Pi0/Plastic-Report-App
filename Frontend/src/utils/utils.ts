import { UserChange, UserLogin, UserRegister, LocationInterface } from "../interfaces/interfaces";


//constants
export const DOMAIN: string = '127.0.0.1:5000';
export const STATIC_URL = "127.0.0.1:88/"
export const UNSAFE_PASSWORD: number = 6
export const MACEDONIA_CENTER = {
    lat: 41.56,
    lng: 21.8
};
export const DEFAULT_ZOOM = 9.5;
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


//types
export type methodType = "POST" | "PUT" | "GET" | "DELETE"


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
            if (!data.ok) {
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

const FetchUserChange = (url: string, method: methodType, myHeaders: Headers, user: UserChange | UserRegister | UserLogin, setMessage: any, setMistake: any, presentAlert: any) => {
    fetch(url, {
        method: method,
        headers: myHeaders,
        body: JSON.stringify(user),
    })
        .then(res => {
            if (res.status === 429) {
                presentAlert({
                    subHeader: 'Fail',
                    message: 'To many requests sent... Slow down!',
                    buttons: [{
                        text: 'OK',
                        role: 'confirm',
                    },],
                });

                throw Error("Too many requests sent!")
            }
            if (!res.ok) {
                throw Error("Something went wrong!")
            }
            return res.json();
        })
        .then(json => {
            if (json.msg === "success") {
                setMistake(false);
                setMessage('');
            }
        })
        .catch((err) => {
            setMistake(true)
        })
}

const FetchReportChange = (url: string, method: methodType, myHeaders: Headers, body: BodyInit | undefined | null, presentAlert: any) => {
    fetch(url, {
        method: method,
        headers: myHeaders,
        body: body
    })
        .then(res => {
            if (res.status === 429) {
                presentAlert({
                    subHeader: 'Fail',
                    message: 'To many requests sent... Slow down!',
                    buttons: [{
                        text: 'OK',
                        role: 'confirm',
                    },],
                });

                throw Error("Too many requests sent!")
            }
            if (!res.ok) {
                throw Error("Something went wrong!")
            }
            return res.json();
        })
        .then(json => {
            if (json.msg !== "success")
                throw Error("Something went wrong!");
            if (presentAlert !== undefined) {
                presentAlert({
                    subHeader: 'Success!',
                    message: 'Report sent successfully!',
                    buttons: [{
                        text: 'OK',
                        role: 'confirm',
                        handler: () => {
                            window.location.reload();
                        },
                    },],
                });
            } else window.location.reload();
        })
        .catch(err => Error(err))
}

const FetchIssueChange = (url: string, method: methodType, myHeaders: Headers, body: BodyInit | undefined | null, presentAlert: any) => {
    fetch(url, {
        method: method,
        headers: myHeaders,
        body: body
    })
        .then(res => {
            if (res.status === 429) {
                presentAlert({
                    subHeader: 'Fail',
                    message: 'To many requests sent... Slow down!',
                    buttons: [{
                        text: 'OK',
                        role: 'confirm',
                    },],
                });

                throw Error("Too many requests sent!")
            }
            if (!res.ok) {
                throw Error("Something went wrong!")
            }
            return res.json();
        })
        .then(json => {
            if (json.msg !== "success")
                throw Error("Something went wrong!");
            if (presentAlert !== undefined && method !== "PUT") {
                presentAlert({
                    subHeader: 'Success!',
                    message: 'Issue report sent successfully!',
                    buttons: [{
                        text: 'OK',
                        role: 'confirm',
                        handler: () => {
                            window.location.reload();
                        },
                    },],
                });
            } else window.location.reload();
        })
        .catch(err => Error(err))
}

const FetchUpdateUserImage = (url: string, method: methodType, myHeaders: Headers, body: BodyInit | undefined | null, presentAlert: any) => {
    fetch(url, {
        method: method,
        headers: myHeaders,
        body: body
    })
        .then(res => {
            if (res.status === 429) {
                presentAlert({
                    subHeader: 'Fail',
                    message: 'To many requests sent... Slow down!',
                    buttons: [{
                        text: 'OK',
                        role: 'confirm',
                    },],
                });

                throw Error("Too many requests sent!")
            }
            if (!res.ok){
                throw Error("Something went wrong!")
            }
            return res.json();
        })
        .then(json => {
            if (json.msg !== "success") throw Error("Something went wrong!")

            if (presentAlert !== undefined) {
                presentAlert({
                    subHeader: 'Success!',
                    message: 'User image updated successfully!',
                    buttons: [{
                        text: 'OK',
                        role: 'confirm',
                        handler: () => {
                            window.location.reload();
                        },
                    },],
                });
            } else window.location.reload();
        })
        .catch(err => Error(err))
}

export const FetchRefreshToken = (url: string, method: methodType | undefined, AbtCnt: AbortController | undefined, body: undefined | BodyInit, user: UserChange | UserRegister | UserLogin | undefined, setData: any, setLoading: any, setErr: any,
    setMessage: any, setMistake: any, fetchData: string, updateTokens: any, presentAlert: any, contentType: string | undefined) => {

    let refreshHeaders = new Headers();

    refreshHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("refresh_token")}`);
    refreshHeaders.append("Content-Type", "application/json");

    fetch(`http://${DOMAIN}/user/refresh_token`, {
        method: "GET",
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

            updateTokens();

            let myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${json.access_token}`);

            if (contentType !== "form") myHeaders.append("Content-Type", "application/json");

            switch (fetchData) {
                case "data": FetchData(url, myHeaders, AbtCnt!, setData, setLoading, setErr);
                    break;
                case "report": FetchReportChange(url, method!, myHeaders, null, undefined)
                    break;
                case "user": FetchUserChange(url, method!, myHeaders, user!, setMessage, setMistake, presentAlert);
                    break;
                case "create_report": FetchReportChange(url, method!, myHeaders, body, presentAlert);
                    break;
                case "create_issue": FetchIssueChange(url, method!, myHeaders, body, presentAlert);
                    break;
                case "update_issue": FetchIssueChange(url, method!, myHeaders, null, undefined);
                    break;
                case "update_image": FetchUpdateUserImage(url, method!, myHeaders, body, presentAlert);
                    break;
            }

        })
        .catch(e => {
            if (window.localStorage.getItem('logged_in') === "true") {
                window.alert("Session expired!");
                window.location.assign('/account/login');
                window.localStorage.clear();
            }
            window.localStorage.setItem("logged_in", "false");
        })
}

//functions
const ValidFileType = (file: File) => {
    return fileTypes.includes(file.type);
}

export const UpdateImageDisplay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const preview: Element | null = document.querySelector('.preview');
    const input: HTMLInputElement | null = document.querySelector('.upload');

    if (preview === null || input === null) return;

    while (preview.firstChild) {
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

            if (ValidFileType(curFiles[file])) {
                const image = document.createElement('img');
                image.src = URL.createObjectURL(curFiles[file]);
                image.style.maxHeight = "150px";

                listItem.appendChild(image);
            }

            list.appendChild(listItem);
        }
    }

}

export const GetLocation = (setLocation: React.Dispatch<React.SetStateAction<LocationInterface>>) => {
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude.toFixed(2)
        let long = position.coords.longitude.toFixed(2)
        setLocation({
            lat: lat,
            lng: long
        })
    });
}

export function InstanceOfUserChange(data: any): data is UserChange {
    return 'new_password' in data;
}

export function InstanceOfUserRegister(data: any): data is UserRegister {
    return 'name' in data;
}

export function validateEmail(email: string): boolean {
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
}