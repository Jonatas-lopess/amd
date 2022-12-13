import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fa1, fa2, fa3, fa4, fa5, fa6, fa7, fa8, fa9 } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const Header = () => {
    const stepIconArray = [fa1, fa2, fa3, fa4, fa5, fa6, fa7, fa8, fa9];
    const list = ["Sobre você", "Contratação", "Conclusão"];

    const renderSteps = list.map((item, index) =>
        <li className={"step-item nav-item" + (index === 0 ? " current" : "")} key={item}>
            <a href={"#"+item} className="nav-link" data-etapa="1">
                <FontAwesomeIcon icon={stepIconArray[index]} className="icon" />
                <span className="texto-destaque" data-toggle="tooltip" data-placement="bottom" title="" data-original-title={item}>{item}</span>
            </a>
        </li>
    )

    return (
<header>
	<div className="line-header bg-destaque"></div>
	<div className="container container-header">
		
		<div className="content-header">
			<div className="img-logo">
				<img alt="Logo" src="https://sivisweb.com.br/Pessoas/907/Empresa/logo_001.png" className="img-fluid"/>
			</div>
			<div className="horizontal-steps">
				<ul id="list-item" className="horizontal-steps-content">
                    {renderSteps}
                </ul>
				<div className="process-line bg-destaque" style={{width: '0%'}}></div>
			</div>
		</div>
	</div>
</header>)
};

export default Header;