import Image from "next/image";
import "@/app/components/mobileHome/mobileHome.css";
import { FaCheck } from "react-icons/fa6";

export default function Mobilehome() {
  return (
    <>
     
      <section className="hero-images">
        <Image
          src="/Data-Analysis-Home.svg"
          alt="Image not Loaded Yet"
          width={155}
          height={155}
        />
        <Image
          className="card-1"
          src="/Card01.svg"
          alt="Image not Loaded Yet"
          width={130}
          height={100}
        />
        <Image
          src="/Card02.png"
          alt="Image not Loaded Yet"
          width={140}
          height={130}
        />
      </section>
      <section className="hero-section">
        <h1 className="main-heading">Smart-Thinking & Innovative Solution.</h1>
        <p className="descriptions">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias
          facilis fuga consectetur nulla vero, tempore quasi at accusantium
          nisi, dolores illo soluta a perferendis, eligendi ratione placeat
          magni maiores expedita?
        </p>
      </section>
      <section className="getStarted">
        <button className="colorButton">Get Started</button>
      </section>
      <section>
        <ul className="tick-list">
          <li className="descriptions">
            <FaCheck className="check-icon" />
            Get 15 days free trial
          </li>
          <li className="descriptions">
            <FaCheck className="check-icon" />
            Access all features
          </li>
          <li className="descriptions">
            <FaCheck className="check-icon" />
            Cancel anytime
          </li>
        </ul>
      </section>
    </>
  );
}
