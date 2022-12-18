import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './style.css';

const UploadFiles = ({ fileURLCallback, fileType }) => {
    function onFileChange(e) {
        if (e.target.files[0] === null || e.target.files[0] === undefined) return;
        fileURLCallback(URL.createObjectURL(e.target.files[0]));
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