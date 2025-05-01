import React, { useState } from "react";
import bicepcurls from "../assets/img/bicepcurls.png";
import crunches from "../assets/img/crunches.png";
import pushups from "../assets/img/pushup.png";
import squats from "../assets/img/squats.png";
import yogaV from "../assets/img/virabhadrasana.png";
import yogaT from "../assets/img/trikonasana.png";
import { useRouter } from "next/router";

const exerciseDetails = {
  bicepCurls: {
    image: bicepcurls,
    label: "Bicep Curls",
    videoUrl: "https://www.youtube.com/embed/sAq_ocpRh_I",
    description: `
      <div class="space-y-3 text-left text-sm text-gray-200">
        <div class="flex items-start gap-2">
          <span class="text-yellow-400">💪</span>
          <span><strong>Type:</strong> Strength training using <span class="text-yellow-400 font-semibold">dumbbells</span> or <span class="text-yellow-400 font-semibold">resistance bands</span>.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="text-green-400">✅</span>
          <span><strong>Good for:</strong> <span class="text-green-400 font-semibold">Beginners</span> to <span class="text-green-400 font-semibold">advanced lifters</span> aiming for <span class="underline decoration-yellow-500">toned arms</span>.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="text-red-400">⚠️</span>
          <span><strong>Avoid if:</strong> You have <span class="text-red-400 font-semibold">elbow</span>, <span class="text-red-400 font-semibold">wrist</span>, or <span class="text-red-400 font-semibold">shoulder injuries</span>.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="text-blue-400">🎯</span>
          <span><strong>Benefits:</strong> Boosts <span class="text-blue-400 font-semibold">muscle tone</span>, <span class="text-blue-400 font-semibold">arm strength</span>, and <span class="text-blue-400 font-semibold">grip power</span>.</span>
        </div>
      </div>
    `
  },
  crunches: {
    image: crunches,
    label: "Crunches",
    videoUrl: "https://www.youtube.com/embed/Xyd_fa5zoEU",
    description: `
      <div class="space-y-3 text-left text-sm text-gray-200">
        <div class="flex items-start gap-2">
          <span class="text-yellow-400">💥</span>
          <span><strong>Type:</strong> Core-focused movement targeting <span class="text-yellow-400 font-semibold">abdominal muscles</span>.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="text-green-400">✅</span>
          <span><strong>Good for:</strong> Strengthening your <span class="text-green-400 font-semibold">core</span> and improving <span class="text-green-400 font-semibold">posture</span>.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="text-red-400">⚠️</span>
          <span><strong>Avoid if:</strong> You have <span class="text-red-400 font-semibold">lower back</span> pain or <span class="text-red-400 font-semibold">neck strain</span>.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="text-blue-400">🎯</span>
          <span><strong>Benefits:</strong> Builds <span class="text-blue-400 font-semibold">core strength</span> and supports <span class="text-blue-400 font-semibold">spinal stability</span>.</span>
        </div>
      </div>
    `
  },
  pushups: {
    image: pushups,
    label: "Pushups",
    videoUrl: "https://www.youtube.com/embed/mECzqUIDWfU?si=yVdmvMDuuF93yNtg",
    description: `
      <div class="space-y-3 text-left text-sm text-gray-200">
        <div class="flex items-start gap-2">
          <span class="text-yellow-400">🧱</span>
          <span><strong>Type:</strong> Classic <span class="text-yellow-400 font-semibold">bodyweight exercise</span> working chest, arms, and core.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="text-green-400">✅</span>
          <span><strong>Good for:</strong> All levels — scalable with variations for <span class="text-green-400 font-semibold">strength and endurance</span>.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="text-red-400">⚠️</span>
          <span><strong>Avoid if:</strong> You have <span class="text-red-400 font-semibold">wrist</span>, <span class="text-red-400 font-semibold">shoulder</span>, or <span class="text-red-400 font-semibold">back injuries</span>.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="text-blue-400">🔥</span>
          <span><strong>Benefits:</strong> Enhances <span class="text-blue-400 font-semibold">upper body strength</span> and overall <span class="text-blue-400 font-semibold">fitness</span>.</span>
        </div>
      </div>
    `
  },
  squats: {
    image: squats,
    label: "Squats",
    videoUrl: "https://www.youtube.com/embed/xqvCmoLULNY?si=x13AjWfc4_abPir5",
    description: `
      <div class="space-y-3 text-left text-sm text-gray-200">
        <div class="flex items-start gap-2">
          <span class="text-yellow-400">🦵</span>
          <span><strong>Type:</strong> Compound lower-body movement engaging <span class="text-yellow-400 font-semibold">legs</span> and <span class="text-yellow-400 font-semibold">glutes</span>.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="text-green-400">✅</span>
          <span><strong>Good for:</strong> Developing <span class="text-green-400 font-semibold">functional strength</span> and <span class="text-green-400 font-semibold">mobility</span>.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="text-red-400">⚠️</span>
          <span><strong>Avoid if:</strong> You have <span class="text-red-400 font-semibold">knee</span>, <span class="text-red-400 font-semibold">hip</span>, or <span class="text-red-400 font-semibold">back injuries</span>.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="text-blue-400">🔥</span>
          <span><strong>Benefits:</strong> Enhances <span class="text-blue-400 font-semibold">balance</span>, <span class="text-blue-400 font-semibold">muscle mass</span>, and <span class="text-blue-400 font-semibold">fat burn</span>.</span>
        </div>
      </div>
    `
  },
  virabhadrasana: {
    image: yogaV,
    label: "Virabhadrasana",
    videoUrl: "https://www.youtube.com/embed/Mn6RSIRCV3w?si=BuOtrJLZmbr3AXWF",
    description: `
      <div class="space-y-3 text-left text-sm text-gray-200">
        <div class="flex items-start gap-2">
          <span class="text-yellow-400">🧘‍♀️</span>
          <span><strong>Type:</strong> Standing yoga pose focused on <span class="text-yellow-400 font-semibold">balance</span> and <span class="text-yellow-400 font-semibold">strength</span>.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="text-green-400">✅</span>
          <span><strong>Good for:</strong> Yoga practitioners building <span class="text-green-400 font-semibold">focus</span> and <span class="text-green-400 font-semibold">stability</span>.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="text-red-400">⚠️</span>
          <span><strong>Avoid if:</strong> You have <span class="text-red-400 font-semibold">knee</span>, <span class="text-red-400 font-semibold">hip</span>, or <span class="text-red-400 font-semibold">balance issues</span>.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="text-blue-400">🌀</span>
          <span><strong>Benefits:</strong> Builds <span class="text-blue-400 font-semibold">leg strength</span>, opens <span class="text-blue-400 font-semibold">hips</span>, sharpens <span class="text-blue-400 font-semibold">mental clarity</span>.</span>
        </div>
      </div>
    `
  },
  trikonasana: {
    image: yogaT,
    label: "Trikonasana",
    videoUrl: "https://www.youtube.com/embed/S6gB0QHbWFE?si=LX-mcvGUE-H6d1l4",
    description: `
      <div class="space-y-3 text-left text-sm text-gray-200">
        <div class="flex items-start gap-2">
          <span class="text-yellow-400">🌟</span>
          <span><strong>Type:</strong> Yoga pose that stretches <span class="text-yellow-400 font-semibold">spine</span>, <span class="text-yellow-400 font-semibold">hips</span>, and <span class="text-yellow-400 font-semibold">chest</span>.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="text-green-400">✅</span>
          <span><strong>Good for:</strong> Increasing <span class="text-green-400 font-semibold">flexibility</span> and <span class="text-green-400 font-semibold">core stability</span>.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="text-red-400">⚠️</span>
          <span><strong>Avoid if:</strong> You suffer from <span class="text-red-400 font-semibold">neck</span>, <span class="text-red-400 font-semibold">back</span>, or <span class="text-red-400 font-semibold">blood pressure issues</span>.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="text-blue-400">✨</span>
          <span><strong>Benefits:</strong> Enhances <span class="text-blue-400 font-semibold">digestion</span>, <span class="text-blue-400 font-semibold">spinal alignment</span>, and <span class="text-blue-400 font-semibold">balance</span>.</span>
        </div>
      </div>
    `
  }
};

const ExerciseCard = ({ name, className, type }) => {
  const [viewState, setViewState] = useState("base"); // "base", "description", "video"
  const router = useRouter();

  const { image, label, description, videoUrl } = exerciseDetails[name] || {};

  const handlePerformClick = () => {
    router.push(`/${type}/${name}`);
  };

  return (
    <div
      onClick={() => {
        if (viewState === "base") setViewState("description");
      }}
      className={`relative p-4 rounded-xl transition duration-300 hover:cursor-pointer hover:-translate-y-2 flex flex-col items-center justify-center border border-gray-500 ${className}`}
      style={{ height: "400px", width: "300px" }}
    >
      {viewState === "base" && (
        <>
          <img src={image?.src} alt={name} className="rounded-md h-64 w-64 p-2" />
          <h3 className="text-3xl text-gray-50 text-center">{label}</h3>
        </>
      )}

      {viewState !== "base" && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 p-6 rounded-xl flex flex-col items-center justify-between text-center space-y-4 overflow-hidden">
          <h3 className="text-3xl font-bold text-white">{label}</h3>

          {viewState === "description" && (
            <>
              <div
                className="text-gray-300 text-sm overflow-y-auto max-h-48"
                dangerouslySetInnerHTML={{ __html: description }}
              />
              <div className="flex gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewState("video");
                  }}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  See Tutorial
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewState("base");
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Back
                </button>
              </div>
            </>
          )}

          {viewState === "video" && (
            <>
              <div className="w-full h-48 mb-2">
                <iframe
                  width="100%"
                  height="100%"
                  src={videoUrl}
                  title={label}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePerformClick();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Perform
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewState("description");
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Back
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;
