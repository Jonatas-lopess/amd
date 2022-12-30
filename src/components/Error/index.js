import './style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const ErrorPage = ({ message }) => (
    <div className="main">
        <div className="error-container">
            <h1>{message}</h1>
            <FontAwesomeIcon icon={faCircleExclamation} size='4x' className='error-icon' />
        </div>
    </div>
);

export default ErrorPage;