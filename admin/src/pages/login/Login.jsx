import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { toast } from "react-toastify";
import { signin } from "../../utils/auth";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      toast.error("All fields are required", {
        toastId: "signinToast",
      });
      return;
    }
    setLoading(true);

    try {
      await toast.promise(
        signin(credentials, () => {
          toast.success("signin successful", {toastId: "successToast"});
          window.location.reload()
        }),
        {
          pending: "Signing in...",
          error: "Signin failed",
        },
        {
          toastId: "signinToast",
          position: "top-center",
        }
      );
    } catch (error) {
      console.error("Signin error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
