import React from "react";

const ContactUs = () => {
  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Contact Us</h1>
      <form className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" name="name" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" />
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea className="form-control" name="message" />
        </div>
        <button type="submit" className="btn btn-primary">Send Message</button>
      </form>
    </div>
  );
};

export default ContactUs;
