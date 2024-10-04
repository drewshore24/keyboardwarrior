import { readData } from "../utils/crud";
import React, { useEffect, useState } from "react";
import "../Pullwords.css";
import Userbox from "./Userbox";

const Pullwords = () => {
  const [wordsArr, setWordsArr] = useState([]);

  useEffect(() => {
    readData("Word Collection", "jYnD6JZ0voH88ozTLXCh").then((response) => {
      const arr = response.easy;
      setWordsArr(arr);
    });
  }, []);
  return (
    <div>
      <Userbox />
      <div className="text-box">
        {wordsArr.map((word, index) => {
          const cleanStr = word.replace(/[^a-zA-Z0-9 ]/g, "");
          return <p key={index}>{cleanStr}</p>;
        })}
      </div>
    </div>
  );
};

export default Pullwords;
