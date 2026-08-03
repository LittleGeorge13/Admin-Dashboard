const env = import.meta.env.MODE;

export const getBaseUrl = () => {
    // eslint-disable-next-line no-restricted-globals
    const url = location.href;
    if (env === 'development') {
        return 'http://localhost:8800';
    } else { 
        return 'https://netflix-api-wkaj.onrender.com';
    }
}