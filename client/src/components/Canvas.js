import React from "react";
import Button from "./Button";
// useReducer
let isDrawing = false;
let lastXCoordinate = 0;
let lastYCoordinate = 0;
let drawing = [];
let xCoordinate = [];
let yCoordinate = [];
let timestamp = [];
let whatYouAreDrawing = "Draw something...";

const googleURL =
  // NOTE TO SELF THIS NEEDS TO BE A CALL TO THE BACKEND
  "https://inputtools.google.com/request?ime=handwriting&app=quickdraw&dbg=1&cs=1&oe=UTF-8";

const postDrawing = () => {
  fetch(googleURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      options: "enable_pre_space",
      requests: [
        {
          writing_guide: {
            writing_area_width: 400,
            writing_area_height: 400
          },
          ink: drawing,
          language: "quickdraw"
        }
      ]
    })
  })
    .then(res => res.json())
    .then(data => (whatYouAreDrawing = data[1][0][1][0]))
    .catch(err => console.error(err)); // eslint-disable-line no-console
};

const Canvas = () => {
  const [locations, setLocations] = React.useState([]);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // canvas size
    canvas.width = 320;
    canvas.height = 320;
    canvas.style.width = "320px";
    canvas.style.height = "320px";

    // canvas settings
    ctx.strokeStyle = "#fff";
    ctx.linecap = "round";
    ctx.lineWidth = 3;

    const draw = e => {
      if (!isDrawing) return;
      e.preventDefault();
      e.stopPropagation();

      if (e.x || e.y) {
        xCoordinate.push(e.x);
        yCoordinate.push(e.y);
        timestamp.push(e.timeStamp);

        ctx.beginPath();
        ctx.moveTo(lastXCoordinate, lastYCoordinate);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        lastXCoordinate = e.offsetX;
        lastYCoordinate = e.offsetY;
      } else {
        let touch = e.touches[0];
        let x = touch.pageX - touch.target.offsetLeft;
        let y = touch.pageY - touch.target.offsetTop;
        xCoordinate.push(x);
        yCoordinate.push(y);
        timestamp.push(e.timeStamp);

        ctx.beginPath();
        ctx.moveTo(lastXCoordinate, lastYCoordinate);
        ctx.lineTo(x, y);
        ctx.stroke();

        lastXCoordinate = x;
        lastYCoordinate = y;
      }
    };

    // eventlisteners: mouse
    canvas.addEventListener("mousedown", e => {
      isDrawing = true;
      lastXCoordinate = e.offsetX;
      lastYCoordinate = e.offsetY;
    });

    canvas.addEventListener("mousemove", draw);

    canvas.addEventListener("mouseup", () => {
      isDrawing = false;

      let xyCoordinates = [xCoordinate, yCoordinate, timestamp];
      drawing.push(xyCoordinates);

      postDrawing();

      xCoordinate = [];
      yCoordinate = [];
      timestamp = [];
      xyCoordinates = [];
    });

    canvas.addEventListener("mouseout", () => {
      isDrawing = false;
    });

    // eventlisteners: touch
    canvas.addEventListener("touchstart", e => {
      isDrawing = true;
      let touch = e.touches[0];
      lastXCoordinate = touch.pageX - touch.target.offsetLeft;
      lastYCoordinate = touch.pageY - touch.target.offsetTop;
    });

    canvas.addEventListener("touchmove", e => {
      draw(e);
    });

    canvas.addEventListener("touchend", () => {
      isDrawing = false;
    });
  }, []);

  const handleCanvasClick = e => {
    const newLocation = { x: e.clientX, y: e.clientY };
    setLocations([...locations, newLocation]);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    whatYouAreDrawing = "Draw something...";
    setLocations([]);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{ border: "1px solid rgba(255,255,255,0.2)" }}
      />
      <Button marginTop onClick={handleClear}>
        Clear
      </Button>
      <h2>
        {whatYouAreDrawing === "Draw something..." ? "" : "Zorb thinks it's a"}{" "}
        {whatYouAreDrawing}
      </h2>
    </>
  );
};

export default Canvas;