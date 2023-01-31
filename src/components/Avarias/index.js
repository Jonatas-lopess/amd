import { useState } from "react";
import AvariaStep from "../AvariaStep";
import CustomSnackbar from "../CustomSnackbar";
import { forstorage } from "../CustomStorage";

const Avarias = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [snack, setSnack] = useState({
        message: '',
        status: false,
        type: 'error'
    });

    const sendFiles = () => {
        let fileArray = [];        
        forstorage(e => fileArray.push(e));

        try {
            console.log(fileArray);

            localStorage.clear();
            sessionStorage.clear();

            setSnack({
                type: 'success',
                message: "enviado com sucesso",
                status: true
            });
        } catch (error) {
            setSnack({
                type: 'error',
                message: error.message,
                status: true
            });
        }
    }

    return <>
        <AvariaStep index={currentStep} changeStep={setCurrentStep} submit={sendFiles} key={currentStep} />
        <CustomSnackbar content={snack} setStatus={setSnack} />
    </>
}

export default Avarias;