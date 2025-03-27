import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
import "../styles/login.css";
import { useState } from "react";
import * as Yup from "yup";

function Login({ setToken }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [incorrectError, setIncorrectError] = useState("");
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password cannot exceed 50 characters")
        .required("Password is required")
  });

  const navigate = useNavigate();

  /* Axios.get("https://localhost:7028/api/todo")
      .then((res) => {
        console.log(res.data);
      }); */
  async function handleLogin(e) {
    e.preventDefault();
    try {
      await validationSchema.validate(user, { abortEarly: false });
      setErrors({});
      setIncorrectError("");
      setIsError(false);

      axiosInstance
        .post("/auth/login", user)
        .then((res) => {
          const token = res.data;
          localStorage.setItem("token", token);

          const decodedToken = jwtDecode(token);
          const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]; 

          setToken(token);
          if (userRole === "Admin") {
            navigate("/adminPage");
          } else {
            navigate("/todoPage");
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            setIncorrectError("Email or password is incorrect");
            setIsError(true);
          } else {
            setIncorrectError("An error occurred. Please try again later.");
          }
        });
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="login-body">
      <div className="login-wrapper">
        <div className="form-header">
          <div className="titles">
            <div className="title-login">Login</div>
          </div>
        </div>
        <form onSubmit={handleLogin} className="login-form" autoComplete="off">
          {incorrectError && <p className="error-mesage">{incorrectError}</p>}
          <div className="input-box">
            <input
              type="text"
              className={`input-field ${isError ? "input-error" : ""}`}
              id="log-email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            <label htmlFor="log-email" className="label">
              Email
            </label>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="input-box">
            <input
              type="password"
              className={`input-field ${isError ? "input-error" : ""}`}
              id="log-pass"
              onChange={handleChange}
              name="password"
              value={user.password}
            />
            <label htmlFor="log-pass" className="label">
              Password
            </label>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          <div className="form-cols">
            <div className="col-1"></div>
            <div className="col-2"></div>
          </div>
          <div className="input-box">
            <button type="submit" className="btn-submit" id="SignInBtn">
              Sign In <i className="bx bx-log-in"></i>
            </button>
          </div>
          <div className="switch-form">
            <span>
              Don't have an account? <a href="register">Register</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
