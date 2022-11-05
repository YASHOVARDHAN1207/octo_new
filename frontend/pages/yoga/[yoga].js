import { useRouter } from "next/router";
import React, {useState, useEffect, useRef} from "react";

const YogaPage = () => {
  const router = useRouter();
  const { yoga } = router.query;
  return <div>YogaPage</div>;
};

export default YogaPage;
