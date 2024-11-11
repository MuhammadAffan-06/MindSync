import Image from "next/image";
import "@/app/components/navbar/navbar.css";
export default function Navbar() {
  return (
    <>
      <div className="navbar-parent">
        <Image
          className="hero-image"
          src="/header.png"
          alt="Image Not Loaded Yet"
          width={240}
          height={130}
        />
        <div className="navbar-buttons">
          <button>Login</button>
          <button className="colorButton">Sign Up</button>
        </div>
      </div>


    </>
  );
}
