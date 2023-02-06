import { useState } from "react";
import Layout from "../../layout";
import Menu from "../Menu";
import Presentation from "../Presentation";

const DataBuffer = ({ request }) => {
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

    setCSSVariables();

    return <Layout info={vistoria} logo={config.logo} >
        {
            local
             ? <Menu local={local} vistoria={vistoria} />
             : <Presentation callback={setLocal}/>
        }
    </Layout>
}

export default DataBuffer;