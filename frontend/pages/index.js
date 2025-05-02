import Head from "next/head";
import Image from "next/image";
import ExerciseCard from "../components/ExerciseCard";
import SelectForm from "../components/Form";
import HumanAvatar from "../components/Avatar";
import HealthStats from "../components/HealthStats";
import Chatbot from '../components/Chatbot';

export default function Home() {
  return (
    <div className="h-full bg-[#0a0a0b] w-full">
      <Head>
        <title>Octo</title>
        <meta name="description" content="Octo App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Welcome Text */}
      <div style={{ display: "flex", flexDirection: "column", paddingTop: "10%" }}>
        <div className="mr-auto ml-auto mt-auto mb-auto w-full">
          <h3 className="text-center text-[#e3ffa8] font-bold text-4xl">
            Welcome to Octo - A metaverse of Healthcare
          </h3>
        </div>

        {/* Form Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "5%",
            paddingLeft: "20%",
            width: "50%",
          }}
        >
          <SelectForm />
        </div>

        {/* Chatbot Section */}
        <div className="p-8">
          <Chatbot />
        </div>
      </div>
    </div>
  );
}
