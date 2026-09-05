import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlennaApp from "./App.jsx";
import Auth from "./Auth.jsx";
import Onboarding, { onboardingGorulduMu } from "./Onboarding.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";
import TermsOfService from "./TermsOfService.jsx";
import NotFound from "./NotFound.jsx";
import "./index.css";

function KokEkran() {
  const [gosterOnboarding, setGosterOnboarding] = useState(!onboardingGorulduMu());

  if (gosterOnboarding) {
    return <Onboarding onBitir={() => setGosterOnboarding(false)} />;
  }

  return (
    <Auth>
      {(session, cikisYap) => <GlennaApp session={session} cikisYap={cikisYap} />}
    </Auth>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<KokEkran />} />
        <Route path="/gizlilik" element={<PrivacyPolicy />} />
        <Route path="/kullanim-sartlari" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
