"use client"
import Nav from "../components/nav/nav";
import Image from "next/image";
import "./slide-builder.css";

export default function SlideBuilder() {
  return (
    <div className="slide-builder-container">
      {/* Navbar */}
      <Nav />

      {/* Main Content */}
      <div className="main-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>Slides</h3>
          <div className="slide-thumbnail">
            <Image src="/slide-preview.png" width={240} height={110} alt="Slide Preview" />
            {/* <button>+</button> */}
          </div>
          <button className="add-slide">
            + Add Slide
          </button>
        </aside>

        {/* Slide Editor */}
        <section className="editor">
          <h2 className="presentation-title">First Presentation</h2>
          <div className="selection-box">
            {[
              { icon: "/poll-icon.svg", label: "Poll" },
              { icon: "/wordcloud-icon.svg", label: "Word Cloud" },
              { icon: "/qa-icon.svg", label: "Q&A" },
              { icon: "/text-icon.svg", label: "Plain Text" },
              { icon: "/image-icon.svg", label: "Add Image" },
              { icon: "/mcq-icon.svg", label: "MCQ" },
            ].map((item, index) => (
              <div key={index} className="option">
                <Image src={item.icon} width={40} height={40} alt={item.label} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
