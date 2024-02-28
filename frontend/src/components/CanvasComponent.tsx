import React, { useState, useRef, useEffect ,ChangeEvent} from "react";

const CanvasDraw: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [prevPos, setPrevPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(2);
  const [backgroundColor ,setBackgroundColor] = useState("#ffffff")


  const colorChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setTextColor(e.target.value);
  
  };

  const fontsizeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setFontSize(parseInt(e.target.value));
   
  };

  useEffect(() => {
    console.log('canvasRef',canvasRef)
    const canvas = canvasRef.current;
    
    if(canvas){
      console.log('canvas ',canvas.offsetWidth)
      canvas.width = 600
      canvas.height = 400
      const ctx = canvas?.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineWidth = fontSize;
        ctx.fillStyle = backgroundColor
        ctx.strokeStyle = textColor
        ctx.fillRect(0, 0,600 ,400 );
      }
    }
   
  }, [fontSize,backgroundColor,textColor]);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const pos = getMouseOrTouchPosition(event);
    setPrevPos({ x: pos.x, y: pos.y });
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const currentPos = getMouseOrTouchPosition(event);

      ctx.beginPath();
      ctx.moveTo(prevPos.x, prevPos.y);
      ctx.lineTo(currentPos.x, currentPos.y);
      ctx.stroke();

      setPrevPos(currentPos);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas =() =>{
    const canvas = canvasRef.current;
    if(canvas){
      const ctx = canvas.getContext("2d");
      if(ctx){
        ctx.clearRect(0,0,600,400)
      }
    }
    
  }
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };


  const backgroundColorChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>{
    setBackgroundColor(e.target.value)
  }


  const getMouseOrTouchPosition = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): { x: number, y: number } => {
    let x = 0;
    let y = 0;
    if (event.type === "mousedown" || event.type === "mousemove" || event.type === "mouseup" || event.type === "mouseout") {
      x = (event as React.MouseEvent<HTMLCanvasElement>).nativeEvent.offsetX;
      y = (event as React.MouseEvent<HTMLCanvasElement>).nativeEvent.offsetY;
    } else if (event.type === "touchstart" || event.type === "touchmove" || event.type === "touchend") {
      x = (event as React.TouchEvent<HTMLCanvasElement>).touches[0].clientX - canvasRef.current!.getBoundingClientRect().left;
      y = (event as React.TouchEvent<HTMLCanvasElement>).touches[0].clientY - canvasRef.current!.getBoundingClientRect().top;
    }
    return { x, y };
  };

  return (


    <div className="flex justify-center items-center h-screen">
    <div>
      <div className="flex flex-row justify-around">
        <div className="flex flex-col mr-5">
          <p className="w-[144px]">Text color picker </p>
          <input type="color" className="w-40" onChange={colorChangeHandler} value={textColor} />
        </div>
        <div className="flex flex-col mr-5">
          <p className="w-[144px]">Background </p>
          <input type="color" className="w-40" onChange={backgroundColorChangeHandler} value={backgroundColor} />
        </div>
        <div className="flex flex-col mr-5">
          <p className="w-[144px]">Font Size </p>
          <input type="number" id="quantity" name="quantity" min="1" max="10" step="1" value={fontSize} className="border border-black w-30" onChange={fontsizeChangeHandler} />
        </div>
      </div>
      <div className="mt-4">
      <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
      className=" border border-black"
      
    />
      </div>
      <div className="flex flex-row mt-5 justify-around">
        <button className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-60" onClick={clearCanvas}>Clear</button>
        <button className="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900 w-60" onClick={handleDownload}> Save & download </button>

      </div>
    </div>
  </div>
   
  );
};

export default CanvasDraw;
