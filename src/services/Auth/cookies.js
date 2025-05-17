import cookies from 'js-cookie';

const isClient = typeof window !== 'undefined';

export const setToken = (token, expiry) => {
    if (!isClient) return;
    cookies.set('token', token, {
      expires: expiry ? new Date(expiry) : 7
    });
};

export const getToken = () => {
  if (!isClient) return null;
  const token = cookies.get('token');
  if (!token) return null;
  return token;
};

export const removeToken = () => {
  if (!isClient) return;
  cookies.remove('token');
};

export const setUser = (user, expiry) => {
  if (!isClient) return;
  cookies.set('user', JSON.stringify(user), {
    expires: expiry || 7
  });
};

export const getUser = () => {
  if (!isClient) return null;
  try {
    const cookie = cookies.get('user');
    if (!cookie) return null;
    return JSON.parse(cookie);
  } catch(e) {
    console.error('Error parsing user cookie:', e);
    return null;
  }
};

export const removeUser = () => {
  if (!isClient) return;
  cookies.remove('user');
};

export const setUserType = (userType, expiry) => {
  if (!isClient) return;
  cookies.set('userType', JSON.stringify(userType), {
    expires: expiry || 7
  });
};

export const getUserType = () => {
  if (!isClient) return null;
  try {
    const cookie = cookies.get('userType');
    if (!cookie) return null;
    return JSON.parse(cookie);
  } catch(e) {
    console.error('Error parsing userType cookie:', e);
    return null;
  }
};

export const removeUserType = () => {
  if (!isClient) return;
  cookies.remove('userType');
};

export const removeFcmToken = () => {
  if (!isClient) return;
  cookies.remove('fcmToken');
};

export const removeSupportRoomId = () => {
  if (!isClient) return;
  cookies.remove('supportRoomId');
};
