// import "../../CSS/SignIn.css";
// import Alert from "@mui/material/Alert";
// import bg from "../../Images/login-bg.png";
import useWindowSize from "../../Hooks/useWindowSize";
// import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// import { signin } from "../../Actions/authActions";
import { useState } from "react";
// import fbLogo from '../../img/fb-logo.png';
// import googleLogo from '../../img/google-logo.png';
// import githubLogo from '../../img/github-logo.png';
function SigninComponent(props) {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const dispatch = useDispatch();
  // const errorFromServer = useSelector((state) => state.user.error);
  // const user = useSelector((state) => state.user);
  const location = useLocation();
  const size = useWindowSize();

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (location?.state?.cartFlag === true)
  //     dispatch(
  //       signin(
  //         Email.toLowerCase(),
  //         password,
  //         location.state
  //       )
  //     );
  //   else if (user.admin === true)
  //     dispatch(signin(Email.toLowerCase(), password, null, null, null, true));
  //   dispatch(signin(Email.toLowerCase(), password));
  // };

  return (
    <div>
      <div id="SignIncontainer">
        <div className="row justify-content-center">
          <div id="SignIn">
            {size.width > 768 ? (
              <div className="col">
                {/* <img src={bg} width={"100%"} alt="" /> */}
              </div>
            ) : null}
            <form
              // onSubmit={handleSubmit}
              className="col signin-form"
              autocomplete="on"
            >
              <p id="title">התחברות</p>
              <div className="input-field">
                <div className="webflow-style-input-transparent">
                  <input
                    className=""
                    type="email"
                    placeholder="Email Address"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                  <button type="submit">
                    <i className="icon ion-android-arrow-forward"></i>
                  </button>
                  <div className="inner-grad-1"> </div>
                </div>
              </div>
              <div className="input-field">
                <div className="webflow-style-input-transparent">
                  <input
                    className=""
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                  <button type="submit">
                    <i className="icon ion-android-arrow-forward"></i>
                  </button>
                  <div className="inner-grad-1"> </div>
                </div>
              </div>
              <div className="row">
                <a id="forgot" href="/forgot">
                  שכחת סיסמה?
                </a>
              </div>
              <div className="row">
                <button className="home-btn signin-custom-btn" type="submit">
                  התחבר
                </button>
              </div>
              <div className="row">
                <div className="need-acc-txt">
                  אין לך חשבון?{" "}
                  <a href="/SignUp">
                    <b>להרשמה</b>
                  </a>{" "}
                </div>
              </div>
            </form>
            {/* <SocialLogin /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

// function SocialLogin() {
//   return (
//     <div className="social-login">
//       <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
//         <img src={googleLogo} alt="Google" /> Log in with Google
//       </a>
//       <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
//         <img src={fbLogo} alt="Facebook" /> Log in with Facebook
//       </a>
//       <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
//         <img src={githubLogo} alt="Github" /> Log in with Github
//       </a>
//     </div>
//   );
// }
export default SigninComponent;
/*                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey="6Ldn5DEaAAAAALYRhCaGFStvoKGWXRUxuBJVNPrn"
                                onChange={onChange}
                            />
                            */
