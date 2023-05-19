import React, { useEffect, useRef } from "react";

const RadialSoundwaves = ({ audioPath }) => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  let rafId = useRef(null);

  useEffect(() => {
    let audioContext;
    let analyser;
    let canvasCtx;

    const init = () => {
      // Create an audio context
      audioContext = new AudioContext();

      // Get the canvas element and its 2D rendering context
      canvasCtx = canvasRef.current.getContext("2d");

      // Create an audio analyzer
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;

      // Connect the audio source to the analyzer
      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      source.connect(audioContext.destination);

      // Start rendering the visualization
      draw();
    };

    const draw = () => {
      // Get the frequency data from the analyzer
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);

      // Clear the canvas
      canvasCtx.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      // Draw the radial soundwaves
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = "rgb(0, 0, 0)";
      canvasCtx.beginPath();

      const x = canvasRef.current.width / 2;
      const y = canvasRef.current.height / 2;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const angle = (i * 2 * Math.PI) / bufferLength;
        const radius = (v * canvasRef.current.height) / 2;

        const newX = x + Math.cos(angle) * radius;
        const newY = y + Math.sin(angle) * radius;

        if (i === 0) {
          canvasCtx.moveTo(newX, newY);
        } else {
          canvasCtx.lineTo(newX, newY);
        }
      }

      canvasCtx.closePath();
      canvasCtx.stroke();

      // Call the draw function again on the next animation frame
      rafId.current = requestAnimationFrame(draw);
    };

    // Start the visualization when the component mounts
    const audioElement = audioRef.current;
    audioElement.addEventListener("canplay", init, false);
    audioElement.muted = true; // Mute the audio
    audioElement.play();

    // Clean up on unmount
    return () => {
      cancelAnimationFrame(rafId.current);
    };
  }, [audioPath]);

  return (
    <>
      <canvas ref={canvasRef}></canvas>
      <audio ref={audioRef} src={audioPath}></audio>
    </>
  );
};

export default RadialSoundwaves;
