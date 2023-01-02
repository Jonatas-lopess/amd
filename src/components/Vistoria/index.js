import { useState } from 'react';
import Layout from '../../layout';
import Step from '../Step';
import saveData from '../../api/saveData';
import { useParams } from 'react-router-dom';
import { getStorage } from '../CustomStorage';

const Vistoria = ({ body }) => {
    const data = body.data.read().vistoriaEtapas;
    const [currentStep, setCurrentStep] = useState(0);
    const { id, contrato } = useParams();

    const mountStepsArray = () => {
        let arr = []
        for (let index = 0; index < data.length; index++) {
            let element = data[index].imagens;
            for (let i = 0; i < element.length; i++) {
                arr.push(element[i]);
            }          
        }
        return arr;
    }
    const stepsArray = mountStepsArray();

    const mountArrayData = (fileArray) => {
        let arr = []
        for (let index = 0; index < data.length; index++) {
            let x = data[index].imagens;
            x.map((e) => e.cache = fileArray[Number(e.id)])
            arr.push(x)
        }

        return arr;
    };

    const sendFiles = () => {
        let fileArray = [];
        stepsArray.forEach((_, i) => {
            if((i+1) === stepsArray.length) return;

            let file = getStorage(`file_${i}`);
            fileArray.push(file)
        });

        let arrayData = {
            "contrato": contrato,
            "userSession": {
                "id": id
            },
            "vistoriaEtapas": [
                {
                    imagens: mountArrayData(fileArray)
                }
            ],
            "functionPage": "vistoriaSave"
        }

        saveData(arrayData);
    }

    return (
        <Layout stepNumber={stepsArray.length} currentStep={currentStep} changeStep={setCurrentStep}>
            <Step data={stepsArray[currentStep]} id={currentStep} submit={sendFiles} key={currentStep} />
        </Layout>
    )
}

export default Vistoria;