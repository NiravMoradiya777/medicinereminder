import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import DonationForm from './DonationForm';

const stripePromise = loadStripe('pk_test_51OFmdkFfxqAxSPLIdwqjhlFLViepucyOwMB1Ki84DRftNeY0OVvN0EVXckhhokUcGir04ZufKLcdV6JG1jJtXtuR00nVqxgwyw'); // Replace with your actual Stripe public key

const App = () => {

  React.useEffect(() => {
    PageIntroduction();
  }, []);

  let isPageIntroductionCalled = false;

  const PageIntroduction = () => {
    if (!isPageIntroductionCalled && localStorage.getItem("switchState") === "true") {
      console.log(localStorage.getItem("switchState"))
      const text = "This is a donation page, your donation is really valuable for us.";
      const value = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(value);
      isPageIntroductionCalled = true;
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <DonationForm />
    </Elements>
  );
};

export default App;
