import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Compressor from "compressorjs";
import { useState } from "react";
import Camera from "../Camera";
import CustomDialog from '../CustomDialog';

const UploadFiles = ({ file ,fileURLCallback, fileType, submit, finishCallback = false }) => {
    const PHOTO_NOT_VALID = <>Atenção!<br/>{fileType} foi capturada com o celular em modo Retrato (em pé). Vamos tentar de novo? Precisamos em modo PAISAGEM (com celular deitado) ok?</>
    const [dialogStatus, setDialogStatus] = useState({
        open: false,
        message: PHOTO_NOT_VALID,
        action: true
    });
    const [camera, setCamera] = useState(false)

    const handleDialog = () => {
        setDialogStatus(false);
        let element = document.getElementById('file-upload');
        if(element.click)
            element.click();
        else {
            let eventObj = new MouseEvent('click', { bubbles: true, cancelable: false });
            element.dispatchEvent(eventObj);
        }
    }

    const getBase64 = file => {
        return new Promise((resolve, reject) => {
            let baseURL = "";
            let reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                baseURL = reader.result;

                if (fileType === "imagem") {
                    var img = new Image();
                    img.src = baseURL;
                    img.onload = () => {
                        if (img.height > img.width) reject("Imagem em modo retrato.");
        
                        resolve(baseURL);
                    };
                } else {
                    var video = document.createElement("video");
                    video.src = baseURL;
                    video.onloadedmetadata = () => {
                        if (video.videoHeight > video.videoWidth) reject("Vídeo em modo retrato.");
        
                        resolve(baseURL);
                    };
                }
            };
        });
    };

    function onFileChange(e) {
        if (e.target.files[0] === null || e.target.files[0] === undefined) return;
        let file = e.target.files[0];

        setDialogStatus({
            open: true,
            message: 'Processando Imagem...',
            action: false
        });

        new Compressor(file, {
            quality: 0.3,
            success: (result) => {
                setDialogStatus(prev => ({...prev, message: "Confirmando requisitos..."}))

                getBase64(result).then(res => {
                    setDialogStatus(prev => ({ ...prev, open: false }))
                
                    fileURLCallback(res)
                }).catch(err => {
                    console.log(err)
                    setDialogStatus({
                        action: true,
                        message: PHOTO_NOT_VALID,
                        open: true
                    });
                });
            },
            error: (err) => console.error(err)
        });
    }

    const cameraCallback = blob => {
        setCamera(false)

        setDialogStatus({
            open: true,
            message: 'Processando Vídeo...',
            action: false
        });

        console.log((blob.size / 1024).toFixed(1))

        getBase64(blob).then(res => {
            setDialogStatus(prev => ({ ...prev, open: false }))
        
            fileURLCallback(res)
        }).catch(err => {
            console.log(err)
            setDialogStatus({
                action: true,
                message: PHOTO_NOT_VALID,
                open: true
            });
        })
    }

    return <>
        {fileType === 'imagem' ? <h2>tirar foto</h2> : <h2>gravar vídeo</h2>}
        {
        file
         ?  <div className="file-buttons">
                <label htmlFor="file-upload">
                    { fileType === "imagem" ? <input id="file-upload" type="file" accept="image/*" onChange={onFileChange} capture="environment" hidden={true} /> : <input type="button" id="file-upload" onClick={() => setCamera(true)} hidden={true} /> }
                    Repetir
                </label>
                {
                    finishCallback
                    ?   <button className="submitter" onClick={finishCallback}>Finalizar</button>
                    :   null
                }
                <button onClick={() => submit()}>Próxima</button>
            </div>
         :  <div className="camera">
                <label htmlFor="file-upload">
                    { fileType === "imagem" ? <input id="file-upload" type="file" accept="image/*" onChange={onFileChange} capture="environment" hidden={true} /> : <input type="button" id="file-upload" onClick={() => setCamera(true)} hidden={true} /> }
                    <FontAwesomeIcon icon={faCamera} size='4x' className="camera-icon" />
                </label>
            </div>
        }
        { camera ? <Camera callback={cameraCallback} /> : <></> }
        <CustomDialog open={dialogStatus.open} handleClose={handleDialog} action={dialogStatus.action} message={dialogStatus.message} />
    </>
}

export default UploadFiles;