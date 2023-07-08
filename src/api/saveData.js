const saveData = (data) => {
    return fetch(
        proccess.env.API_URL,
        { method: "POST", body: JSON.stringify(data) }
        );
};

export default saveData;