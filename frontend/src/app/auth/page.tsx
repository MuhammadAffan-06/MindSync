import "./auth.css";
import Image from "next/image";
export default function Auth() {
  return (
    <>
      <div className="main-section">
        <div className="main-section-left">
          <h1>Welcome Back</h1>
          <p>
            Reconnect and enhance your presentations with real-time engagement
            tools. Ready to dive back in?
          </p>
          <button>SIGN IN</button>
        </div>
        <div className="main-section-right">
          <div>
            <Image
              className="hero-image"
              src="/header.png"
              alt="Image Not Loaded Yet"
              width={400}
              height={125}
            />
            <h2 className="hero-heading">Create an Account</h2>
          </div>

          <div className="registration">
            <form action="">
              <input type="email" placeholder="Email" />
              <br />
              <label htmlFor="">Password</label>
              <br />
              <input type="password" placeholder="Enter Password" />
              <p>remember me</p>
              <button className="form-signup">Sign Up</button>
              <br />
              <button className="google-signup">
                <Image
                  src="/GoogleIcon.svg"
                  alt="Google Icon"
                  width={20}
                  height={20}
                />
                <span>Or Sign Up with Google</span>
              </button>

              {/* <button className="google-signup">Or with google</button> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
