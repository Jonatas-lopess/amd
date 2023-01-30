import { useEffect, useRef, useState } from 'react';
import Step from '../Step';
import saveData from '../../api/saveData';
import { getStorage } from '../CustomStorage';
import CustomSnackbar from '../CustomSnackbar';
import useTimer from '../Timer';

const Vistoria = ({ vistoria, head, callback, coord }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [snack, setSnack] = useState({
        message: '',
        status: false,
        type: 'error'
    });
    const timer = useTimer();
    let initial = useRef();

    useEffect(() => {
        initial.current = new Date();
    }, []);

    const mountStepsArray = () => {
        let arr = []
        for (let index = 0; index < vistoria.vistoriaEtapas.length; index++) {
            let element = vistoria.vistoriaEtapas[index].imagens;
            for (let i = 0; i < element.length; i++) {
                arr.push(element[i]);
            }          
        }
        return arr;
    }
    const stepsArray = mountStepsArray();

    const mountArrayData = (fileArray, final) => {
        vistoria.vistoriaEtapas.map((element) => {
            element.imagens.map((e) => {
                e.cache = fileArray[Number(e.id)]
                if(e.tipo === "button") {
                    e.latitude = coord.lat
                    e.longitude = coord.lng
                    e.dt_ini = initial.current
                    e.cache = final
                }

                return e;
            })

            return element;
        });

        return vistoria;
    };

    const sendFiles = () => {
        let fileArray = [];
        stepsArray.forEach((_, i) => {
            let file = getStorage(`file_${i}`);
            if (file === null) return;

            fileArray.push(file);
        });

        try {
            if((fileArray.length + 1) !== stepsArray.length) throw Error("Preencha todas as etapas.");
            
            let final = new Date();
            head.functionPage = "vistoriaSave";
            let arrayData = Object.assign({}, head, mountArrayData(fileArray, final));
            
            let response = saveData(arrayData).then(res => res.json());

            console.log(response);

            localStorage.clear();
            sessionStorage.clear();

            callback(prev => ({...prev, vistoria: true}));
        } catch (error) {
            setSnack({
                type: 'error',
                message: error.message,
                status: true
            });
        }
    }

    return <>
        <Step data={stepsArray[currentStep]} total={stepsArray.length} changeStep={setCurrentStep} submit={sendFiles} key={currentStep} timer={timer} />
        <CustomSnackbar content={snack} setStatus={setSnack} />
    </>
}

export default Vistoria;