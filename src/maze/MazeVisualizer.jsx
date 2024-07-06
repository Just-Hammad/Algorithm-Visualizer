import React, { useState, useEffect, useRef } from 'react';
import MazeMenu from './maze-menu';
import { dijkstraAlgorithm } from './dijkstra';
import { generateMaze } from './mazeGenerator';
import './MazeVisualizer.css';

const MazeVisualizer = () => {
  const [width, setWidth] = useState(25);
  const [height, setHeight] = useState(25);
  const [delay, setDelay] = useState(100);
  const [maze, setMaze] = useState(Array.from({ length: height }, () => Array(width).fill()));
  const controllerRef = useRef(null);

  const [message, setMessage] = useState('');
  const cellSize = 500 / Math.max(width, height); // 278

  const handleStart = () => {

    if (width < 5 || height < 5 || width > 51 || height > 51) {
      setMessage('Width and height must be between 5 and 51');
      throw new Error('Width and height must be between 5 and 51');
    }

    if (width % 2 === 0 || height % 2 === 0) {
      setMessage('Width and height must be odd numbers');
      throw new Error('Width and height must be odd numbers');
    }
    // Cancel any ongoing maze generation
    if (controllerRef.current) {
      
      controllerRef.current.abort();
    }

    // Create a new AbortController
    const controller = new AbortController();
    controllerRef.current = controller;

    const generate = async () => {
      try {
        await generateMaze(width, height, setMaze, 0, controller.signal);
        await dijkstraAlgorithm(maze, width, height, setMaze, delay, controller.signal);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Maze generation aborted');
        } else {
          console.error('Maze generation error:', err);
        }
      }
    };
    generate();
  };

  function cellType(cell) {
    switch (cell) {
      case 0:
        return 'path';
      case 1:
        return 'wall';
      case 2:
        return 'neighbour';
      case 3:
        return 'current';
      case -1:
        return 'start';
      case -2:
        return 'end';
      default:
        return '';
    }
  }

  return (


    <div className="maze-grid-container">
      <div style={{ gridColumn: 'span 2' }}>
        <MazeMenu className="maze-menu" />
      </div>
      <div className="maze-container p-5" style={{ gridColumn: 'span 5' }}>
        <div className='grid grid-rows-7 h-full w-full'>
          {/* First Row */}
          <div className='grid grid-cols-12 row-span-6'>

            <div className='col-span-9 border border-red-800 shadow-md shadow-green-400'>
              {maze.map((row, rowIndex) => (
                <div key={rowIndex} className="maze-row">
                  {row.map((cell, cellIndex) => (
                    <div
                      key={cellIndex}
                      className={`maze-cell ${cellType(cell)}`}
                      style={{ width: cellSize, height: cellSize, transition: `all ${delay + 200}ms ease-in-out` }}
                    ></div>
                  ))}
                </div>
              ))}
            </div>

            <div className=' col-span-3 '>
              <div className='grid gap-3 items-center justify-end p-6'>
                <div className='flex'>
                  <p className='maze-cell start p-0.5 m-2'></p>
                  <p className='p-0.5 text-green-100 font-bold'>Start</p>
                </div>
                <div className='flex'>
                  <p className='maze-cell end p-0.5 m-2'></p>
                  <p className='p-0.5 text-green-100 font-bold'>End</p>
                </div>
                <div className='flex'>
                  <p className='maze-cell neighbour p-0.5 m-2'></p>
                  <p className='p-0.5 text-green-100 font-bold'>Neighbour</p>
                </div>
                <div className='flex'>
                  <p className='maze-cell current p-0.5 m-2'></p>
                  <p className='p-0.5 text-green-100 font-bold'>Current</p>
                </div>
                <div className='flex'>
                  <p className='maze-cell wall p-0.5 m-2'></p>
                  <p className='p-0.5 text-green-100 font-bold'>Wall</p>
                </div>       
              </div>
            </div>
          </div>
          {/* Second Row */}
          
        </div>
      </div>
      <div className="flex flex-col justify-center items-center" style={{ gridColumn: 'span 2' }}>
        <button onClick={handleStart} className="bg-black text-green-400 px-4 py-2 rounded-md border border-green-400 hover:bg-green-400 hover:text-black transition duration-300">Start</button>
        <input id='maze-width' onChange={(e) => setWidth(Number(e.target.value))} type='number' placeholder='Width' className='w-20 h-8 bg-black text-green-400 border border-green-400 rounded-md px-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600' />
        <input id='maze-height' onChange={(e) => setHeight(Number(e.target.value))} type='number' placeholder='Height' className='w-20 h-8 bg-black text-green-400 border border-green-400 rounded-md px-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600' />
        <input id='maze-delay' onChange={(e) => setDelay(Number(e.target.value))} type='number' placeholder='Delay' className='w-20 h-8 bg-black text-green-400 border border-green-400 rounded-md px-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600' />
        <p className=" text-green-400">{message}</p>
      </div>
    </div>
  );
};

export default MazeVisualizer;
