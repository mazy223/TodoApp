import { useState } from "react";
import "../styles/login.css";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

function Register() {
  const [user,setUser] = useState({
          firstName: "",
          lastName: "",
          email:"",
          password:""
      });

      const [errors, setErrors] = useState({});
      
      const validationSchema = Yup.object({
        firstName:Yup.string()
          .trim()
          .matches(/^[A-Za-z\s]+$/, "First name cannot contain numbers or special characters")
          .min(3, "First name must be at least 3 characters")
          .required("First name is required")
          .max(25, "First name must be at most 25 characters")
          ,
        lastName: Yup.string()
          .trim()
          .matches(/^[A-Za-z\s]+$/, "Last name cannot contain numbers or special characters")
          .min(3, "Last name must be at least 3 characters")
          .required("Last Name is required")
          .max(25, "Last name must be at most 25 characters"),

        email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
        password: Yup.string()
          .required("Password is required")
          .min(6,"Password must be at least 6 characters")
          .max(20, "Password cannot exceed 50 characters")
      })

      const navigate = useNavigate();

      /* function validateForm() 
      {
        const newErrors = {};

        // İlk ad - boş olamaz
    if (!user.firstName) newErrors.firstName = "First name is required";

    // Soyad - boş olamaz
    if (!user.lastName) newErrors.lastName = "Last name is required";

    // E-posta doğrulama
    if (!user.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Email is invalid";
    }

    // Şifre - minimum 6 karakter
    if (!user.password) {
      newErrors.password = "Password is required";
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);

    // Eğer hata yoksa formu gönderebiliriz
    return Object.keys(newErrors).length === 0;
      } */

      function handleChange(e)
      {
          const {name,value} = e.target;
  
          setUser((prev) => ({
              ...prev,
              [name] : value
          }));
      }

      async function handleRegister(e)
      {
        e.preventDefault();

        try{
          await validationSchema.validate(user, {abortEarly:false});
          setErrors({});
          axiosInstance.post("/auth/register",user)
            .then((res) => {
                navigate('/');
            })
            .catch((err) => {
              console.log(`Hata olustu ${err}`);
            }) 
        }
        catch(error)
        {
          const newErrors = {}

          error.inner.forEach(err => {
            newErrors[err.path] = err.message;
          });

          setErrors(newErrors);
        }
        
      }
  return (
    <div className="login-body">
      <div className="register-wrapper">
        <div className="form-header">
          <div className="titles">
            <div className="title-register">Register</div>
          </div>
        </div>
        <form onSubmit={handleRegister} className="register-form" autoComplete="off">
          <div className="input-box">
            <input 
            type="text" 
            className="input-field" 
            id="reg-firstName" 
            onChange={handleChange}
            name="firstName"
            value={user.firstName}
            />
            <label htmlFor="reg-firstName" className="label">
              First Name
            </label>
            {errors.firstName && <span className="error-text">{errors.firstName}</span>}
          </div>
          <div className="input-box">
            <input 
            type="text" 
            className="input-field" 
            id="reg-lastName" 
            name="lastName"
            value={user.lastName}
            onChange={handleChange} />
            <label htmlFor="reg-lastName" className="label">
              Last Name
            </label>
            {errors.lastName && <span className="error-text">{errors.lastName}</span>}
          </div>
          <div className="input-box">
            <input
              type="text"
              className="input-field"
              id="reg-email"
              name="email"
              value={user.email}
              onChange={handleChange}
              
            />
            <label htmlFor="reg-email" className="label">
              Email
            </label>
            {errors.email && <span className="error-text">{errors.email}</span>}
            <i className="bx bx-envelope icon"></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              className="input-field"
              onChange={handleChange}
              name="password"
              value={user.password}
              id="reg-pass"
            />
            <label htmlFor="reg-pass" className="label">
              Password
            </label>
            {errors.password && <span className="error-text">{errors.password}</span>}
            <i className="bx bx-lock-alt icon"></i>
          </div>
          <div className="form-cols">
            <div className="col-1">
            </div>
            <div className="col-2"></div>
          </div>
          <div className="input-box">
            <button type="submit" className="btn-submit" id="SignUpBtn">
              Sign Up <i className="bx bx-user-plus"></i>
            </button>
          </div>
          <div className="switch-form">
            <span>
              Already have an account? <a href="/">Login</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
