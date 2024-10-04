import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateData } from "./crud";

export const notify = (message, obj) => {
  toast(message, obj);
};

export const updateGameStats = async (collection, id, data) => {
  try {
    await updateData(collection, id, data);
    console.log("document updated");
  } catch (error) {
    console.log("error");
  }
};

export const updateLastTen = (arr, val) => {
  let num = Number(val);
  if (!num && arr.length < 0) return;
  if (arr.length < 10) {
    arr.push(num);
    return arr;
  } else {
    arr.shift();
    arr.push(num);
    return arr;
  }
};

export const getAverage = (array) => {
  let total = 0;
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    total += element;
  }

  return total / array.length;
};

export const highScoreCalc = (num, highS) => {
  if (highS < num) {
    highS = num;
  }

  return highS;
};

export const noOfGames = (num) => {
  num++;
  return num++;
};
