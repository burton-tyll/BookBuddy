import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            {/* Dropdown Structure */}
            <ul id="dropdown1" className="dropdown-content">
                <li><a href="#!">one</a></li>
                <li><a href="#!">two</a></li>
                <li className="divider"></li>
                <li><a href="#!">three</a></li>
            </ul>
            <nav>
                <div className="nav-wrapper">
                    <a href="/Accueil" className="brand-logo"><img className='logo' src="/img/logo.png"/></a>
                    <ul className="right hide-on-med-and-down">
                        <li><Link to="/collection">Mes listes</Link></li>
                        {/* Dropdown Trigger */}
                        <li><a className="dropdown-trigger" href="#!" data-target="dropdown1">Profil<i className="material-icons right">arrow_drop_down</i></a></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;
