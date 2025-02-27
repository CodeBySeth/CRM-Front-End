import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from "react-router-dom";
import { login } from './pages/login';

export const register = () => {
    const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage("User registered successfully!");
        console.log("Response:", data);

        // Clear the form after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          password: "",
        });
      } else {
        setResponseMessage("Error submitting form.");
      }
    } catch (error) {
      setResponseMessage("Error submitting form.");
      console.error("Error:", error);
    }
  };

  <div className="App">
    <header className="App-header">
      <h2>Register</h2>

      <form onSubmit={handleSubmit} className="form-container">
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </label>

        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label>
          Phone Number:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>

        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>

        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>

        <button type="submit">Submit</button>
      </form>

      <>
        <nav>
          <ul>
            <li>
              <Link to="./login">login</Link>
            </li>
          </ul>
        </nav>
  
        <Outlet />
      </>

      {responseMessage && <p>{responseMessage}</p>}
    </header>
  </div>
}


