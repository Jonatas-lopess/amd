import { useState } from "react";
import Menu from '../Menu';
import Geolocator from "../Geolocator";
import Regras from '../Regras';

const Presentation = ({ changeView }) => {
    const [local, setLocal] = useState(undefined);
    const [menuOpen, setMenuOpen] = useState(false)

    return <>
        <Geolocator coord={local} callback={setLocal} />
        {
            menuOpen ? <Menu changeView={changeView} /> : <Regras closeCallback={setMenuOpen} status={local === undefined} />
        }
    </>
}

export default Presentation;