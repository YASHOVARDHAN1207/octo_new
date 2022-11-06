import Head from "next/head";
import Image from "next/image";
import ExerciseCard from "../components/ExerciseCard";

export default function Home() {
  return (
    <div className="h-full bg-[#0a0a0b]">
      <Head>
        <title>Octo</title>
        <meta name="description" content="Octo App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-full mt-10 ml-10 mb-10 scrollbar-hide">
        <div className="flex flex-col space-y-24">
          {/* Continue Your Exercise */}
          <div className="flex items-center justify-around">
            {/* Yoga section */}
            <section className="flex flex-col space-y-10">
              <h3 className="text-gray-50 text-4xl text-center font-bold">
                Continue Last Yoga
              </h3>
              <div className="flex items-center justify-center flex-row my-8 space-x-4">
                <ExerciseCard type="yoga" name={"virabhadrasana"} />
              </div>
            </section>
            {/* divider */}
            <div className="w-[1px] h-64 border border-gray-400"></div>
            {/* Exercise Section */}
            <section className="flex flex-col space-y-10">
              <h3 className="text-gray-50 text-4xl text-center font-bold">
                Continue Last Exercise
              </h3>
              <div className="flex items-center justify-center flex-row my-8 space-x-4">
                <ExerciseCard type="exercise" name={"squats"} />
              </div>
            </section>
          </div>
          {/* Start a New Exercise */}
          <section className="flex flex-col space-y-10">
            <h3 className="text-gray-50 text-center text-4xl font-bold">
              Start a New Exercise
            </h3>
            <div className="flex flex-col items-center justify-center my-8 space-y-4">
              <div className="flex items-center my-8 space-x-4">
                <ExerciseCard type="yoga" name={"virabhadrasana"} />
                <ExerciseCard type="yoga" name={"trikonasana"} />
                <ExerciseCard type="exercise" name={"squats"} />
                <ExerciseCard type="exercise" name={"bicepCurls"} />
              </div>
              <div className="flex items-center my-8 space-x-4">
                <ExerciseCard type="exercise" name={"pushups"} />
                <ExerciseCard type="exercise" name={"squats"} />
                <ExerciseCard type="exercise" name={"crunches"} />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
