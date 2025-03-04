import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg" style={{backgroundColor:"#A0C878"}}>
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold fs-2 ps-2" to='/'>CooksCorner</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 pt-2">
                        <li className="nav-item fw-semibold fs-6">
                            <Link to='/' className="nav-link" >Home</Link>
                        </li>
                        <li className="nav-item fw-semibold fs-6">
                            <Link to='/Admin' className="nav-link" >Admin</Link>
                        </li>
                        <li className="nav-item fw-semibold fs-6">
                            <Link to='/recipes' className="nav-link" >Recipes</Link>
                        </li>
                        <li className="nav-item fw-semibold fs-6">
                            <Link to='/premium-cookbooks' className="nav-link" >CookBooks</Link>
                        </li>
                        <li className="nav-item fw-semibold fs-6">
                            <Link to='/cart' className="nav-link" >Cart</Link>
                        </li>
                        <li className="nav-item fw-semibold fs-6">
                            <Link to='/login-page' className="nav-link" >Login</Link>
                        </li>
                        <li className="nav-item fw-semibold fs-6">
                            <Link to='/register-page' className="nav-link" >Register</Link>
                        </li>
                        <li className="nav-item fw-semibold fs-6">
                            <Link to='/contact-us' className="nav-link" >Contact Us</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
