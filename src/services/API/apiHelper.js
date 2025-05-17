import { getToken } from "../Auth/cookies";


export const getAuthToken = () => {
    const token = getToken();
    return token || false;
}