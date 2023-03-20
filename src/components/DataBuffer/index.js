import { useEffect, useState } from "react";
import Layout from "../../layout";
import CustomSnackbar from "../CustomSnackbar";
import Menu from "../Menu";
import Presentation from "../Presentation";

const DataBuffer = ({ request }) => {
    const vistoria = request.vistoria.read()[0];
    const config = request.config.read();
    const avaria = request.avaria.read();
    const acessorios = request.acessorios.read();
    const theme = {
        primary: config.cor_primaria,
        secondary: config.cor_secundaria,
        emphasis: config.cor_destaque
    }
    const [snack, setSnack] = useState({
        message: '',
        status: false,
        type: 'error'
    });
    const setCSSVariables = () => {
        for (const value in theme) {
            document.documentElement.style.setProperty(`--${value}`, theme[value]);
        }
    }
    const [local, setLocal] = useState({
        lat: Number(localStorage.getItem('location_lat')),
        lng: Number(localStorage.getItem('location_lng'))
    });

    
    useEffect(() => {
        if(window.localStorage && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {}
    }, [])

    useEffect(() => {
        localStorage.setItem('location_lat', local.lat);
        localStorage.setItem('location_lng', local.lng);
    }, [local])

    setCSSVariables();

    return <Layout info={vistoria} logo={config.logo} >
        {
            local.lat && local.lng
             ? <Menu local={local} vistoria={vistoria} avaria={avaria} acessorios={acessorios}/>
             : <Presentation callback={setLocal}/>
        }
        <CustomSnackbar content={snack} setStatus={setSnack} />
    </Layout>
}

export default DataBuffer;