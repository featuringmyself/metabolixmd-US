import { getToken } from "../Auth/cookies";


export const getAuthToken = () => {
    const cookieString = getToken();
    if (cookieString) {
        const { value, expiry } = JSON.parse(cookieString);
        return value;
    }
    return false
}