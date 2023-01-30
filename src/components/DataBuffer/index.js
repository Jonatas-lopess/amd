import { useEffect, useState } from "react";
import Layout from "../../layout";
import Menu from "../Menu";
import Presentation from "../Presentation";
import Vistoria from '../Vistoria';
import Observation from '../Observation';

const DataBuffer = ({ request, header }) => {
    const vistoria = request.vistoria.read()[0];
    const config = request.config.read();
    const theme = {
        primary: config.cor_primaria,
        secondary: config.cor_secundaria,
        emphasis: config.cor_destaque
    }
    const setCSSVariables = () => {
        for (const value in theme) {
            document.documentElement.style.setProperty(`--${value}`, theme[value]);
        }
    }
    
    const [local, setLocal] = useState(undefined);
    const [fase, setFase] = useState({
        vistoria: vistoria.vistoriaEtapas[vistoria.vistoriaEtapas.length - 1].imagens[0].cache ? true : false,
        observation: false
    });
    const [atual, setAtual] = useState("presentation");
    
    const list = {
        presentation: <Presentation changeView={setAtual} local={local} setLocal={setLocal}/>,
        menu: <Menu local={local} changeView={setAtual} option={fase} />,
        vistoria: <Vistoria vistoria={vistoria} head={header} callback={setFase} coord={local} />,
        observation: <Observation changeView={setAtual} callback={setFase} />
    }

    setCSSVariables();
    
    useEffect(() => {
        if(atual !== "presentation") setAtual("menu");
    }, [fase])

    return <Layout info={vistoria} logo={config.logo} >
        { list[atual] }
    </Layout>
}

export default DataBuffer;