"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSketchCanvas } from 'react-sketch-canvas';

const Canvas = ({ canvasRef }) => {
  const currentColor = useSelector((state) => state.pen.color);
  const strokeWidth = useSelector((state) => state.pen.width);
  const eraserWidth = useSelector((state) => state.eraser.width);
  const bgColor = useSelector((state) => state.canvas.bgcolor);
  const EraserMode = useSelector((state) => state.eraser.eraserMode);
  const clearCanvas = useSelector((state) => state.undoRedo.clear);
  const undo = useSelector((state) => state.undoRedo.undo);
  const redo = useSelector((state) => state.undoRedo.redo);

  // Check if canvasRef is ready only on the client side
  useEffect(() => {
    if (canvasRef.current) {
      console.log("Canvas is Ready");
    }
  }, [canvasRef]);

  // Handle undo
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.undo();
    }
  }, [undo, canvasRef]);

  // Handle redo
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.redo();
    }
  }, [redo, canvasRef]);

  // Clear canvas
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
    }
  }, [clearCanvas, canvasRef]);

  // Toggle eraser mode
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.eraseMode(EraserMode); // Enable/disable erase mode
    }
  }, [EraserMode, canvasRef]);

  return (
    <div className="h-screen w-full">
      <ReactSketchCanvas
        ref={canvasRef}
        height="100%"
        strokeColor={currentColor}
        strokeWidth={strokeWidth}
        eraserWidth={eraserWidth}
        canvasColor={bgColor}
      />
    </div>
  );
};

export default Canvas;
