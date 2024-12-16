'use client';
import React, { useState } from 'react';
import Nav from "@/app/components/nav/nav";
import "@/app/slide-builder/slide-builder.css";
import Image from "next/image";

export default function Sidebuilder() {
  const [showFeatures, setShowFeatures] = useState(false);

  const handleAddSlideClick = () => {
    setShowFeatures(true);
  };

  return (
    <>
      {/* Navigation Bar */}
      <Nav />

      {/* Main Content */}
      <div className="main-content">
        <div className="slides-panel">
          <h2 className="slides-title">Slides</h2>
          <div className="slide-item">
            <Image src="/temp.png" alt="Slide Thumbnail" width={410} height={60} />
          </div>
          <div className="slide-item">
            <Image src="/temp.png" alt="Slide Thumbnail" width={410} height={60} />
          </div>

          {/* Clickable Add Slide box */}
          <div className="add-slide-item" onClick={handleAddSlideClick}>
            <div className="add-slide-plus">+</div>
            <p className="add-slide-text">Add Slide</p>
          </div>
        </div>

        <div className="editor-container">
          {showFeatures ? (
            <div className="feature-options">
              <div className="feature-option">
                <div className="feature-icon">
                  <Image src="/poll-icon.svg" alt="Poll Icon" width={40} height={40} />
                </div>
                <p className="feature-label">Poll</p>
              </div>
              <div className="feature-option">
                <div className="feature-icon">
                  <Image src="/quiz-icon.svg" alt="Quiz Icon" width={40} height={40} />
                </div>
                <p className="feature-label">Quiz</p>
              </div>
              <div className="feature-option">
                <div className="feature-icon">
                  <Image src="/qa-icon.svg" alt="Q&A Icon" width={40} height={40} />
                </div>
                <p className="feature-label">Q&A</p>
              </div>
            </div>
          ) : (
            <div className="feature-card">
              <div className="feature-plus">+</div>
              <p className="feature-text">Add feature like Poll, Quiz and Q&A</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}