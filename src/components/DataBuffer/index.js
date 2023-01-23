import { useState } from "react";
import Layout from "../../layout";
import Presentation from "../Presentation";
import Vistoria from '../Vistoria';

const DataBuffer = ({ request, header }) => {
    const vistoria = request.data.read();

    const [atual, setAtual] = useState("presentation");
    const list = {
        presentation: <Presentation changeView={setAtual}/>,
        vistoria: <Vistoria vistoria={vistoria} head={header} />
    }

    return <Layout info={vistoria} >
        { list[atual] }
    </Layout>
}

export default DataBuffer;