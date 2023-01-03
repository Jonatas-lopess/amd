import logo from '../assets/img/logo.png';
import './styles.css';

const Layout = ({ info, children }) => {
    return (
        <>
        <header>
            <div className="line-header bg-destaque"></div>
            <div className="container-header">
                <div className="img-logo">
                    <img alt="Logo" src={logo} className="img-fluid"/>
                </div>
                <div className='infos'>
                    <h3>Automóvel</h3>
                    <p>Vistoria <span className='cap'>{info.tipo}</span></p>
                    <div className='info-row'>
                        <p>Placa: <span>{info.placa}</span></p>
                        <p>Associado: <span>{info.razao_social}</span></p>
                   </div>
                </div>
            </div>
        </header>
        <main>{ children }</main>
        <footer className="footer-checkout">
            <p>2023 © SIVIS TECNOLOGIA</p>
        </footer>
        </>
    );
}

export default Layout;