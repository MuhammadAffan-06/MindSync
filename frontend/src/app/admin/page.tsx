"use client";

import Nav from "@/app/components/nav/nav";

import "@/app/admin/admin.css";


export default function Admin() {
  return (
    <>
      {/* Navigation Bar */}
      <Nav />
     <div className="u-r-managment">
        <h1>User & Role Managment</h1>
        <div className="wrapper-u-r-m">
            <div className="box">
                <img src="user-profile-avatar2.svg" alt="img" className="icon-main" />
                <div className="boxer">
                <div className="tech">Teacher</div> 
                <div className="dropdown">
                    <img src="dropdown2.svg" alt="img" />
                    </div>
                </div>
                
                </div>
            <div className="box">
                <img src="user-profile-avatar2.svg" alt="img" className="icon-main" />
                <div className="boxer">
                <div className="tech">Students</div> 
                <div className="dropdown">
                    <img src="dropdown2.svg" alt="img" />
                    </div>
                </div>
                
                </div>
            <div className="box">
                <img src="user-profile-avatar2.svg" alt="img" className="icon-main" />
                <div className="boxer">
                <div className="tech">Students</div> 
                <div className="dropdown">
                    <img src="dropdown2.svg" alt="img" />
                    </div>
                </div>
                
                </div>
        </div>
     </div>
    </>
  );
}