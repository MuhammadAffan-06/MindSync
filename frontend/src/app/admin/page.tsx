"use client";

// import Nav from "@/app/components/nav/nav";
import Nav from "@/app/components/nav/nav";

// import "@/app/admin/admin.css";
import "./admin.css";
import Image from "next/image";

export default function Admin() {
  return (
    <>
      <Nav />
      <div className="u-r-managment">
        <h1>User & Role Managment</h1>
        <div className="wrapper-u-r-m">
          <div className="box">
            <Image
              src="user-profile-avatar2.svg"
              alt="Image"
              className="icon-main"
            />
            <div className="boxer">
              <div className="tech">Teacher</div>
              <div className="dropdown">
                <Image src="dropdown2.svg" alt="Image" />
              </div>
            </div>
          </div>
          <div className="box">
            <Image
              src="user-profile-avatar2.svg"
              alt="Image"
              className="icon-main"
            />
            <div className="boxer">
              <div className="tech">Students</div>
              <div className="dropdown">
                <Image src="dropdown2.svg" alt="Image" />
              </div>
            </div>
          </div>
          <div className="box">
            <Image
              src="user-profile-avatar2.svg"
              alt="Image"
              className="icon-main"
            />
            <div className="boxer">
              <div className="tech">Students</div>
              <div className="dropdown">
                <Image src="dropdown2.svg" alt="Image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
