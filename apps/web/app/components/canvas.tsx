"use client";
import { useRef, useEffect, useState } from "react";
import Toolbar from "./toolbar";
import {
  handleMouseDown,
  handleMouseLeave,
  handleMouseMove,
  handleMouseUp,
  handleWheel,
} from "../utils/canvasFun";

const InfiniteCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  type Item = { type: "rectangle" | "circle"; x: number; y: number };
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.log("Ctx is null");
      return;
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const draw = () => {
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(translateX, translateY);
      ctx.scale(scale, scale);

      // Example drawing: An infinite grid
      const gridSize = 50;
      const width = canvas.width;
      const height = canvas.height;

      // Calculate the top-left corner of the grid to start drawing
      const startX = Math.floor(-translateX / scale / gridSize) * gridSize;
      const startY = Math.floor(-translateY / scale / gridSize) * gridSize;

      for (
        let x = startX;
        x < width / scale - translateX / scale;
        x += gridSize
      ) {
        for (
          let y = startY;
          y < height / scale - translateY / scale;
          y += gridSize
        ) {
          ctx.strokeRect(x, y, gridSize, gridSize);
        }
      }

      // Draw added items
      items.forEach((item) => {
        if (item.type === "rectangle") {
          ctx.strokeStyle = "blue";
          ctx.strokeRect(item.x, item.y, 100, 50);
        } else if (item.type === "circle") {
          ctx.fillStyle = "red";
          ctx.beginPath();
          ctx.arc(item.x, item.y, 50, 0, 2 * Math.PI);
          ctx.fill();
        }
      });

      ctx.restore();
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [scale, translateX, translateY, items]);

  const addItem = (type: "rectangle" | "circle") => {
    if (!canvasRef.current) return;
    const newItem = {
      type,
      x: (canvasRef.current.width / 2 - translateX) / scale,
      y: (canvasRef.current.height / 2 - translateY) / scale,
    };
    setItems([...items, newItem]);
  };

  return (
    <div>
      <div className="text-center text-white font-bold text-md  fixed bottom-0  left-4  z-10 bg-white-100 p-2 rounded shadow">
        Zoom: {(scale * 100).toFixed(0)}%
      </div>
      <Toolbar addItem={addItem} />
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <canvas
          ref={canvasRef}
          onWheel={(event) =>
            handleWheel(
              event,
              canvasRef.current,
              setTranslateX,
              setTranslateY,
              translateX,
              translateY,
              scale,
              setScale
            )
          }
          onMouseDown={(event) =>
            handleMouseDown(
              event,
              setIsPanning,
              setStartX,
              setStartY,
              translateX,
              translateY
            )
          }
          onMouseMove={(event) =>
            handleMouseMove(
              event,
              isPanning,
              startX,
              startY,
              setTranslateX,
              setTranslateY
            )
          }
          onMouseUp={() => handleMouseUp(setIsPanning)}
          onMouseLeave={() => handleMouseLeave(setIsPanning)}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </div>
    </div>
  );
};

export default InfiniteCanvas;
