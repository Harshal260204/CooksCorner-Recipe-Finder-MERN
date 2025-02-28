import { Link } from 'react-router-dom';

function Navbar() {

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#CB9DF0" }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to='/'>CooksCorner</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#na vbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link to='/Admin' className="nav-link" style={{ color: "#6A1E55", fontWeight: "600" }}>Admin</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/recipes' className="nav-link" style={{ color: "#6A1E55", fontWeight: "600" }}>Recipes</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/premium-cookbooks' className="nav-link" style={{ color: "#6A1E55", fontWeight: "600" }}>Premium CookBooks</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/saved-recipes' className="nav-link" style={{ color: "#6A1E55", fontWeight: "600" }}>Saved Recipes</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/cart' className="nav-link" style={{ color: "#6A1E55", fontWeight: "600" }}>Cart</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/login-page' className="nav-link" style={{ color: "#6A1E55", fontWeight: "600" }}>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/register-page' className="nav-link" style={{ color: "#6A1E55", fontWeight: "600" }}>Register</Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
