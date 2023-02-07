import { Suspense, useEffect, useState } from 'react';
import Step from '../Step';
import { useParams } from 'react-router-dom';
import Loading from '../Loading';
import { ErrorBoundary } from '../Error';
import { fetchVistoria } from '../../api/fetchData';

const Vistoria = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const { id, contrato } = useParams();
    const requestBody = {
        "contrato": contrato,
        "idVistoria": id,
    }

    useEffect(() => {
        sessionStorage.setItem('initial', new Date())
    }, [])

    return <>
        <Suspense fallback={<Loading />}>
            <ErrorBoundary>
                <Step data={fetchVistoria(requestBody)} step={currentStep} changeStep={setCurrentStep} key={currentStep} />
            </ErrorBoundary>
        </Suspense>
    </>
}

export default Vistoria;