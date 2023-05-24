import React, { useState, useEffect, useRef } from "react";

//Importing animations
import { getBubbleSortAnimations } from "../Algorithms/BubbleSort";
import { getSelectionSortAnimations } from "../Algorithms/SelectionSort";
import { getQuickSortAnimations } from "../Algorithms/QuickSort";

//Default Values
const DEFAULT_ARRAY_SIZE = 50;
const DEFAULT_ANIMATION_SPEED = 80;
const ARRAY_MIN_VALUE = 10;
const ARRAY_MAX_VALUE = 500;

const SortingVisualiser = () => {
  const [arraySize, setArraySize] = useState(DEFAULT_ARRAY_SIZE);
  const [animationSpeed, setAnimationSpeed] = useState(DEFAULT_ANIMATION_SPEED);
  const [array, setArray] = useState([]);
  const ref = useRef();

  useEffect(() => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(randomIntFromInterval(ARRAY_MIN_VALUE, ARRAY_MAX_VALUE));
    }
    setArray(newArray);
  }, [arraySize]);

  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(randomIntFromInterval(ARRAY_MIN_VALUE, ARRAY_MAX_VALUE));
    }
    setArray(newArray);
  };

  //Function to give random values between a specified range
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  //Function to do the animations
  const animateSorting = (animations) => {
    const arrayBars = document.getElementsByClassName("arrayBar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 1;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? "turquoise" : "#a66cff";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * (101 - animationSpeed));
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeightOne, barTwoIdx, newHeightTwo] =
            animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeightOne}px`;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barTwoStyle.height = `${newHeightTwo}px`;
        }, i * (101 - animationSpeed));
      }
    }
  }

  const bubbleSort = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    const animations = getBubbleSortAnimations(array, arraySize);
    animateSorting(animations)
  };

  const selectionSort = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    const animations = getSelectionSortAnimations(array, arraySize);
    animateSorting(animations)
  };
  
  const quickSort = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    const animations = getQuickSortAnimations(array, arraySize);
    animateSorting(animations)
  };

  const barWidth = arraySize > 50 ? 8 : arraySize > 25 ? 12 : 24;

  return (
    <div className="sorting">
      <div className="navbar">
        <div className="sliderContainer">
          <div className="size">
            <label htmlFor="slider">Size of Array</label>
            <input
              type="range"
              id="slider"
              className="slider"
              min={10}
              max={100}
              value={arraySize}
              onChange={(e) => {
                setArraySize(e.target.value);
              }}
            />
          </div>
          <div className="speed">
            <label htmlFor="Speedslider">Sorting Speed</label>
            <input
              type="range"
              id="Speedslider"
              className="slider"
              min={1}
              max={100}
              value={animationSpeed}
              onChange={(e) => {
                setAnimationSpeed(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="buttons">
          <button className="ui button generate" onClick={resetArray}>
            Generate New Array
          </button>
          <button className="ui button" onClick={bubbleSort}>
            Bubble Sort
          </button>
          <button className="ui button" onClick={selectionSort}>
            Selection Sort
          </button>
          <button className="ui button" onClick={quickSort}>
            Quick Sort
          </button>
        </div>
      </div>

      <div className="main" ref={ref}>
        {array.map((value, index) => {
          return (
            <div
              className="arrayBar"
              key={index}
              style={{
                height: `${value}px`,
                width: `${barWidth}px`,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default SortingVisualiser