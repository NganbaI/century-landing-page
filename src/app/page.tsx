import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Stats from "@/components/Stats";
import Showcase from "@/components/Showcase";
import Projects from "@/components/Projects";
import CityMap from "@/components/CityMap";
import Awards from "@/components/Awards";
import Inquiry from "@/components/Inquiry";
import Footer from "@/components/Footer";
import AICallbackWidget from "@/components/AICallbackWidget";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className={styles.content}>
          <Intro />
          <Stats />
          <Showcase />
          <Projects />
          <CityMap />
          <Awards />
          <Inquiry />
          <Footer />
        </div>
      </main>
      <AICallbackWidget />
    </>
  );
}
