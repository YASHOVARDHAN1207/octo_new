import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { selectFunction } from "../../utils/compute";
import { Pose } from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import virabhadrasana from "../../assets/img/virabhadrasana.png";
import trikonasana from "../../assets/img/trikonasana.png";

const YogaPage = () => {
  const router = useRouter();
  const { yoga } = router.query;
  const [label, setLabel] = useState("");
  const [imgSource, setImgSource] = useState({
    src: "https://via.placeholder.com/350",
  });

  const [time, setTime] = useState("0");
  const [feedback, setFeedback] = useState({ correct: null, text: "" });

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
      setFeedback
    );
    pose.onResults(onResult);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await pose.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, [yoga]);

  return (
    <div className="flex items-start justify-around mt-10">
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
          // className="text-center  w-[800px] h-[720px] pb-32 absolute"
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
          // className="text-center  w-[800px] h-[720px] pb-32 absolute"
        />
      </div>
      <section className="flex flex-col ml-4 space-y-6 items-center text-white">
        <h3 className="text-3xl">{label}</h3>
        <img src={imgSource?.src} width={300} alt={yoga} />
        <p className="italic text-white font-bold">
          Try to mimic and hold the following pose.
        </p>
        <div className="flex items-center flex-col space-y-2 justify-center">
          <span className="text-gray-100">
            Posture Correct for {time} seconds
          </span>
          <br />
          <span
            className={`${
              feedback.correct === null
                ? "text-amber-500"
                : feedback.correct
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {feedback.text}
          </span>
          <button
            className="flex items-center justify-center p-3 bg-[#e3ffa8] mt-3 rounded-xl transition duration-200 text-black hover:border hover:border-[#e3ffa8] hover:bg-transparent hover:text-[#e3ffa8]"
            type="button"
          >
            Save Progress
          </button>
        </div>
      </section>
    </div>
  );
};

export default YogaPage;
