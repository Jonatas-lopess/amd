import logo from '../assets/img/logo.png';
import './styles.css';

const Layout = ({ stepNumber, currentStep, changeStep, children }) => {
    return (
        <>
            <header>
                <div className="line-header bg-destaque"></div>
                <div className="container container-header">
                    
                    <div className="content-header">
                        <div className="img-logo">
                            <img alt="Logo" src={logo} className="img-fluid"/>
                        </div>
                        <div className='etapas'>
                            <span className={currentStep === 0 ? 'disable' : ''} onClick={currentStep !== 0 ? () => changeStep(currentStep - 1) : null}>&lt;</span>
                            <h3>Etapa {(currentStep + 1)}/{stepNumber}</h3>
                            <span className={currentStep === (stepNumber - 1) ? 'disable' : ''} onClick={currentStep !== (stepNumber - 1) ? () => changeStep(currentStep + 1) : null}>&gt;</span>
                        </div>
                    </div>
                </div>
            </header>
            <main>{ children }</main>
            <footer className="footer-checkout">
                <div className="container">
                            <div className="d-flex justify-content-center mt-1">
                                <div className="brand brand-card-visa">
                                    <img src="https://portal2.sivisweb.com.br/App/assets/img/icon-card-visa.png" className="img-fluid" alt="Visa"/>
                                </div>
                                <div className="brand brand-card-mastercard">
                                    <img src="https://portal2.sivisweb.com.br/App/assets/img/icon-card-mastercard.png" className="img-fluid" alt="Master Card"/>
                                </div>
                                <div className="brand brand-card-elo">
                                    <img src="https://portal2.sivisweb.com.br/App/assets/img/icon-card-elo.png" className="img-fluid" alt="Elo"/>
                                </div>
                                <div className="brand brand-card-amex">
                                    <img src="https://portal2.sivisweb.com.br/App/assets/img/icon-card-amex.png" className="img-fluid" alt="Amex"/>
                                </div>
                                <div className="brand boleto">
                                        <img src="https://portal2.sivisweb.com.br/App/assets/img/boleto.png" className="img-fluid" alt="Boleto" style={{height: '34px',marginTop: '-4px',marginLeft: '-3px'}}/>
                                    </div>
                                </div>
                    <div className="row justify-content-center mt-1">
                        <div className="text-center">
                            <p className="font-weight-bold">SAC: 24 3026-8309</p>
                            <p>Dúvidas? Fale Conosco</p>
                            <p className='font-weight-bold'>2022 © Desenvolvido por SIVIS TECNOLOGIA</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Layout;