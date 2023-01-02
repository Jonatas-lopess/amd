import { useState } from 'react';
import Layout from '../../layout';
import Step from '../Step';

const Vistoria = ({ body }) => {
    const data = body.data.read().vistoriaEtapas;
    const [currentStep, setCurrentStep] = useState(0);
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

    return (
        <Layout stepNumber={stepsArray.length} currentStep={currentStep} changeStep={setCurrentStep}>
            <Step data={stepsArray[currentStep]} id={currentStep} key={currentStep} />
        </Layout>
    )
}

export default Vistoria;