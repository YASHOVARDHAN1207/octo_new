import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { selectFunction } from "../../utils/compute";
import { Pose } from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import virabhadrasana from "../../assets/img/virabhadrasana.png";
import trikonasana from "../../assets/img/trikonasana.png";
import HealthStats from "../../components/HealthStats";
import RandomCounter from "../../components/counter";

const YogaPage = () => {
  const router = useRouter();
  const { yoga } = router.query;
  const [label, setLabel] = useState("");
  const [prog, setProg] = useState(null);
  const [imgSource, setImgSource] = useState({
    src: "https://via.placeholder.com/350",
  });

  const [time, setTime] = useState("0");
  const [targetTime, setTargetTime] = useState(0);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  let camera = null;

  var t = new Date().getTime();

  useEffect(() => {
    if (yoga === "virabhadrasana") {
      setImgSource(virabhadrasana);
    } else if (yoga === "trikonasana") {
      setImgSource(trikonasana);
    }
    fetchProgress();
    const lbl = yoga?.charAt(0).toUpperCase() + yoga?.slice(1);
    setLabel(lbl);
  }, [yoga]);

  useEffect(() => {
    // console.log(selectFunction(canvasRef, yoga));
    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });
    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    const onResult = selectFunction(
      canvasRef,
      webcamRef,
      yoga,
      t,
      setTime,
      targetTime
    );
    pose.onResults(onResult);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      try {
        camera = new cam.Camera(webcamRef.current.video, {
          onFrame: async () => {
            await pose.send({ image: webcamRef.current.video });
          },
          width: 640,
          height: 480,
        });
        camera.start();
      } catch (error) {
        console.log(error);
      }
    }
  }, [yoga]);

  async function saveProgress() {
    const newEntry = {
      yoga: yoga,
      time: parseInt(time),
      date: new Date().toLocaleString(),
      target: targetTime,
    };
  
    const existing = JSON.parse(sessionStorage.getItem("yoga_stats")) || [];
    existing.push(newEntry);
    sessionStorage.setItem("yoga_stats", JSON.stringify(existing));
  }

  async function fetchProgress() {
    const progress = JSON.parse(localStorage.getItem(yoga));
    console.log("progress is", progress);
    setProg(progress);
  }

  return (
    <div className="flex items-start justify-around mt-10 mb-4 bg-[#0a0a0b] overflow-y-hidden">
      <div>
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginRight: "auto",
            marginLeft: "auto",
            right: 20,
            left: 600,
            top: 50,
            textAlign: "center",
            zIndex: 9,
            width: 800,
            height: 600,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginRight: "auto",
            marginLeft: "auto",
            right: 0,
            left: 600,
            top: 50,
            textAlign: "center",
            zIndex: 9,
            width: 800,
            height: 600,
          }}
        />
      </div>
      <div></div>
      <section className="flex flex-col ml-4 space-y-6 items-center text-white">
        <h3 className="text-3xl">{label} </h3>

        {prog && <h2 className="text-2xl">All time best: {prog}</h2>}
        <div style={{ display: "flex" }}>
          <HealthStats></HealthStats>
        </div>
        <img src={imgSource?.src} width={300} alt={yoga} />
        {/* <p className="italic text-white font-bold">
          Try to mimic and hold the following pose.
        </p> */}
        <div className="flex items-center flex-col space-y-2 justify-center">
          <span className="text-gray-100 text-3xl">Posture Correct for</span>
          <br />
          <span className="text-gray-100 text-4xl">{time} seconds</span>
          <br /> 
          <div className="flex flex-row space-x-4 justify-center items-center">
            <div className="flex flex-row justify-center space-x-3 items-center">
              <input
                type={"number"}
                value={targetTime}
                placeholder="Target (in seconds)"
                className="text-white text-[30px] w-[50px] focus:outline-none bg-transparent"
                onChange={(e) => setTargetTime(parseInt(e.target.value))}
              />
              <button
                className="text-[#bdd76a] text-xl font-bold"
                type="button"
              >
                Set Goal
              </button>
            </div>
            <button
              className="flex items-center justify-center p-3 bg-[#e3ffa8] mt-3 rounded-xl transition duration-200 text-black hover:border hover:border-[#e3ffa8] hover:bg-transparent hover:text-[#e3ffa8]"
              type="button"
              onClick={saveProgress}
            >
              Save Progress
            </button>
          </div>
          <div></div>
        </div>
      </section>
    </div>
  );
};

export default YogaPage;
