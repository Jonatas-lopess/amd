import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import CustomDialog from '../CustomDialog';

const UploadFiles = ({ file ,fileURLCallback, fileType, changeStep, finishCallback = false }) => {
    const [dialogStatus, setDialogStatus] = useState(false);

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

        getBase64(file).then(res => fileURLCallback(res)).catch(err => {
            setDialogStatus(true);
        });
    }

    return <>
        {fileType === 'imagem' ? <h2>tirar foto</h2> : <h2>gravar vídeo</h2>}
        {
        file
         ?  <div className="file-buttons">
                <label htmlFor="file-upload">
                    <input id="file-upload" type="file" accept={fileType === "imagem" ? "image/*" : "video/*"} onChange={onFileChange} capture="environment" hidden={true} />          
                    Repetir
                </label>
                {
                    finishCallback
                    ?   <button className="submitter" onClick={finishCallback}>Finalizar</button>
                    :   null
                }
                <button onClick={() => changeStep(prev => prev + 1)}>Próxima</button>
            </div>
         :  <div className="camera">
                <label htmlFor="file-upload">
                    <input id="file-upload" type="file" accept={fileType === "imagem" ? "image/*" : "video/*"} onChange={onFileChange} capture="environment" hidden={true} />
                    <FontAwesomeIcon icon={faCamera} size='4x' className="camera-icon" />
                </label>
            </div>
        }
        <CustomDialog open={dialogStatus} handleClose={handleDialog} />
    </>
}

export default UploadFiles;