import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Script from "next/script";
import "../styles/globals.css";
// import { Amplify, Auth } from "aws-amplify";

// import { withAuthenticator } from "@aws-amplify/ui-react";
// import { AmplifyAuthenticator } from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";

import { Amplify } from "aws-amplify";
import { Auth } from "aws-amplify";
import { AmplifyProvider } from "@aws-amplify/ui-react";
import { Authenticator } from "@aws-amplify/ui-react";

Amplify.configure({
  Auth: {
    region: process.env.NEXT_PUBLIC_REGION,

    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,

    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID,

    mandatorySignIn: process.env.NEXT_PUBLIC_MANDATORY_SIGN_IN,

    signUpVerificationMethod:
      process.env.NEXT_PUBLIC_SIGNUP_VERIFICATION_METHOD,
  },
  ssr: true,
});

// You can get the current config object
const currentConfig = Auth.configure();

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Authenticator>
        {({ signOut, user }) => (
          <div className="flex flex-col bg-[#0a0a0b]">
            <div className="flex">
              <Sidebar signOut={signOut} />
              {console.log("this is user", user)}
              <Component {...pageProps} />
            </div>
          </div>
        )}
      </Authenticator>
    </div>
  );
}

export default MyApp;
