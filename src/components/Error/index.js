import './style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Component } from 'react';

export class ErrorBoundary extends Component {
    state = { error: null };
  
    static getDerivedStateFromError(error) {
      return { error: error };
    }

    render() {
      if (this.state.error) {
        if(this.state.error.message.includes("Failed to read the 'localStorage'")) {
          return <ErrorPage message={"Por favor, para funcionamento do site, habilite os Cookies"} />;
        } else {
          return <ErrorPage message={this.state.error.message} />;
        }
      }
  
      return this.props.children; 
    }
  }

export const ErrorPage = ({ message }) => (
    <div className="main">
        <div className="error-container">
            <h1>{message}</h1>
            <FontAwesomeIcon icon={faCircleExclamation} size='4x' className='error-icon' />
        </div>
    </div>
);