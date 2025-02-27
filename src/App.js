import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

// Home Page Component
export const Home = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
      });
      const [message, setMessage] = useState("");
      const navigate = useNavigate(); // Initialize useNavigate hook
    
      const handleChange = (e) => {
        setCredentials({
          ...credentials,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:8080/api/users", {
                method: "GET",  // GET request to fetch data
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
          const data = await response.json();
          console.log(data);

          for (let i = 0; i < data.length; i++)
          {
              if (data[i].email == credentials.email && data[i].password == credentials.password)
              {
                setMessage("Login successful!");
                localStorage.setItem("user", JSON.stringify(data)); // Store user session
                navigate("/contact"); // Redirect to dashboard or any other page
                break;
              }
              else{
                setMessage("Invalid email or password.");
              }
          }
        } catch (error) {
          setMessage("Error connecting to server.");
          console.error("Error:", error);
        }
      };

  return (
    <div>
      <h2>Login</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

// About Page Component
const About = () => {
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

  return (
    <div className="App">
      <h1>Hello</h1>
      <header className="App-header">
        <h2>Register</h2>

        <form className="form-container" onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Phone Number:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Submit</button>
        </form>

        {responseMessage && <p>{responseMessage}</p>}
      </header>
    </div>
  );
};

// Components for other pages
const Contact = () => <h2>Contact Page</h2>;
const Team = () => <h2>Team Page</h2>;
const Company = () => <h2>Company Page</h2>;

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
