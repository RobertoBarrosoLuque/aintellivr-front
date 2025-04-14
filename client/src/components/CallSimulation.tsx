import { useDemoContext } from "@/context/DemoContext";
import { Mic } from "lucide-react";
import { useState, useEffect } from "react";

export const CallSimulation = () => {
  const { 
    demoState, 
    startListening, 
    stopListening, 
    systemStatus,
    formattedCallTime 
  } = useDemoContext();
  
  const [animationFrames, setAnimationFrames] = useState<number[]>([]);
  
  useEffect(() => {
    // Generate random heights for waveform animation
    if (demoState.isListening) {
      const newFrames = Array(10).fill(0).map(() => Math.floor(Math.random() * 12) + 3);
      setAnimationFrames(newFrames);
    }
  }, [demoState.isListening, formattedCallTime]);
  
  const handleMicClick = () => {
    if (demoState.isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg text-gray-800">Call Simulation</h2>
        <div className="flex items-center">
          <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="ml-2 text-xs font-medium text-green-700">Call Active</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="relative mr-4">
            <button 
              onClick={handleMicClick}
              className={`h-16 w-16 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 text-white shadow-lg transition-all
                ${demoState.isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'}`}
            >
              <Mic className="h-8 w-8" />
            </button>
            <div 
              className={`absolute inset-0 rounded-full border-4 border-primary/40 ${demoState.isListening ? 'animate-pulse opacity-70' : 'opacity-0'}`}
            ></div>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-1">Voice Input</h3>
            <p className="text-sm text-gray-500">
              {demoState.isListening ? "Listening..." : "Press to speak"}
            </p>
            {demoState.isListening && (
              <div className="flex items-center h-8 mt-2">
                {animationFrames.map((height, i) => (
                  <div 
                    key={i}
                    className="bg-primary mx-[1px] w-[3px] rounded-full"
                    style={{ 
                      height: `${height}px`,
                      animation: `waveform-animation 1s infinite ease-in-out`,
                      animationDelay: `${i * -0.1}s`
                    }}
                  ></div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex space-x-3 mb-2">
            <button 
              disabled={true} 
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              disabled={true} 
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500">System Audio</p>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex items-center mb-3">
          <div className="mr-2 w-3 h-3 rounded-full bg-primary"></div>
          <h3 className="font-medium text-gray-800">System Status</h3>
        </div>
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex flex-wrap gap-2">
            {systemStatus === 'waiting' && (
              <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <svg className="mr-1.5 h-2 w-2 text-blue-400 animate-pulse" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="3" />
                </svg>
                Waiting for input
              </div>
            )}
            {systemStatus === 'processing' && (
              <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <svg className="mr-1.5 h-2 w-2 text-yellow-400 animate-pulse" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="3" />
                </svg>
                Processing
              </div>
            )}
            {systemStatus === 'responding' && (
              <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <svg className="mr-1.5 h-2 w-2 text-green-400 animate-pulse" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="3" />
                </svg>
                Responding
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
