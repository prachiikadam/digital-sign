import React, { useState, useRef, useEffect ,ChangeEvent} from "react";

const CanvasDraw: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [prevPos, setPrevPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(5);


  const colorChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setTextColor(e.target.value);
    const canvas = canvasRef.current; 
    if(canvas){
      const ctx = canvas.getContext("2d");
      if(ctx){
        ctx.strokeStyle = e.target.value
      } 
    }
  };

  const fontsizeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setFontSize(parseInt(e.target.value));
    const canvas = canvasRef.current; 
    if(canvas){
      const ctx = canvas.getContext("2d");
      if(ctx){
        ctx.lineWidth = parseInt(e.target.value)
      } 
    }
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
        ctx.lineWidth = 2;
      }
    }
   
  }, []);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setPrevPos({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const currentPos = { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY };

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

  return (


    <div className="flex justify-center items-center h-screen">
    <div>
      <div className="flex flex-row justify-around">
        <div className="flex flex-col mr-5">
          <p className="w-[144px]">Text color picker </p>
          <input type="color" className="w-60" onChange={colorChangeHandler} value={textColor} />
        </div>
        <div className="flex flex-col mr-5">
          <p className="w-[144px]">Font Size </p>
          <input type="number" id="quantity" name="quantity" min="1" max="10" step="1" value={fontSize} className="border border-black w-60" onChange={fontsizeChangeHandler} />
        </div>
      </div>
      <div className="mt-4">
      <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      className=" border border-black"
      
    />
      </div>
      <div className="flex flex-row mt-5 justify-around">
        <button className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-60" onClick={clearCanvas}>Clear</button>
        <button className="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900 w-60"> Save & download </button>

      </div>
    </div>
  </div>
   
  );
};

export default CanvasDraw;
