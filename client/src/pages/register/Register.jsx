import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";

export default function Register() {
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirmation = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordConfirmation.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords must match");
    } else {
      const user = {
        userName: userName.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">HogwartsSocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on HogwartsSocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={userName}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              ref={password}
              required
              type="password"
              minLength={6}
              className="loginInput"
            />
            <input
              placeholder="Confirm Password"
              ref={passwordConfirmation}
              required
              type="password"
              minLength={6}
              className="loginInput"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button
              className="loginRegisterButton"
              onClick={(e) => {
                e.preventDefault();
                history.push("/login");
              }}
            >
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
