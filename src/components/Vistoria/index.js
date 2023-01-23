import { useState } from 'react';
import Step from '../Step';
import saveData from '../../api/saveData';
import { getStorage } from '../CustomStorage';

const Vistoria = ({ vistoria, setSnackStatus, head }) => {
    const [currentStep, setCurrentStep] = useState(0);

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

    const mountArrayData = (fileArray) => {
        vistoria.vistoriaEtapas.map((element) => {
            element.imagens.map((e) => {
                e.cache = fileArray[Number(e.id)]

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
            
            head.functionPage = "vistoriaSave";
            let arrayData = Object.assign({}, head, mountArrayData(fileArray));
            let response = saveData(arrayData).then(res => res.json());

            console.log(response);

            localStorage.clear();
            sessionStorage.clear();
            setSnackStatus({open: true, type: 'success', message: "Vistoria enviada com sucesso!"})
        } catch (error) {
            setSnackStatus({open: true, type: 'error', message: error.message});
        }
    }

    return <Step data={stepsArray[currentStep]} total={stepsArray.length} changeStep={setCurrentStep} submit={sendFiles} key={currentStep} />
}

export default Vistoria;