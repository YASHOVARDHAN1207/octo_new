import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Script from "next/script";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col bg-[#0a0a0b]">
      {/* <div className="flex flex-row">
        <Navbar />
      </div> */}
      <div className="flex">
        <Sidebar />
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
