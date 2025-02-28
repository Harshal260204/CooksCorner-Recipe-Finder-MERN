import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3">
      <div className="container text-center">
        {/* Brand Name */}
        <h5 className="fw-bold mb-2">CooksCorner</h5>

        {/* Navigation Links */}
        <ul className="list-inline small mb-2">
          <li className="list-inline-item"><a href="/" className="text-light text-decoration-none">Home</a></li>
          <li className="list-inline-item mx-3"><a href="/recipes" className="text-light text-decoration-none">Recipes</a></li>
          <li className="list-inline-item"><a href="/about" className="text-light text-decoration-none">About</a></li>
          <li className="list-inline-item mx-3"><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
        </ul>

        {/* Social Media Links */}
        <div className="mb-2">
          <a href="#" className="mx-2"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384005.png" alt="Facebook" width="20" /></a>
          <a href="#" className="mx-2"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="20" /></a>
          <a href="#" className="mx-2"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" width="20" /></a>
          <a href="#" className="mx-2"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384012.png" alt="YouTube" width="20" /></a>
        </div>

        {/* Divider */}
        <hr className="border-secondary my-2" />

        {/* Copyright Section */}
        <p className="small m-0">© {new Date().getFullYear()} CooksCorner. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
