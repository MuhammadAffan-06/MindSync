"use client";
import Image from "next/image";
import "@/app/components/navbar/navbar.css";
import Link from "next/link";
export default function Navbar() {
  return (
    <>
      <div className="navbar-parent">
        <Image className="hero-image" src="/header.png" alt="Image Not Loaded Yet" width={240} height={130} />
        <div className="navbar-buttons">
          <Link href="/auth" target="_blank">
            {/*Link is preferred over useRouter for static navigation*/}
            <button>Login</button>
            <button className="colorButton">Sign Up</button>
          </Link>
        </div>
      </div>
    </>
  );
}
