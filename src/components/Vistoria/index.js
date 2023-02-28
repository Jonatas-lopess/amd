import { useEffect, useState } from 'react';
import Step from '../Step';

const Vistoria = ({ data }) => {
    const [vistoriaState, setVistoriaState] = useState({
        currentStep: localStorage.getItem(`${data.id}_stp`) === null ? 0 : Number(localStorage.getItem(`${data.id}_stp`)),
        vistoria: data
    })

    useEffect(() => {
        let date = new Date();
        let newdate = `${date.getDate()}`.padStart(2, "0") + "/" + (`${date.getMonth() + 1}`.padStart(2, "0")) + "/" + date.getFullYear() + " " + `${date.getHours()}`.padStart(2, "0") + ":" + `${date.getMinutes()}`.padStart(2, "0") + ":" + `${date.getSeconds()}`.padStart(2, "0");

        if(localStorage.getItem('initial') === null) localStorage.setItem('initial', newdate)
        if(localStorage.getItem(`${data.id}_stp`) === null) localStorage.setItem(`${data.id}_stp`, 0)
    }, [data.id])

    return <Step data={vistoriaState} changeData={setVistoriaState} key={vistoriaState.currentStep} />
}

export default Vistoria;