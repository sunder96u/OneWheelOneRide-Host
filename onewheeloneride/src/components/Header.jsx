import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/wheelride.gif'
import cart from '../assets/icons8-cart-60.png'
import loginIcon from '../assets/icons8-login-96.png'
import logout from '../assets/icons8-logout-100.png'


export default function Header () {

    const navigate = useNavigate()

    let login 
    if (localStorage.getItem('token')) { 
        login = 
        <img src={logout} alt="logout" onClick={() => goLogout()} className="iconSml"/>
    } else {
        login = 
        <img src={loginIcon} alt="login" onClick={() => goLogin()} className="iconSml"/>
    }

    const goLogin = () => {
        navigate("/Login")
    }

    const goLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate("/")
    }


    return (
        <nav className="navbar sticky-top navbar-expand-lg white">
            <div className="container-fluid">
                <img src={logo} className="navbar-brand img-fluid logo" alt="OneWheel OneRide"/>
                <Link className="navbar-brand" to="/">OneWheel OneRide</Link>
                <button className="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-link">
                        <Link className="nav-link" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-link">
                        <Link className="nav-link" aria-current="page" to="/Trails">Trails</Link>
                    </li>
                    <li className="nav-link">
                        <Link className="nav-link" aria-current="page" to="/Groups">Groups</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</Link>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/Parts/2">Onewheel+ XR</Link></li>
                            <li><Link className="dropdown-item" to="/Parts/1">Onewheel GT</Link></li>
                            <li><Link className="dropdown-item" to="/Parts/3">Onewheel Pint/PintX</Link></li>
                        </ul>
                    </li>
                    <li>
                        {login}
                    </li>
                    <li>
                        {/* <button className="btn btn-primary" type="btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">Cart</button> */}
                        <img src={cart} alt="Cart" className="offcanvas-cart iconSml" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart"/>
                    </li>
                </ul>
            </div>
        </nav>
    )
}