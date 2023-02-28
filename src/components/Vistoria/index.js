import { useEffect, useState } from 'react';
import Step from '../Step';

const Vistoria = ({ data }) => {
    const [vistoriaState, setVistoriaState] = useState({
        currentStep: localStorage.getItem(`${data.id}_stp`) === null ? 0 : Number(localStorage.getItem(`${data.id}_stp`)),
        vistoria: data
    })

    useEffect(() => {
        if(localStorage.getItem('initial') === null) localStorage.setItem('initial', new Date())
        if(localStorage.getItem(`${data.id}_stp`) === null) localStorage.setItem(`${data.id}_stp`, 0)
    }, [data.id])

    return <Step data={vistoriaState} changeData={setVistoriaState} key={vistoriaState.currentStep} />
}

export default Vistoria;