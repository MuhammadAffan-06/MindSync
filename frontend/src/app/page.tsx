import Navbar from "@/app/components/navbar/navbar";
import Footer from "@/app/components/footer/footer";
import Image from "next/image";
import styles from "@/app/styles/Home.module.css";
import Mobilehome from "@/app/components/mobileHome/mobileHome"
export default function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.mobileHomeWrapper}>
        <Mobilehome />
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
          <button className="colorButton">Get Started</button>
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
          <p>Smart Assessments</p>
          <p>Interactive Presentations</p>
          <p>Real Time Analytics</p>
        </section>
        <section className={styles.featureSectionBottom}>
          <p>Polling</p>
          <p>Interactive Presentations</p>
          <p>Real Time Analytics</p>
        </section>
      </section>
      <section className={styles.getStarted}>
        <h2 className={styles.popularHeading}>
          Find Out More Awesome Features
        </h2>
        <button className="colorButton">Get started, it's free</button>
      </section>

      <Footer />
    </>
  );
}
