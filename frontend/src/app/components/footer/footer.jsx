import "@/app/components/footer/footer.css";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <section className="footerParent">
        <section className="footerChild1">
          <Image
            className="image"
            src="/header.png"
            alt="Image not Loaded Yet"
            width={220}
            height={220}
          />
          <p>
            Empowering interactive learning and engagement for everyone,
            everywhere.
          </p>
        </section>
        <section>
          <h3>Product</h3>
          <p>Feature</p>
          <p>Updates</p>
        </section>
        <section>
          <h3>Company</h3>
          <a href="https://mind-sync-u9h4.vercel.app/about-us" target="_blank">
            <p>About</p>
          </a>
          <a href="https://mind-sync-u9h4.vercel.app/contact-us" target="_blank">
            <p>Contact Us</p>
          </a>
        </section>
        <section>
          <h3>Support</h3>
          <p>Getting Started</p>
          <p>Help Center</p>
          <p>Server Status</p>
          <p>Report a bug</p>
          <p>Chat support</p>
        </section>
        <section>
          <h3>Downloads</h3>
          <p>iOS</p>
          <p>Android</p>
          <p>Mac</p>
          <p>Windows</p>
          <p>Chrome</p>
        </section>
      </section>

      {/* Footer Bottom Section */}
      <hr className="footerDivider" />
      <section className="footerBottom">
        <p>
          Copyright © 2024 MindSync | All Rights Reserved |{" "}
          <a href="#terms">Terms and Conditions</a> |{" "}
          <a href="#privacy">Privacy Policy</a>
        </p>
      </section>
    </>
  );
}
