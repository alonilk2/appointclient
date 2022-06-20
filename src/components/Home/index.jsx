import NavigationBar from "../NavigationBar";
import { AboutUsSection } from "./AboutUsSection";
import "./index.css";
import LoginBox from "./LoginBox";

const HeaderTitle = () => {
  return (
    <div className="right-section-container">
      <h2>אנחנו ניצור לך</h2>
      <h1>דף זימון תורים</h1>
      <h1>מותאם אישית לעסק שלך</h1>
    </div>
  );
};

export default function Home(props) {
  return (
    <div className="home-container">
      <header className="home-header">
        <NavigationBar />
        <div className="header-row">
          <HeaderTitle />
          <LoginBox />
        </div>
      </header>
      <AboutUsSection />
    </div>
  );
}
