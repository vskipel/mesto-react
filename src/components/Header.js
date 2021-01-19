import logo from '../images/mesto-logo.svg';

function Header() {
  return (

      <header className="header">
          <img src={logo} alt="Место - логотип сайта" className="logo" /> 
        </header>
  );
}

export default Header;