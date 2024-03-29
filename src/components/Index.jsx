import { useEffect, useRef, useState } from "react";

const SIDES = ["right", "top", "left", "bottom"];
let sideIndex = 0;
let interval;

export default () => {
  const img = useRef(null);

  // If the browser thinks the image’s dimensions are 0, we make a guess.
  const imgWidth = () => img.current.getBoundingClientRect().width || 150;
  const imgHeight = () => img.current.getBoundingClientRect().height || 280;

  const random = (max) => Math.floor(Math.random() * max);
  const randomWidth = () => random(window.innerWidth - imgWidth());
  const randomHeight = () => random(window.innerHeight - imgHeight());

  const move = () => {
    img.current.style.transition = `all ${speedInterval}ms`;

    const side = SIDES[sideIndex];

    if (side === "bottom") {
      img.current.style.top = window.innerHeight - imgHeight() + "px";
      img.current.style.left = randomWidth() + "px";
    } else if (side === "right") {
      img.current.style.left = window.innerWidth - imgWidth() + "px";
      img.current.style.top = randomHeight() + "px";
    } else if (side === "top") {
      img.current.style.top = "0px";
      img.current.style.left = randomWidth() + "px";
    } else if (side === "left") {
      img.current.style.left = "0px";
      img.current.style.top = randomHeight() + "px";
    }

    sideIndex = (sideIndex + 1) % SIDES.length;
  };

  const [speed, setSpeed] = useState(30);
  let speedInterval = 2200 - speed * 20;

  useEffect(() => {
    clearInterval(interval);

    move();

    interval = setInterval(() => {
      move();
    }, speedInterval);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div className="h-screen">
      <img
        src="christian.jpg"
        className="h-[30vh] rounded absolute top-0 left-0"
        ref={img}
      />

      <div className="bg-white/20 [&:has(input:active)]:bg-white/25 transition-colors backdrop-blur-md fixed top-6 inset-x-0 mx-auto w-[calc(100vw-2rem)] max-w-[24rem] px-6 pb-3 pt-4 rounded-full">
        <div className="w-full">
          <input
            type="range"
            min="0"
            max="100"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <p
          className={`mt-1 font-bold text-center text-white ${
            speed < 50 ? "" : "italic"
          }`}
        >
          {speed < 50 ? "Slow" : "Fast"}-Mo Christian
        </p>
      </div>
    </div>
  );
};
