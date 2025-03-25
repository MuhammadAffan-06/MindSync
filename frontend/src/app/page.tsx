'use client'
import Navbar from "@/app/components/navbar/navbar";
import Footer from "@/app/components/footer/footer";
import Image from "next/image";
import styles from "@/app/styles/Home.module.css";
import { useRouter } from "next/navigation";
// import Mobilehome from "@/app/components/mobileHome/mobileHome";

export default function Home() {
 const router = useRouter();

  return (
    <>
      <Navbar />
      <div className={styles.mobileHomeWrapper}>
        {/* <Mobilehome /> */}
      </div>
      <div className={styles.parentSection}>
        <section className={styles.sectionLeft}>
          <h1 className={styles.heading}>
            Engage Your Audience with Interactive Presentations
          </h1>
          <p className="descriptions">
            MindSync makes it easy for educators, trainers, and professionals to
            create interactive, real-time presentations with quizzes, polls, and
            analytics.
          </p>
          <button className="colorButton" onClick={() => router.replace("/auth")}>
            Get Started
          </button>
        </section>
        <section>
          <Image
            src={"/Data-Analysis-Home.svg"}
            alt="Image not Loaded Yet"
            width={370}
            height={370}
          />
        </section>
      </div>
      <h2 className={styles.popularHeading}>Popular Features</h2>
      <section className={styles.featureSection}>
        <section className={styles.featureSectionTop}>
          <div className="features">
            <div className="featuresContent">
              <div className="featureImageContainer">
                <Image
                  src={"/smart-assessments.svg"}
                  alt="Image not Loaded Yet"
                  width={80}
                  height={80}
                />
              </div>
              <p>Smart Assessments</p>
            </div>
            <div className="featureDescription">
              Get automated scoring, detailed performance analysis, and instant
              feedback on quizzes, helping presenters measure understanding at a
              glance.
            </div>
          </div>
          <div className="features">
            <div className="featuresContent">
              <div className="featureImageContainer">
                <Image
                  src={"/interactive-presentations.svg"}
                  alt="Image not Loaded Yet"
                  width={80}
                  height={80}
                />
              </div>
              <p>Interactive Presentations</p>
            </div>
            <div className="featureDescription">
              <p>
                Design captivating presentations with interactive elements like
                quizzes, polls, and live Q&As to boost audience engagement.
              </p>
            </div>
          </div>
          <div className="features">
            <div className="featuresContent">
              <div className="featureImageContainer">
                <Image
                  src={"/real-time-analytics.svg"}
                  alt="Image not Loaded Yet"
                  width={80}
                  height={80}
                />
              </div>
              <p>Real Time Analytics</p>
            </div>
            <div>
              <p className="featureDescription">
                Monitor audience engagement, responses, and participation in
                real-time to adapt and optimize sessions on the spot.
              </p>
            </div>
          </div>
        </section>
        <section className={styles.featureSectionBottom}>
          <div className="features">
            <div className="featuresContent">
              <div className="featureImageContainer">
                <Image
                  src={"/leaderboard.svg"}
                  alt="Image not Loaded Yet"
                  width={80}
                  height={80}
                />
              </div>
              <p>Audience Leaderboard</p>
            </div>
            <div>
              <p className="featureDescription">
                Add a competitive edge to sessions with real-time leaderboards,
                motivating participants and enhancing engagement during quizzes.
              </p>
            </div>
          </div>
          <div className="features">
            <div className="featuresContent">
              <div className="featureImageContainer">
                <Image
                  src={"/browser.svg"}
                  alt="Image not Loaded Yet"
                  width={80}
                  height={80}
                />
              </div>
              <p>Template Library</p>
            </div>
            <div>
              <p className="featureDescription">
                Access a collection of pre-designed, customizable templates to
                make presentation creation fast and visually appealing.
              </p>
            </div>
          </div>
          <div className="features">
            <div className="featuresContent">
              <div className="featureImageContainer">
                <Image
                  src={"/report.svg"}
                  alt="Image not Loaded Yet"
                  width={80}
                  height={80}
                />
              </div>
              <p>Comprehensive Reports</p>
            </div>
            <div className="featureDescription">
              <p>
                Download in-depth performance reports after each session to gain
                insights, identify trends, and make data-driven decisions.
              </p>
            </div>
          </div>
        </section>
      </section>
      <section className={styles.getStarted}>
        <h2 className={styles.popularHeading}>
          Find Out More Awesome Features
        </h2>
        <button className="colorButton" onClick={() => router.replace("/auth")}>
          Get started, it's free
        </button>
      </section>
      <Footer />
    </>
  );
}