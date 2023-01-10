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
                    <h3>CARRO</h3>
                    <p>Vistoria: <span className='cap'>{info.tipo}-CARRO</span></p>
                    <p>Associado: <span>{info.razao_social}</span></p>
                    <p>Placa: <span>{info.placa}</span></p>
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