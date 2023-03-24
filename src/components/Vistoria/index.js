import { useEffect, useState } from 'react';
import Step from '../Step';

const Vistoria = ({ data }) => {
    const [vistoriaState, setVistoriaState] = useState({
        vistoria: data,
        currentStep: getInfo().tipo === 'button' ? 0 : Number(getInfo().id)
    })

    function getInfo() {
        for (const key in data.vistoriaEtapas) {
            const element = data.vistoriaEtapas[key];
            for (const key in element.imagens) {
                if(element.imagens[key].imagem.substr(0, 24) === "/Modulos/Seguro/Api/img/") return element.imagens[key];
            }
        }
    }

    useEffect(() => {
        let date = new Date();
        let newdate = `${date.getDate()}`.padStart(2, "0") + "/" + (`${date.getMonth() + 1}`.padStart(2, "0")) + "/" + date.getFullYear() + " " + `${date.getHours()}`.padStart(2, "0") + ":" + `${date.getMinutes()}`.padStart(2, "0") + ":" + `${date.getSeconds()}`.padStart(2, "0");

        if(localStorage.getItem(`initial_${data.id}`) === null) localStorage.setItem(`initial_${data.id}`, newdate)
        localStorage.setItem('atual', `vistoria_${data.id}`)
    }, [data.id])

    return <Step data={vistoriaState} changeData={setVistoriaState} key={vistoriaState.currentStep} />
}

export default Vistoria;