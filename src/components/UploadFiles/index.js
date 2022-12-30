import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './style.css';

const UploadFiles = ({ fileURLCallback, fileType }) => {
    const getBase64 = file => {
        return new Promise(resolve => {
            let baseURL = "";
            let reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };

    function onFileChange(e) {
        if (e.target.files[0] === null || e.target.files[0] === undefined) return;

        let file = e.target.files[0];
        getBase64(file).then(res => fileURLCallback(res));
    }

    return (
        <div className="camera">
            <label htmlFor="file-upload">
                <input id="file-upload" type="file" accept={fileType === "imagem" ? "image/*" : "video/*"} onChange={onFileChange} capture="environment" hidden={true} />
                <FontAwesomeIcon icon={faCamera} size='3x' className="cameraIcon" />
            </label>
        </div>
    );
}

export default UploadFiles;