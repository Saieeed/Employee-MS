import { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = function (e) {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/adminlogin", values)
      .then((response) => {
        const { data } = response;
        if (data.loginStatus === true) {
          navigate("/dashboard");
        } else {
          setError(data.error);
          //alert(error);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <div className="text-warning">{error && error}</div>
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Enter Email"
              className="form-control rounded-0 mb-3"
              value={values.email}
              onChange={(e) =>
                setValues({
                  ...values,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              className="form-control rounded-0 mb-3"
              value={values.password}
              onChange={(e) =>
                setValues({
                  ...values,
                  password: e.target.value,
                })
              }
            />
          </div>

          <button className="mb-2 btn btn-success w-100 rounded-0">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
