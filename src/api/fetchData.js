const fetchData = (body) => {
    body.functionPage = "vistoriaList";

    const vistoriaPromise = fetch(
        proccess.env.API_URL,
        {
            method: "POST",
            body: JSON.stringify(body)
        }
        ).then((response) => response.json());

    body.functionPage = "config";

    const configPromise = fetch(
        proccess.env.API_URL,
        {
            method: "POST",
            body: JSON.stringify(body)
        }
        ).then((response) => response.json());

    body.functionPage = "avariasList";

    const avariasPromise = fetch(
        proccess.env.API_URL,
        {
            method: "POST",
            body: JSON.stringify(body)
        }
        ).then((response) => response.json());
    
    body.functionPage = "acessoriosList";

    const acessoriosPromise = fetch(
        proccess.env.API_URL,
        {
            method: "POST",
            body: JSON.stringify(body)
        }
        ).then((response) => response.json());
    

    return {
      vistoria: wrapPromise(vistoriaPromise),
      config: wrapPromise(configPromise),
      avaria: wrapPromise(avariasPromise),
      acessorios: wrapPromise(acessoriosPromise)
    };
};
  
const wrapPromise = (promise) => {
    let status = "pending";
    let result;
    let suspend = promise.then(
        (res) => {
            status = "success";
            result = res;
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