import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { selectFunction } from "../../utils/compute";
// import React from "react";
import { Pose } from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
// import { useRef, useEffect } from "react";
import yoga1 from "../../assets/img/yogapose.png";
// import { Link } from "react-router-dom";
// import { Button } from "@material-ui/core";

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
  info: {
    position: "absolute",
    margin: "auto",
    left: 1150,
    right: 200,
    top: 270,
    color: "#05386B",
    background: "#8EE4AF",
    textAlign: "center",
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

const YogaPage = () => {
  const router = useRouter();
  const { yoga } = router.query;

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  let camera = null;

  var t = new Date().getTime();

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

    const onResult = selectFunction(canvasRef, webcamRef, yoga, t);
    console.log("test here");
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
    <div>
      <div>
        <Webcam ref={webcamRef} style={styles.webcam} />
        <canvas ref={canvasRef} style={styles.webcam} />
      </div>
      <div style={styles.info}>
        <p>Try to mimic and hold the following pose.</p>
        <img src={yoga1} alternate="Yoga 1"></img>
      </div>
    </div>
  );
};

export default YogaPage;
