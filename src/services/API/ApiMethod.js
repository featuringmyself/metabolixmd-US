
import { auth } from "../Auth/firebaseConfigue"
import { setToken } from "../Auth/cookies";
import { getAuthToken } from "./apiHelper";
import { toast } from "react-toastify";





const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;


export async function tokenValidator() {
    const token = await getAuthToken();
    if (!token) {
        return null;
    }

    function parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    const user = parseJwt(token);
    if (user.exp * 1000 < Date.now()) {
        return new Promise((resolve, reject) => {
            auth.onAuthStateChanged(async function (currentUser) {
                if (currentUser) {
                    try {
                        let newToken = await auth.currentUser.getIdToken(true);
                        const expiryTime = new Date(Date.now() + 3600 * 1000);
                        setToken(newToken, expiryTime);
                        resolve(newToken);
                    } catch (err) {
                        console.log(err);
                        reject(err);
                    }
                } else {
                    resolve(null);
                }
            });
        });
    } else {
        return token;
    }
}

export async function getMethod(url, payload) {
    const token = await tokenValidator()

    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("timezone", tz);
    var requestOptions;
    if (payload) {
        myHeaders.append("Content-Type", "application/json");
        requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            body: JSON.stringify(payload)
        };
    }
    else {
        requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
    }

    if (token) {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + url, requestOptions)
            // console.log(response)
            const data = await response.json()
            return data

        }
        catch (e) {
            return e.message
        }
    }
}

export async function getAuthData(url) {
    const token = await tokenValidator()
    if (token) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("timezone", tz);


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + url, requestOptions)
            const data = await response.json()
            return data
            // if (data.status == true) {
            //     return data
            // }
            // else {
            //     return data.message
            // }
        }
        catch (e) {
            toast (e.message)
        }
    }
    else {
        return false
    }
}

export async function postWithFileMethod(url, payload) {
    const token = await tokenValidator()
    if (token) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("timezone", tz);
        // myHeaders.append("Content-Type", "application/json");

        var raw = payload

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        }
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + url, requestOptions)
            const data = await response.json()
          
                return data
           
        }
        catch (e) {
            toast (e.message)
        }
    }
    else {
        return false
    }
}
export async function postMethod(url, payload) {
    const token = await tokenValidator()
    if (token) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("timezone", tz);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(payload)
        var requestOptions;
        if (payload) {
            requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            }
        }
        else {
            requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow'
            }
        }
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + url, requestOptions)
            const data = await response.json()

                return data
            
        }
        catch (e) {
            toast (e.message)
        }
    }
    else {
        toast.warn("You aren't logged in!")
        return false
    }
}

export async function patchWithFileMethod(url, payload) {
    const token = await tokenValidator()
    if (token) {
        var myHeaders = new Headers();
        myHeaders.append("timezone", tz);
        myHeaders.append("Authorization", `Bearer ${token}`);
        // myHeaders.append("Content-Type", "application/json");

        var raw = payload

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        }
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + url, requestOptions)
            const data = await response.json()
           
                return data
           
        }
        catch (e) {
            toast (e.message)
        }
    }
    else {
        return false
    }
}

export async function patchWithFileMethodCustomToken(url, payload, token) {

    if (token) {
        var myHeaders = new Headers();
        myHeaders.append("timezone", tz);
        myHeaders.append("Authorization", `Bearer ${token}`);
        // myHeaders.append("Content-Type", "application/json");

        var raw = payload

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        }
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + url, requestOptions)
            const data = await response.json()
            if (data.status == true) {
                return data
            }
            else {
                return data
            }
        }
        catch (e) {
            return e.message
        }
    }
    else {
        return false
    }
}

export async function patchMethod(url, payload) {
    const token = await tokenValidator()
    if (token) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("timezone", tz);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(payload)
        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + url, requestOptions)
            const data = await response.json()

            return data

        }
        catch (e) {
            toast (e.message)
        }
    }
    else {
        return false
    }
}

export async function deleteMethod(url, payload) {
    const token = await tokenValidator()
    if (token) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("timezone", tz);
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        if (payload) {
            var raw = JSON.stringify(payload)
            requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
        }
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + url, requestOptions)
            const data = await response.json()
            if (data.status == true) {
                return data
            }
            else {
                return data.message
            }
        }
        catch (e) {
            return e.message
        }
    }
    else {
        return false
    }
}

export async function putMethod(url, payload) {
    const token = await tokenValidator()
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("timezone", tz);
    var requestOptions;
    if (payload) {
        myHeaders.append("Content-Type", "application/json");
        requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow',
            body: JSON.stringify(payload)
        };
    }
    else {
        requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow'
        };
    }
    if (token) {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + url, requestOptions)
            // console.log(response)
            const data = await response.json()
            return data

        }
        catch (e) {
            return e
        }
    }
}


// export async function fileUpload(file, type) {
//     const token = await tokenValidator()
//     if (token) {
//         var myHeaders = new Headers();
//         myHeaders.append("firebasetoken", token);
//         // myHeaders.append("Content-Type", "application/json");

//         var formdata = new FormData();
//         formdata.append("file", file);
//         formdata.append("type", type);

//         var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: formdata,
//             redirect: 'follow'
//         };

//         try {
//             const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "file-upload", requestOptions)
//             const data = await response.json()
//             if (data.status == true) {
//                 return data
//             }
//             else {
//                 return data.message
//             }
//         }
//         catch (e) {
//             return e.message
//         }
//     }
//     else {
//         return false
//     }

// }