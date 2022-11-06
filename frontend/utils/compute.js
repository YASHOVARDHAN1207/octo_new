import angleBetweenThreePoints from "./../utils/angle";

const selectFunction = (
  canvasRef,
  webcamRef,
  value,
  t,
  setTime,
  targetTime
) => {
  const virabhadrasanaResult = (results) => {
    console.log("Virabhadrasana Result");
    if (results.poseLandmarks) {
      const position = results.poseLandmarks;
      canvasRef.current.width = webcamRef.current.video.videoWidth;
      canvasRef.current.height = webcamRef.current.video.videoHeight;

      const width = canvasRef.current.width;
      const height = canvasRef.current.height;

      const leftHand = [];
      const rightHand = [];
      const leftLeg = [];
      const rightLeg = [];

      //index 11,13,15 left hand, angle range 165,185
      //index 12,14,16 right hand, angle range 175,195
      //index 23,25,27 left leg, angle range 245,265
      //index 24,26,28 right leg, angle range 175,200
      for (let i = 11; i < 17; i++) {
        let obj = {};
        obj["x"] = position[i].x * width;
        obj["y"] = position[i].y * height;
        if (i % 2 === 0) {
          rightHand.push(obj);
        } else {
          leftHand.push(obj);
        }
      }
      for (let i = 23; i < 29; i++) {
        let obj = {};
        obj["x"] = position[i].x * width;
        obj["y"] = position[i].y * height;
        if (i % 2 === 0) {
          rightLeg.push(obj);
        } else {
          leftLeg.push(obj);
        }
      }
      const leftHandAngle = Math.round(angleBetweenThreePoints(leftHand));
      const rightHandAngle = Math.round(angleBetweenThreePoints(rightHand));
      const leftLegAngle = Math.round(angleBetweenThreePoints(leftLeg));
      const rightLegAngle = Math.round(angleBetweenThreePoints(rightLeg));

      const canvasElement = canvasRef.current;
      const canvasCtx = canvasElement.getContext("2d");
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      //canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height)

      let inRangeRightHand;
      if (rightHandAngle >= 170 && rightHandAngle <= 190) {
        inRangeRightHand = true;
        setFeedback({ correct: true, text: "Good Going" });
      } else {
        inRangeRightHand = false;
        console.log(rightHandAngle - 190);
      }

      let inRangeLeftHand;
      if (leftHandAngle >= 170 && leftHandAngle <= 190) {
        inRangeLeftHand = true;
        setFeedback({ correct: true, text: "Good Going" });
      } else {
        inRangeLeftHand = false;
        console.log(leftHandAngle - 190);
      }

      let inRangeRightLeg;
      if (rightLegAngle >= 170 && rightLegAngle <= 190) {
        inRangeRightLeg = true;
        setFeedback({ correct: true, text: "Good Going" });
      } else {
        inRangeRightLeg = false;
        console.log(rightLegAngle - 190);
      }

      let inRangeLeftLeg;
      if (leftLegAngle >= 110 && leftLegAngle <= 130) {
        inRangeLeftLeg = true;
        setFeedback({ correct: true, text: "Good Going" });
      } else {
        inRangeLeftLeg = false;
        console.log(leftLegAngle - 130);
      }

      for (let i = 0; i < 2; i++) {
        canvasCtx.beginPath();
        canvasCtx.lineWidth = 8;

        //right hand
        canvasCtx.moveTo(rightHand[i].x, rightHand[i].y);
        canvasCtx.lineTo(rightHand[i + 1].x, rightHand[i + 1].y);
        if (inRangeRightHand) {
          canvasCtx.strokeStyle = "green";
        } else {
          canvasCtx.strokeStyle = "red";
        }
        canvasCtx.stroke();

        //lefthand
        canvasCtx.beginPath();
        canvasCtx.moveTo(leftHand[i].x, leftHand[i].y);
        canvasCtx.lineTo(leftHand[i + 1].x, leftHand[i + 1].y);
        if (inRangeLeftHand) {
          canvasCtx.strokeStyle = "green";
        } else {
          canvasCtx.strokeStyle = "red";
        }
        canvasCtx.stroke();

        //right leg
        canvasCtx.beginPath();
        canvasCtx.moveTo(rightLeg[i].x, rightLeg[i].y);
        canvasCtx.lineTo(rightLeg[i + 1].x, rightLeg[i + 1].y);
        if (inRangeRightLeg) {
          canvasCtx.strokeStyle = "green";
        } else {
          canvasCtx.strokeStyle = "red";
        }
        canvasCtx.stroke();

        //left leg
        canvasCtx.beginPath();
        canvasCtx.moveTo(leftLeg[i].x, leftLeg[i].y);
        canvasCtx.lineTo(leftLeg[i + 1].x, leftLeg[i + 1].y);
        if (inRangeLeftLeg) {
          canvasCtx.strokeStyle = "green";
        } else {
          canvasCtx.strokeStyle = "red";
        }
        canvasCtx.stroke();
      }
      for (let i = 0; i < 3; i++) {
        canvasCtx.beginPath();
        //right hand
        canvasCtx.arc(rightHand[i].x, rightHand[i].y, 8, 0, Math.PI * 2);
        //left hand
        canvasCtx.arc(leftHand[i].x, leftHand[i].y, 8, 0, Math.PI * 2);

        canvasCtx.fillStyle = "#AAFF00";
        canvasCtx.fill();

        canvasCtx.beginPath();
        //right leg
        canvasCtx.arc(rightLeg[i].x, rightLeg[i].y, 8, 0, Math.PI * 2);
        //left leg
        canvasCtx.arc(leftLeg[i].x, leftLeg[i].y, 8, 0, Math.PI * 2);

        canvasCtx.fillStyle = "#AAFF00";
        canvasCtx.fill();
      }

      if (
        !(
          inRangeRightLeg &&
          inRangeLeftLeg &&
          inRangeLeftHand &&
          inRangeRightHand
        )
      ) {
        t = new Date().getTime();
      }

      canvasCtx.font = "30px aerial";
      canvasCtx.fillText(leftHandAngle, leftHand[1].x + 20, leftHand[1].y + 20);
      canvasCtx.fillText(
        rightHandAngle,
        rightHand[1].x - 120,
        rightHand[1].y + 20
      );
      canvasCtx.fillText(leftLegAngle, leftLeg[1].x + 20, leftLeg[1].y + 20);
      canvasCtx.fillText(
        rightLegAngle,
        rightLeg[1].x - 120,
        rightLeg[1].y + 20
      );

      // canvasCtx.fillStyle = "black";
      // canvasCtx.font = "30px aerial";
      // canvasCtx.fillText(
      //   "Seconds holded: ".concat(
      //     String(Math.round((new Date().getTime() - t) / 1000))
      //   ),
      //   10,
      //   40
      // );

      const time = ((new Date().getTime() - t) / 1000).toFixed(2);
      setTime(time.toString());
      if (time >= targetTime && targetTime !== 0) {
        toast.success("Yayy!! Target Count Achieved");
        setTime("0");
        time = 0;
      }

      canvasCtx.restore();
    }
  };

  const trikonasanaResult = (results) => {
    console.log("Trikonasana Result");
    if (results.poseLandmarks) {
      const position = results.poseLandmarks;
      canvasRef.current.width = webcamRef.current.video.videoWidth;
      canvasRef.current.height = webcamRef.current.video.videoHeight;

      const width = canvasRef.current.width;
      const height = canvasRef.current.height;

      // index 12,14,16 11,13,15, range 125,145
      const leftHand = [];
      const rightHand = [];
      for (let i = 11; i < 17; i++) {
        let obj = {};
        obj["x"] = position[i].x * width;
        obj["y"] = position[i].y * height;
        if (i % 2 === 0) {
          rightHand.push(obj);
        } else {
          leftHand.push(obj);
        }
      }

      // index 12,24,26, range 125,145
      const back = [];
      const indexBack = [12, 24, 26];
      for (let i = 0; i < 3; i++) {
        let obj = {};
        obj["x"] = position[indexBack[i]].x * width;
        obj["y"] = position[indexBack[i]].y * height;
        back.push(obj);
      }

      const angleBack = Math.round(angleBetweenThreePoints(back));
      const angleLeftHand = Math.round(angleBetweenThreePoints(leftHand));
      const angleRightHand = Math.round(angleBetweenThreePoints(rightHand));

      let inRangeBack;
      let inRangeLeftHand;
      let inRangeRightHand;
      if (angleBack >= 120 && angleBack <= 140) {
        inRangeBack = true;
      } else {
        inRangeBack = false;
      }
      if (angleLeftHand >= 165 && angleLeftHand <= 195) {
        inRangeLeftHand = true;
      } else {
        inRangeLeftHand = false;
      }
      if (angleRightHand >= 165 && angleRightHand <= 195) {
        inRangeRightHand = true;
      } else {
        inRangeRightHand = false;
      }

      const canvasElement = canvasRef.current;
      const canvasCtx = canvasElement.getContext("2d");
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      //canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height)

      for (let i = 0; i < 2; i++) {
        canvasCtx.beginPath();
        canvasCtx.lineWidth = 8;

        canvasCtx.moveTo(back[i].x, back[i].y);
        canvasCtx.lineTo(back[i + 1].x, back[i + 1].y);
        if (inRangeBack) {
          canvasCtx.strokeStyle = "green";
        } else {
          canvasCtx.strokeStyle = "red";
        }
        canvasCtx.stroke();

        canvasCtx.beginPath();
        canvasCtx.moveTo(leftHand[i].x, leftHand[i].y);
        canvasCtx.lineTo(leftHand[i + 1].x, leftHand[i + 1].y);
        if (inRangeLeftHand) {
          canvasCtx.strokeStyle = "green";
        } else {
          canvasCtx.strokeStyle = "red";
        }
        canvasCtx.stroke();

        canvasCtx.beginPath();
        canvasCtx.moveTo(rightHand[i].x, rightHand[i].y);
        canvasCtx.lineTo(rightHand[i + 1].x, rightHand[i + 1].y);
        if (inRangeRightHand) {
          canvasCtx.strokeStyle = "green";
        } else {
          canvasCtx.strokeStyle = "red";
        }
        canvasCtx.stroke();
      }

      for (let i = 0; i < 3; i++) {
        canvasCtx.beginPath();
        //right hand
        canvasCtx.arc(rightHand[i].x, rightHand[i].y, 8, 0, Math.PI * 2);
        //left hand
        canvasCtx.arc(leftHand[i].x, leftHand[i].y, 8, 0, Math.PI * 2);
        canvasCtx.fillStyle = "#AAFF00";
        canvasCtx.fill();

        canvasCtx.beginPath();
        canvasCtx.arc(back[i].x, back[i].y, 8, 0, Math.PI * 2);
        canvasCtx.fillStyle = "#AAFF00";
        canvasCtx.fill();
      }

      if (!(inRangeBack && inRangeLeftHand && inRangeRightHand)) {
        t = new Date().getTime();
      }

      canvasCtx.fillStyle = "green";
      canvasCtx.font = "30px aerial";
      canvasCtx.fillText(angleLeftHand, leftHand[1].x + 20, leftHand[1].y + 20);
      canvasCtx.fillText(
        angleRightHand,
        rightHand[1].x - 120,
        rightHand[1].y + 20
      );
      canvasCtx.fillText(angleBack, back[1].x, back[1].y + 40);

      // canvasCtx.font = "30px aerial";
      // canvasCtx.fillText(
      //   "Seconds holded: ".concat(
      //     String(Math.round((new Date().getTime() - t) / 1000))
      //   ),
      //   10,
      //   40
      // );

      const time = ((new Date().getTime() - t) / 1000).toFixed(2);
      setTime(time.toString());
      if (time >= targetTime && targetTime !== 0) {
        toast.success("Yayy!! Target Count Achieved");
        setTime("");
        time = 0;
      }

      canvasCtx.restore();
    }
  };

  // console.log(value);
  if (value === "virabhadrasana") {
    return virabhadrasanaResult;
  } else {
    return trikonasanaResult;
  }
};

export { selectFunction };
