import cookies from 'js-cookie';

export const setToken = (token, expiry) => {
    cookies.set('token', JSON.stringify({ value: token, expiry }), {
      expires: 7
    });
};

export const getToken = () => {
  const cookie = cookies.get('token');
  if (!cookie) {
    return null;
  }
  return (cookie);
};

export const removeToken = () => cookies.remove('token');

export const setUser = (user, expiry) => {
  console.log('Setting User Cookie:', user);
  cookies.set('user', JSON.stringify(user), {
    expires: 7
  });
};

export const getUser = () => {
  const cookie = cookies.get('user');
  console.log('Getting User Cookie:', cookie);
  if (!cookie) {
    return null;
  }
  try{
    const parsedUser = JSON.parse(cookie);
    console.log('Parsed User Cookie:', parsedUser);
    return parsedUser;
  }
  catch(e){
    console.log('Error parsing user cookie:', e)
  }
};

export const removeUser = () => cookies.remove('user');


export const setUserType = (user, expiry) => {
  cookies.set('userType', JSON.stringify(user), {
    expires: 7
  });
};

export const getUserType = () => {
  const cookie = cookies.get('userType');
  if (!cookie) {
    return null;
  }
  try{
    return JSON.parse(cookie);
  }
  catch(e){
    console.log(e)
  }
};

export const removeUserType = () => cookies.remove('userType');

export const removeFcmToken = () => cookies.remove('fcmToken');

export const removeSupportRoomId = () => cookies.remove('supportRoomId');
