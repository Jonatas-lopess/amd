import './styles.css';
import logo from '../../../assets/img/logo.png';

const Header = () => {
    const list = ["Sobre você", "Contratação", "Conclusão"];

    const renderSteps = list.map((item, index) =>
        <li className={"step-item nav-item" + (index === 0 ? " current" : "")} key={item}>
            <a href={"#"+item} className="nav-link" data-etapa={`${index+1}`}>
                <span className="texto-destaque" data-toggle="tooltip" data-placement="bottom" title="" data-original-title={item}>0{index+1}</span>
            </a>
        </li>
    )

    return (
<header>
	<div className="line-header bg-destaque"></div>
	<div className="container container-header">
		
		<div className="content-header">
			<div className="img-logo">
				<img alt="Logo" src={logo} className="img-fluid"/>
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