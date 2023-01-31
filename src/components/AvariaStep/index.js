import { useEffect, useState } from "react";
import { getStorage, setStorage } from "../CustomStorage";
import UploadFiles from "../UploadFiles";
import img from '../../assets/img/avaria.jpg';

const AvariaStep = ({ index, changeStep, submit }) => {
    const [photoURL, setPhotoURL] = useState(getStorage(`photo_${index}`));
    const [descURL, setDescURL] = useState(getStorage(`desc_${index}`));

    useEffect(() => {
        setStorage(`photo_${index}`, photoURL);
    }, [photoURL, index])

    useEffect(() => {
        setStorage(`desc_${index}`, descURL)
    }, [descURL, index])

    const handleDesc = (e) => {
        setDescURL(e.target.value);
    }

    return <>
        <div className='etapas'>
            <span className={index === 1 ? 'disable' : ''} onClick={index !== 1 ? () => changeStep(index - 1) : null}>&lt;</span>
            <h3>Foto {`${index}`.padStart(2, "0")}</h3>
            <span onClick={() => changeStep(index + 1)}>&gt;</span>
        </div>
        {
            photoURL
            ?   <img src={photoURL} alt="veiculo" className='veiculo-img' />
            :   <img src={img} alt="veiculo" className='veiculo-img' />
        }
        <p>Danos e Avarias</p>
        <textarea className="ma" rows={5} onChange={handleDesc} value={descURL ? descURL : ''} disabled={photoURL === null}></textarea>
        <UploadFiles file={photoURL} fileURLCallback={setPhotoURL} fileType={"imagem"} changeStep={changeStep} finishCallback={submit} />
    </>
}

export default AvariaStep;