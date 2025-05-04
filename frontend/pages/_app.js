// pages/_app.js

import "../styles/globals.css"; // ✅ Global styles only
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { Auth } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import LandingPage from "../components/LandingPage";
import { Toaster } from "react-hot-toast";

// ❌ DON'T import Chatbot.css here anymore

// ✅ Import your Chatbot component (CSS module is now inside it)
import Chatbot from '../components/Chatbot';

Amplify.configure({
  Auth: {
    region: process.env.NEXT_PUBLIC_REGION,
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID,
    mandatorySignIn: process.env.NEXT_PUBLIC_MANDATORY_SIGN_IN,
    signUpVerificationMethod: process.env.NEXT_PUBLIC_SIGNUP_VERIFICATION_METHOD,
  },
  ssr: true,
});

const currentConfig = Auth.configure();

function MyApp({ Component, pageProps }) {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    // Optional login logic
  }, []);

  return (
    <div className={`${!login && "h-screen"} bg-[#0a0a0b]`}>
      <div className="h-full flex flex-col bg-[#0a0a0b]">
        <div className="flex">
          <Sidebar />
          <Toaster />
          <Component {...pageProps} />
        </div>
      </div>

      {/* Example static chatbot */}
      <Chatbot />

      {/* Uncomment this block to use Amplify authentication */}
      {/*
      {login ? (
        <div>
          <Authenticator>
            {({ signOut, user }) => (
              <div className="h-full flex flex-col bg-[#0a0a0b]">
                <div className="flex">
                  <Sidebar signOut={signOut} />
                  <Toaster />
                  <Component {...pageProps} />
                </div>
              </div>
            )}
          </Authenticator>
        </div>
      ) : (
        <LandingPage setLogin={setLogin} />
      )}
      */}
    </div>
  );
}

export default MyApp;
