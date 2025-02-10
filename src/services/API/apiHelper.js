import { getToken } from "../Auth/cookies";


export const getAuthToken = () => {
    const cookieString = getToken();
    if (cookieString) {
        const { value, expiryTime } = JSON.parse(cookieString);
        return value;
        // const expiry = (new Date(expiryTime));
    }
    return false
}