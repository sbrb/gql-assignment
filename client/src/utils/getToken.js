export const getToken = () => {
    if (typeof document !== 'undefined') {
        const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
        return tokenCookie ? tokenCookie.split('=')[1] : null;
    }
    return null; 
};
