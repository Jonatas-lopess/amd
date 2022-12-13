import './styles.css';

const Footer = () => (
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
</footer>);

export default Footer;