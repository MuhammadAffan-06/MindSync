import "@/app/components/nav/nav.css";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function Nav() {
  const [userName, setuserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setuserName(name);
    }
  });
  return (
    <>
      <nav>
        <div className="logo">
          <Image
            className="image"
            src="/logo.svg"
            alt="Image not Loaded Yet"
            width={196}
            height={64}
          />
        </div>

        <div className="search-container">
          <div className="search-icon">
            <Image
              className="search-icon"
              src="/sreachlogo.svg"
              width={24}
              height={24}
            />
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            aria-label="Search"
          />
        </div>

        {/* this right div act as container for all element on right side */}
        <div className="Right">
          <div>
            <Image
              className="notification"
              src="/notification.svg"
              width={30}
              height={30}
            />
          </div>
          <div>
            <Image
              className="avatar"
              src="/user-profile-avatar.svg"
              width={40}
              height={40}
            />
          </div>
          <div className="Profile">
            <h6>{userName}</h6>
            <p>student</p>
          </div>
          <div className="dropdown-icon">
            <Image src="dropdown.svg" width={18} height={18} />
          </div>
        </div>
      </nav>
    </>
  );
}
