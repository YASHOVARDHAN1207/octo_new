const selectFunction = (canvasRef, value) => {
  const virabhadrasanaResult  = (res) => {
    console.log("Virabhadrasana Result");
  }

  const trikonasanaResult = (res) => {
    console.log("Trikonasana Result");
  }

  console.log(value)
  if (value === "virabhadrasana") {
    return virabhadrasanaResult
  } else {
    return trikonasanaResult;
  }
};

export {selectFunction}
