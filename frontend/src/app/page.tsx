"use client";

import Navbar from "@/app/components/navbar/navbar";
import Footer from "@/app/components/footer/footer";
import Image from "next/image";
import Link from "next/link";

const FEATURES = [
  {
    icon: "/smart-assessments.svg",
    alt: "Smart Assessments Icon",
    title: "Smart Assessments",
    description:
      "Get automated scoring, detailed performance analysis, and instant feedback on quizzes, helping presenters measure understanding at a glance.",
  },
  {
    icon: "/interactive-presentations.svg",
    alt: "Interactive Presentations Icon",
    title: "Interactive Presentations",
    description:
      "Design captivating presentations with interactive elements like quizzes, polls, and live Q&As to boost audience engagement.",
  },
  {
    icon: "/real-time-analytics.svg",
    alt: "Real Time Analytics Icon",
    title: "Real-Time Analytics",
    description: "Monitor audience engagement, responses, and participation in real-time to adapt and optimize sessions on the spot.",
  },
  {
    icon: "/leaderboard.svg",
    alt: "Leaderboard Icon",
    title: "Audience Leaderboard",
    description:
      "Add a competitive edge to sessions with real-time leaderboards, motivating participants and enhancing engagement during quizzes.",
  },
  {
    icon: "/browser.svg",
    alt: "Template Library Icon",
    title: "Template Library",
    description: "Access a collection of pre-designed, customizable templates to make presentation creation fast and visually appealing.",
  },
  {
    icon: "/report.svg",
    alt: "Report Icon",
    title: "Comprehensive Reports",
    description:
      "Download in-depth performance reports after each session to gain insights, identify trends, and make data-driven decisions.",
  },
];

export default function Home() {
  
  return (
    <>
      <Navbar />
      <div className="mt-20 grid w-full grid-cols-1 gap-6 px-4 md:grid-cols-2 md:gap-2 md:px-8 lg:px-16 xl:px-24 2xl:px-32 items-center justify-items-center">
        <section className="flex flex-col gap-4 p-4">
          <h1 className="text-[#141f39] text-3xl font-extrabold md:text-4xl lg:text-5xl">
            Engage Your Audience with Interactive Presentations
          </h1>
          <p className="text-[#4f4f4f]">
            MindSync makes it easy for educators, trainers, and professionals to create interactive, real-time presentations with quizzes,
            polls, and analytics.
          </p>
          <Link href="/auth">
            <button className="bg-gradient-to-b from-[#591cba] to-[#4830e2] text-white  p-3 rounded-[15px] mt-4 hover:brightness-110 transition w-36">
              Get Started
            </button>
          </Link>
        </section>
        <section className="flex justify-center items-center">
          <Image src="/Data-Analysis-Home.svg" alt="Image not Loaded Yet" width={370} height={370} priority />
        </section>
      </div>
      <h2 className="text-[#141f39] font-extrabold text-xl md:text-2xl text-center mt-10"> Popular Features</h2>
      <section className="flex flex-col mt-10 md:mt-20 gap-40 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 items-center justify-items-center">
          {FEATURES.map(({ icon, alt, title, description }, idx) => (
            <div
              key={idx}
              className="group relative bg-[#FAF7FF] border-2 shadow-md shadow-violet-300 rounded-2xl p-8 text-[#4830e2] w-[300px] h-[300px] transition-transform duration-300"
            >
              <div
                className="flex flex-col justify-center align-middle items-center gap-2 transition-transform duration-500 group-hover:-translate-x-[30px]"
              >
                <div className="mt-16 group-hover:mt-0 scale-[1.35] transition-all duration-500 group-hover:scale-100 ">
                  <Image src={icon} alt={alt} width={80} height={80} />
                </div>
                <p className="mt-4 group-hover:mt-0 transition-all">{title}</p>
              </div>
              <div className="opacity-0 scale-0 text-[#4f4f4f] absolute top-[55%] left-0 w-[90%] text-sm pb-12 pointer-events-none transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto group-hover:ml-4">
                {description}
              </div>
            </div>
          ))}
        </div>
      
      </section>
      <section className="flex flex-col items-center justify-center gap-4 mt-12 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
        <h2 className="text-[#141f39] font-extrabold text-xl md:text-2xl text-center"> Find Out More Awesome Features</h2>
        <Link href="/auth">
          <button className="bg-gradient-to-b from-[#591cba] to-[#4830e2] text-white px-6 py-3 rounded-[15px] hover:brightness-110 transition">
            Get started, it's free
          </button>
        </Link>
      </section>
      <Footer />
    </>
  );
}
