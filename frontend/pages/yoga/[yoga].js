import { useRouter } from "next/router";
import React, {useState, useEffect, useRef} from "react";
import { selectFunction } from "../../utils/compute";

const YogaPage = () => {
  const router = useRouter();
  const { yoga } = router.query;

  const canvasRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    console.log(selectFunction(canvasRef, yoga))
  }, [yoga])
  
  return <div>YogaPage</div>;
};

export default YogaPage;
