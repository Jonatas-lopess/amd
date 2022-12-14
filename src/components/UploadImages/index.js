import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './style.css';

const UploadImages = (props) => {
    function onImageChange(e) {
        if (e.target.files[0] === null) return;
        props.imageURLCallback(URL.createObjectURL(e.target.files[0]));
    }
    
    return (
        <div className="camera">
            <label htmlFor="image-upload">
                <input id="image-upload" type="file" accept="image/*" onChange={onImageChange} capture="environment" hidden={true} />
                <FontAwesomeIcon icon={faCamera} size='3x' className="cameraIcon" />
            </label>
        </div>
    );
}

export default UploadImages;