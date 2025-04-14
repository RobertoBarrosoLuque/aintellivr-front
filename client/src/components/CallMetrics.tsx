import { useDemoContext } from "@/context/DemoContext";
import { Clock, ArrowRight, ChevronRight, Timer } from "lucide-react";
import { useEffect, useState } from "react";

export const CallMetrics = () => {
  const { demoState, formattedCallTime } = useDemoContext();
  const [responseTime, setResponseTime] = useState<string>("0.00");
  const [processingTime, setProcessingTime] = useState<string>("0.00");
  
  // Simulated timer for response time
  useEffect(() => {
    if (demoState.isProcessing) {
      const startTime = Date.now();
      const interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedSeconds = ((currentTime - startTime) / 1000).toFixed(2);
        setProcessingTime(elapsedSeconds);
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [demoState.isProcessing]);
  
  // Simulated timer for response delivery
  useEffect(() => {
    if (demoState.isResponding) {
      const startTime = Date.now();
      const interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedSeconds = ((currentTime - startTime) / 1000).toFixed(2);
        setResponseTime(elapsedSeconds);
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [demoState.isResponding]);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="font-semibold text-lg text-gray-800 mb-4">Call Metrics</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Total Call Time</div>
              <div className="text-lg font-semibold text-gray-800">{formattedCallTime}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <Timer className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Processing Time</div>
              <div className="text-lg font-semibold text-gray-800">{processingTime}s</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <ArrowRight className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Response Time</div>
              <div className="text-lg font-semibold text-gray-800">{responseTime}s</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
              <ChevronRight className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">API Calls</div>
              <div className="text-lg font-semibold text-gray-800">
                {demoState.currentStep !== 'input' ? '1' : '0'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};