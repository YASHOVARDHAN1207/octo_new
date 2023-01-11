import React, { useState } from "react";
import { useRouter } from "next/router";

const SelectForm = () => {
  const router = useRouter();

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Selected values: ${value1}, ${value2}`);
  };
  async function takeToExercise() {
    console.log("Redirecting");
    console.log(`Selected values: ${value1}, ${value2}`);
    router.push("/yoga/virabhadrasana");
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="my-8">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="value1"
          >
            Select what type of workout you are looking for
          </label>
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="value1"
            value={value1}
            onChange={(e) => {
              console.log("testing value 1", e.target.value);
              setValue1(e.target.value);
            }}
          >
            <option>Stretching and Yoga Based</option>
            <option>Strength and Rep Based</option>
            {/* <option>Option 3</option> */}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="value2"
          >
            Select which body part are you targeting
          </label>
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="value2"
            value={value2}
            onChange={(e) => {
              console.log("testing value 2", e.target.value);
              setValue2(e.target.value);
            }}
          >
            <option>Back</option>
            <option>Legs</option>
            <option>Biceps</option>
            <option>Full Body</option>
          </select>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={takeToExercise}
        >
          Recommend session
        </button>
      </form>
    </>
  );
};

export default SelectForm;
