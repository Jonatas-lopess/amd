export const getStorage = key => {
    if(sessionStorage.getItem(key)) return sessionStorage.getItem(key);
    if(localStorage.getItem(key)) return localStorage.getItem(key);

    return null;
}

export const setStorage = ( key, data ) => {
    try {
        if(data == null) return;
        sessionStorage.setItem(key, data);
    } catch (error) {
        if(error.message.includes("exceeded the quota")) {
            try {
                localStorage.setItem(key, data);
            } catch (error) {
                console.log("Local Storage - " + error.message);
            }
        } else {
            console.log("Session Storage - " + error.message);
        };
    }
}