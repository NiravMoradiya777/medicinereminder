import React from "react";
import HeroSection from "./HeroSection"
import Guide from "./Guide"
import Details from "./Details"
import Reviews from "./Reviews"

function App() {

  React.useEffect(() => {
    PageIntroduction();
  }, []);

  let isPageIntroductionCalled = false;

  const PageIntroduction = () => {
    if (!isPageIntroductionCalled && localStorage.getItem("switchState") === "true") {
      console.log(localStorage.getItem("switchState"))
      const text = "Welcome To Home Page";
      const value = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(value);
      isPageIntroductionCalled = true;
    }
  };

  return (
    <div>
      <HeroSection />
      <Guide />
      <Details />
      <Reviews/>
    </div>
  );
}

export default App;