const saveData = async (data) => {
    // localStorage.clear();
    // sessionStorage.clear();

    return await fetch(
        "https://teste.sivisweb.com.br/Modulos/Seguro/Api/AmdApi.php",
        { method: "POST", body: JSON.stringify(data) }
        );
};

export default saveData;