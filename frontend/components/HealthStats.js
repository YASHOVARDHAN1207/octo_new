import React from "react";
import RandomCounter from "./counter";

function HealthStats({ heartRate, bloodPressure }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-64 h-30 flex flex-col items-center justify-between">
      {/* <div className="text-xl font-bold text-gray-900">Health Stats</div> */}
      <div className="my-4 flex flex-row items-center">
        <div className="text-lg font-bold text-gray-700 mr-4">Heart Rate:</div>
        <div className="text-lg font-bold text-blue-600">
          {/* {heartRate} */}
          <RandomCounter min={80} max={85} interval={700}></RandomCounter> bpm
        </div>
      </div>

      <div className="my-4 flex flex-row items-center">
        <div className="text-lg font-bold text-gray-700 mr-4">Blood Pres:</div>
        <div className=" font-bold text-blue-600" style={{ display: "flex" }}>
          {/* {bloodPressure} */}
          <RandomCounter min={115} max={120} interval={900}></RandomCounter>/
          <RandomCounter min={75} max={80} interval={1500}></RandomCounter>
        </div>
      </div>

      <div className="my-4 flex flex-row items-center">
        <div className="text-lg font-bold text-gray-700 mr-4">
          Calories Burnt
        </div>
        <div className="text-lg font-bold text-blue-600">{bloodPressure} 0</div>
      </div>
    </div>
  );
}

export default HealthStats;
