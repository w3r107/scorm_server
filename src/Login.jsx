import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = ({ token, setToken }) => {
  const [name, setName] = useState("admin@demo.com");
  const [pass, setPass] = useState("pass2023");
  const navigate = useNavigate();
  const handleLogin = async () => {
    console.log("clicked");
    const res = await axios.post(
      "https://sereindevapi.kdev.co.in/auth/signin",
      {
        email: name,
        password: pass,
      }
    );
    // setToken(res?.data?.idToken);
    navigate("/framing", { state: res?.data?.idToken });
  };

  return (
    <div>
      <label>Name:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <br />

      <label>Password:</label>
      <input value={pass} onChange={(e) => setPass(e.target.value)} />
      <button onClick={handleLogin}>Submit</button>
    </div>
  );
};

export default Login;
