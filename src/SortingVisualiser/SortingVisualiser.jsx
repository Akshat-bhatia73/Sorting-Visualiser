import React, { useState, useEffect, useRef } from "react";
import { getBubbleSortAnimations } from "../Algorithms/BubbleSort";
import { getSelectionSortAnimations } from "../Algorithms/SelectionSort";

export default function SortingVisualiser() {
  const [arraySize, setArraySize] = useState(50);
  const [animationSpeed, setAnimationSpeed] = useState(1.1);
  const [array, setArray] = useState([]);
  const ref = useRef();

  useEffect(() => {
    const newArray = [];
    for (let i = 0; i < 50; i++) {
      newArray.push(randomIntFromInterval(10, 500));
    }
    setArray(newArray);
  }, []);

  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(randomIntFromInterval(10, 500));
    }
    setArray(newArray);
  };

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const bubbleSort = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    const animations = getBubbleSortAnimations(array, arraySize);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("arrayBar");
      const isColorChange = i % 3 !== 1;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? "turquoise" : "#a66cff";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * animationSpeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeightOne, barTwoIdx, newHeightTwo] =
            animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeightOne}px`;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barTwoStyle.height = `${newHeightTwo}px`;
        }, i * animationSpeed);
      }
    }
  };

  const selectionSort = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    const animations = getSelectionSortAnimations(array, arraySize);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("arrayBar");
      const isColorChange = i % 3 !== 1;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? "turquoise" : "#a66cff";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * animationSpeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeightOne, barTwoIdx, newHeightTwo] =
            animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeightOne}px`;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barTwoStyle.height = `${newHeightTwo}px`;
        }, i * animationSpeed);
      }
    }
  };

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
            <label htmlFor="Speedslider">Animation Speed</label>
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
              <span>High</span>
          </div>
        </div>

        <div className="buttons">
          <button className="ui button generate" onClick={resetArray}>
            Generate New Array
          </button>
          <button className="ui button" onClick={selectionSort}>
            Selection Sort
          </button>
          <button className="ui button" onClick={bubbleSort}>
            Bubble Sort
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
                width: `${arraySize > 50 ? 5 : arraySize > 25 ? 10 : 20}px`,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
