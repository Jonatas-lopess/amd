import { useEffect, useRef, useState } from 'react';
import Step from '../Step';
import saveData from '../../api/saveData';
import CustomSnackbar from '../CustomSnackbar';
import useTimer from '../Timer';
import { db } from '../../db';
import { useParams } from 'react-router-dom';

const Vistoria = ({ vistoria, callback, coord }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [snack, setSnack] = useState({
        message: '',
        status: false,
        type: 'error'
    });
    const { id, contrato } = useParams();
    const requestBody = {
        "contrato": contrato,
        "idVistoria": id,
        "functionPage": "vistoriaSave"
    }
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
                if(fileArray[Number(e.id)]) e.cache = fileArray[Number(e.id)].value
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

    const sendFiles = async () => {
        try {
            let fileArray = await db.files.toArray();
            
            if((fileArray.length + 1) !== stepsArray.length) throw Error("Preencha todas as etapas.");
            
            let final = new Date();
            let arrayData = Object.assign({}, requestBody, mountArrayData(fileArray, final));
            
            let response = saveData(arrayData).then(res => res.json());

            console.log(response);

            await db.files.clear();
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