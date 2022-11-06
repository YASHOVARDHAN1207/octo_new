import React from "react";
import { useRouter } from "next/router";
import { Pose } from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import { useRef, useEffect, useState } from "react";
import angleBetweenThreePoints from "./../../utils/angle";
import bicepcurls from "../../assets/img/bicepcurls.png";
import crunches from "../../assets/img/crunches.png";
import pushups from "../../assets/img/pushup.png";
import squats from "../../assets/img/squats.png";
import {toast} from 'react-hot-toast'

const styles = {
  webcam: {
    position: "absolute",
    marginRight: "auto",
    marginLeft: "auto",
    left: 0,
    right: 800,
    top: 200,
    textAlign: "center",
    zIndex: 9,
    width: 960,
    height: 720,
  },
  countBox: {
    position: "absolute",
    marginRight: "auto",
    marginLeft: "auto",
    left: 1100,
    right: 0,
    top: 600,
    width: 400,
    height: 100,
  },
  selectBox: {
    position: "absolute",
    marginRight: "auto",
    marginLeft: "auto",
    left: 1000,
    right: 0,
    top: 250,
    textAlign: "center",
    width: 400,
    color: "#05386B",
    background: "#8EE4AF",
  },
  back: {
    position: "absolute",
    marginRight: "auto",
    marginLeft: "auto",
    left: 1700,
    right: 0,
    top: 850,
  },
};

const exrInfo = {
  bicepCurls: {
    index: [12, 14, 16],
    ul: 160,
    ll: 50,
  },
  squats: {
    index: [24, 26, 28],
    ul: 170,
    ll: 50,
  },
  pushups: {
    index: [12, 14, 16],
    ul: 160,
    ll: 80,
  },
  crunches: {
    index: [12, 24, 26],
    ul: 130,
    ll: 50,
  },
};

let count = 0;
let dir = 0;
let angle = 0;

function ExercisePage() {
  const [label, setLabel] = useState("");
  const [targetCount, setTargetCount] = useState(0);
  const [showAlert, setShowAlert] = useState(true);
  const [imgSource, setImgSource] = useState({
    src: "https://via.placeholder.com/350",
  });
  const router = useRouter();
  const { exercise } = router.query;

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  let camera = null;
  const countTextbox = useRef(null);

  function onResult(results) {
    if (results.poseLandmarks) {
      const position = results.poseLandmarks;

      // set height and width of canvas
      canvasRef.current.width = webcamRef.current.video.videoWidth;
      canvasRef.current.height = webcamRef.current.video.videoHeight;

      const width = canvasRef.current.width;
      const height = canvasRef.current.height;

      //ratios between 0-1, covert them to pixel positions
      const upadatedPos = [];

      const indexArray = exrInfo[exercise].index;

      for (let i = 0; i < 3; i += 1) {
        upadatedPos.push({
          x: position[indexArray[i]].x * width,
          y: position[indexArray[i]].y * height,
        });
      }
      angle = Math.round(angleBetweenThreePoints(upadatedPos));

      // Count reps
      //0 is down, 1 is up
      if (angle > exrInfo[exercise].ul) {
        //console.log("test angle ",angle)
        if (dir === 0) {
          //count.current = count.current + 0.5
          // console.log(count, " ", dir, " decrement ", angle);
          dir = 1;
        }
      }
      if (angle < exrInfo[exercise].ll) {
        if (dir === 1) {
          count = count + 1;
          // console.log(count, " ", dir, " increment ", angle);
          dir = 0;
        }
      }

      //console.log(count.current)
      if (count >= targetCount && targetCount !== 0) {
        // setShowAlert(true);
        // alert("Yayy!! Target Count Achieved");
        toast.success("Yayy!! Target Count Achieved")
      }
      const canvasElement = canvasRef.current;
      const canvasCtx = canvasElement.getContext("2d");
      canvasCtx.save();

      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      //canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height)

      for (let i = 0; i < 2; i++) {
        canvasCtx.beginPath();
        canvasCtx.moveTo(upadatedPos[i].x, upadatedPos[i].y);
        canvasCtx.lineTo(upadatedPos[i + 1].x, upadatedPos[i + 1].y);
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = "white";
        canvasCtx.stroke();
      }
      for (let i = 0; i < 3; i++) {
        canvasCtx.beginPath();
        canvasCtx.arc(upadatedPos[i].x, upadatedPos[i].y, 10, 0, Math.PI * 2);
        canvasCtx.fillStyle = "#AAFF00";
        canvasCtx.fill();
      }
      canvasCtx.font = "40px aerial";
      canvasCtx.fillText(angle, upadatedPos[1].x + 10, upadatedPos[1].y + 40);
      canvasCtx.restore();
    }
  }

  useEffect(() => {
    if (exercise === "bicepCurls") {
      setLabel("Bicep Curls");
      setImgSource(bicepcurls);
    } else if (exercise === "squats") {
      setLabel("Squats");
      setImgSource(squats);
    } else if (exercise === "crunches") {
      setLabel("Crunches");
      setImgSource(crunches);
    } else if (exercise === "pushups") {
      setLabel("Pushups");
      setImgSource(pushups);
    }
  }, [exercise]);
  useEffect(() => {
    console.log("rendered");
    count = 0;
    dir = 0;
    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });
    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.5,
    });

    pose.onResults(onResult);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          countTextbox.current.value = count;
          await pose.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  });
  function resetCount() {
    count = 0;
    dir = 0;
  }

  return (
    <div className="flex items-start justify-around mt-10 mb-4">
      {/* "Yay!! Target Count Achieved" */}
      <div>
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginRight: "auto",
            marginLeft: "auto",
            right: 20,
            left: 600,
            top: 80,
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
            top: 80,
            textAlign: "center",
            zIndex: 9,
            width: 800,
            height: 600,
          }}
          // className="text-center  w-[800px] h-[720px] pb-32 absolute"
        />
      </div>
      <section className="flex flex-col mr-2 space-y-10 items-center text-white">
        <h3 className="text-3xl">{label}</h3>
        <img src={imgSource?.src} width={300} alt={exercise} />
        <div className="flex flex-col items-center space-y-4">
          <input
            variant="filled"
            ref={countTextbox}
            value={count}
            textAlign="center"
            readOnly
            className="text-white bg-transparent text-[40px] text-center focus:outline-none"
          />

          <button
            className="bg-red-400 p-3 rounded-xl transition hover:border hover:bg-transparent  hover:text-red-400 duration-200 hover:border-red-400"
            onClick={resetCount}
          >
            Reset Counter
          </button>
          <button
            className="flex items-center justify-center p-3 bg-[#e3ffa8] mt-3 rounded-xl transition duration-200 text-black hover:border hover:border-[#e3ffa8] hover:bg-transparent hover:text-[#e3ffa8]"
            type="button"
          >
            Save Progress
          </button>

          <div className="flex flex-row justify-center items-center">
            <input
              type={"number"}
              value={targetCount}
              placeholder="Target Count"
              className="text-white text-[30px] w-[50px] focus:outline-none bg-transparent"
              onChange={(e) => setTargetCount(parseInt(e.target.value))}
            />
            <button className="text-[#bdd76a] font-bold text-xl" type="button">
              Set Goal
            </button>
          </div>
        </div>
        <p className="italic text-white font-bold">
          Try to mimic and hold the following pose.
        </p>
      </section>
    </div>
  );
}

export default ExercisePage;
