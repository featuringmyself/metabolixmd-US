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
    try {
        const token = await tokenValidator();
        if (!token) {
            console.error('No valid token found for API request');
            return null;
        }

        console.log(`Making GET request to ${url}`);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("timezone", tz);
        
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        if (payload) {
            myHeaders.append("Content-Type", "application/json");
            requestOptions.body = JSON.stringify(payload);
        }

        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, requestOptions);
        
        // Check if the response is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const text = await response.text();
            console.error('Non-JSON response received:', {
                url,
                status: response.status,
                contentType,
                text: text.substring(0, 200) // Log first 200 chars of response
            });
            throw new Error(`Invalid response format. Expected JSON but got ${contentType}`);
        }

        const data = await response.json();

        if (!response.ok) {
            console.error('API request failed:', {
                url,
                status: response.status,
                data
            });
            throw new Error(data.message || `Request failed with status ${response.status}`);
        }

        if (url.includes('/order')) {
            console.log('Order data received:', {
                count: Array.isArray(data.data) ? data.data.length : 'single order',
                hasPayments: Array.isArray(data.data) ? 
                    data.data.filter(o => o.payment).length : 
                    (data.data?.payment ? 'yes' : 'no')
            });
        }

        return data;
    } catch (e) {
        console.error('API request error:', {
            url,
            error: e.message,
            apiUrl: process.env.NEXT_PUBLIC_API_URL
        });
        toast.error(e.message);
        return null;
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
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, requestOptions)
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
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, requestOptions)
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
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, requestOptions)
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
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, requestOptions)
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
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, requestOptions)
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
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, requestOptions)
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
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, requestOptions)
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
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, requestOptions)
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
//             const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "file-upload", requestOptions)
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