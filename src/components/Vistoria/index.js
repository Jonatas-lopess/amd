import { useEffect, useState } from 'react';
import Step from '../Step';

const Vistoria = ({ data }) => {
    const [vistoriaState, setVistoriaState] = useState({
        currentStep: 0,
        vistoria: data
    })

    useEffect(() => {
        if(sessionStorage.getItem('initial') === null) sessionStorage.setItem('initial', new Date())
        if(sessionStorage.getItem(`${data.id}_stp`) === null) sessionStorage.setItem(`${data.id}_stp`, 0)
    }, [data.id])

    return <Step data={vistoriaState} changeData={setVistoriaState} key={vistoriaState.currentStep} />
}

export default Vistoria;