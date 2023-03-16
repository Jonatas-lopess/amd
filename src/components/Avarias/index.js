import { useEffect, useState } from "react";
import AvariaStep from "../AvariaStep";
import CustomSnackbar from "../CustomSnackbar";

const Avarias = ({ data, id }) => {
    const [avariaState, setAvariaState] = useState({
        avaria: data,
        index: data.length + 1
    });
    const [snack, setSnack] = useState({
        message: '',
        status: false,
        type: 'error'
    });

    useEffect(() => {
        localStorage.setItem('atual', `avarias_${id}`)
    }, [id]);

    return <>
        <AvariaStep data={avariaState} changeData={setAvariaState} key={avariaState.index} />
        <CustomSnackbar content={snack} setStatus={setSnack} />
    </>
}

export default Avarias;