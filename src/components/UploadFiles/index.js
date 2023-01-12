import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UploadFiles = ({ fileURLCallback, fileType }) => {
    const rotateImage = (imageBase64, callback) => {
        var img = new Image();
        img.src = imageBase64;
        img.onload = () => {
            if (img.height > img.width) {
                var canvas = document.createElement("canvas");
                canvas.width = img.height;
                canvas.height = img.width;
                var ctx = canvas.getContext("2d");
                ctx.setTransform(1, 0, 0, 1, img.height / 2, img.width / 2);
                ctx.rotate(270 * Math.PI / 180);
                ctx.drawImage(img, -img.width / 2, -img.height / 2);
                callback(canvas.toDataURL("image/jpeg"));
            } else {
                callback(imageBase64);
            }
        };
    }

    const getBase64 = file => {
        return new Promise(resolve => {
            let baseURL = "";
            let reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                baseURL = reader.result;
                rotateImage(baseURL, resolve);
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
                <FontAwesomeIcon icon={faCamera} size='4x' className="camera-icon" />
            </label>
        </div>
    );
}

export default UploadFiles;