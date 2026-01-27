import AboutMe from "../AboutMe";
import ContactMe from "../ContactMe";
import Footer from "../Footer";
import HeroSection from "../HeroSection";
import MySkills from "../MySkills";
import Projects from "../Projects";
import ComingSoon from "../ComingSoon";

export default function Home() {
    return (
        <>
            <HeroSection />
            <MySkills />
            <AboutMe />
            <Projects />
            <ComingSoon />
            <ContactMe/>
            <Footer />
        </>
    );
}
