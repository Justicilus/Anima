import React from "react";
import ReactDOM from "react-dom/client";
import AnimaApp from "./App.jsx";
import Auth from "./Auth.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth>
      {(session, cikisYap) => <AnimaApp session={session} cikisYap={cikisYap} />}
    </Auth>
  </React.StrictMode>
);
