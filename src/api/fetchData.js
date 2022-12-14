const fetchData = () => {
    const body = {
        "contrato": "907",
        "userSession": {
            "id": 10201
        },
        "functionPage": "vistoriaList"
    }
    const options = {
        method: "POST",
        body: JSON.stringify(body)
    }
    const dataPromise = fetch(
        "https://teste.sivisweb.com.br/Modulos/Seguro/Api/AmdApi.php",
        options
        ).then((response) => response.json());

    return {
      data: wrapPromise(dataPromise),
    };
};
  
const wrapPromise = (promise) => {
    let status = "pending";
    let result;
    let suspend = promise.then(
        (res) => {
            status = "success";
            result = res[1];
        },
        (err) => {
            status = "error";
            result = err;
        }
    );

    return {
        read() {
            if (status === "pending") {
                throw suspend;
            } else if (status === "error") {
                throw result;
            } else if (status === "success") {
                return result;
            }
        },
    };
};

export default fetchData;