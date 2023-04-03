const saveData = (data) => {
    return fetch(
        "https://teste.sivisweb.com.br/Modulos/Seguro/Api/AmdApi.php",
        { method: "POST", body: JSON.stringify(data) }
        );
};

export default saveData;