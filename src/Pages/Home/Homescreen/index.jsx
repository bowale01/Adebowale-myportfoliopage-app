import AboutMe from "../AboutMe";
import ContactMe from "../ContactMe";
import Footer from "../Footer";
import HeroSection from "../HeroSection";
import MySkills from "../MySkills";
import Projects from "../Projects";
import BlogArticles from "../BlogArticles";

export default function Home() {
    return (
        <>
            <HeroSection />
            <MySkills />
            <AboutMe />
            <Projects />
            <BlogArticles />
            <ContactMe/>
            <Footer />
        </>
    );
}
