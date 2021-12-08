import { useNavigate } from "react-router";

export const Login = () => {
  let navigate = useNavigate();

  return (
    <div>
      <h1>Login to access</h1>
      <button onClick={() => navigate("/")}>Home</button>
      <button>Login</button>
    </div>
  );
};