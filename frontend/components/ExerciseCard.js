import React, { useEffect, useState } from "react";
import bicepcurls from "../assets/img/bicepcurls.png";
import crunches from "../assets/img/crunches.png";
import pushups from "../assets/img/pushup.png";
import squats from "../assets/img/squats.png";
import yogaV from "../assets/img/virabhadrasana.png";
import yogaT from "../assets/img/trikonasana.png";

import { useRouter } from "next/router";

const ExerciseCard = ({ name, className, type }) => {
  const [image, setImage] = useState({
    src: "https://via.placeholder.com/150",
  });
  const [label, setLabel] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (name === "bicepCurls") {
      setImage(bicepcurls);
      setLabel("Bicep Curls");
    } else if (name === "crunches") {
      setImage(crunches);
      setLabel("Crunches");
    } else if (name === "pushups") {
      setImage(pushups);
      setLabel("Pushups");
    } else if (name === "squats") {
      setImage(squats);
      setLabel("Squats");
    } else if (name === "virabhadrasana") {
      setImage(yogaV);
      setLabel("Virabhadrasana");
    } else if (name === "trikonasana") {
      setImage(yogaT);
      setLabel("Trikonasana");
    }
  }, [name]);
  return (
    <div
      onClick={() => router.push(`/${type}/${name}`)}
      className={`p-4 rounded-xl transition duration-300 hover:cursor-pointer hover:-translate-y-2 flex flex-col items-center space-y-4 border border-gray-500 ${className}`}
    >
      <img src={image?.src} alt={name} className="rounded-md h-64 w-64 p-2" />
      <h3 className="text-3xl text-gray-50 text-center">{label}</h3>
    </div>
  );
};

export default ExerciseCard;
