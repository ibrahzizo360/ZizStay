import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { toast } from "react-toastify";
import { signin } from "../../utils/auth";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

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
          setRedirect(true);
          navigate("/");
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

  if (redirect) {
    navigate("/");
  }

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
