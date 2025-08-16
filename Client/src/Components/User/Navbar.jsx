import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Navbar() {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        alert('Logged out successfully!');
    };

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
                            <Link to='/recipes' className="nav-link" >Recipes</Link>
                        </li>
                        {user && (
                            <>
                                <li className="nav-item fw-semibold fs-6">
                                    <Link to='/premium-cookbooks' className="nav-link" >CookBooks</Link>
                                </li>
                                <li className="nav-item fw-semibold fs-6">
                                    <Link to='/cart' className="nav-link" >Cart</Link>
                                </li>
                            </>
                        )}
                        {user?.isAdmin && (
                            <li className="nav-item fw-semibold fs-6">
                                <Link to='/admin' className="nav-link" >Admin</Link>
                            </li>
                        )}
                        <li className="nav-item fw-semibold fs-6">
                            <Link to='/contact-us' className="nav-link" >Contact Us</Link>
                        </li>
                    </ul>
                    
                    {/* User Authentication Section */}
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 pt-2">
                        {user ? (
                            <>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Welcome, {user.name}
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                                    </ul>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item fw-semibold fs-6">
                                    <Link to='/login-page' className="nav-link" >Login</Link>
                                </li>
                                <li className="nav-item fw-semibold fs-6">
                                    <Link to='/register-page' className="nav-link" >Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
