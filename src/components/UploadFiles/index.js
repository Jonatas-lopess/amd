import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import CustomSnackbar from "../CustomSnackbar";

const UploadFiles = ({ fileURLCallback, fileType }) => {
    const [snack, setSnack] = useState({
        message: '',
        status: false,
        type: 'error'
    });

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
                        if (video.videoHeight > video.videoWidth) reject("Vídeo me modo retrato.");
        
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
            setSnack({type: 'error', status: true, message: err});
        });
    }

    return (
        <div className="camera">
            <label htmlFor="file-upload">
                <input id="file-upload" type="file" accept={fileType === "imagem" ? "image/*" : "video/*"} onChange={onFileChange} capture="environment" hidden={true} />
                <FontAwesomeIcon icon={faCamera} size='4x' className="camera-icon" />
            </label>
            <CustomSnackbar content={snack} setStatus={setSnack}/>
        </div>
    );
}

export default UploadFiles;