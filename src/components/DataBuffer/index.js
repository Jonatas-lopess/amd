import { useEffect, useState } from "react";
import Layout from "../../layout";
import Menu from "../Menu";
import Presentation from "../Presentation";
import Vistoria from '../Vistoria';

const DataBuffer = ({ request, header }) => {
    const vistoria = request.data.read();
    const [local, setLocal] = useState(undefined);
    const [fase, setFase] = useState({
        vistoria: false
    });
    const [atual, setAtual] = useState("presentation");
    const list = {
        presentation: <Presentation changeView={setAtual} local={local} setLocal={setLocal}/>,
        menu: <Menu local={local} changeView={setAtual} option={fase} />,
        vistoria: <Vistoria vistoria={vistoria} head={header} callback={setFase} coord={local} />
    }

    useEffect(() => {
        if(atual !== "presentation") setAtual("menu");
    }, [fase])

    return <Layout info={vistoria} >
        { list[atual] }
    </Layout>
}

export default DataBuffer;