import { useDemoContext } from "@/context/DemoContext";
import { useEffect, useRef } from "react";

export const ConversationDisplay = () => {
  const { conversation, demoState, formattedCallTime } = useDemoContext();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages come in
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [conversation]);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg text-gray-800">Conversation Transcript</h2>
        <span className="text-xs text-gray-500">{formattedCallTime}</span>
      </div>
      
      <div 
        ref={containerRef} 
        className="space-y-4 max-h-[500px] overflow-y-auto pr-2"
      >
        {conversation.map((message, index) => (
          <div 
            key={index}
            className={`flex items-start ${message.sender === 'user' ? 'justify-end' : ''}`}
          >
            {message.sender === 'system' && (
              <div className="flex-shrink-0 bg-gray-200 h-8 w-8 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            )}
            
            <div 
              className={`${message.sender === 'system' 
                ? 'ml-3 bg-primary-50 rounded-lg rounded-tl-none' 
                : 'mr-3 bg-gray-100 rounded-lg rounded-tr-none'} 
                p-3 text-sm text-gray-700 max-w-[85%]`}
            >
              <div className="flex justify-between mb-1">
                <span className={`font-medium ${message.sender === 'system' ? 'text-primary-700' : 'text-gray-700'}`}>
                  {message.sender === 'system' ? 'System' : 'You'}
                </span>
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
              <p>{message.text}</p>
            </div>
            
            {message.sender === 'user' && (
              <div className="flex-shrink-0 bg-gray-700 h-8 w-8 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
        ))}
        
        {demoState.isResponding && (
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-gray-200 h-8 w-8 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-3 bg-primary-50 rounded-lg rounded-tl-none p-3 text-sm text-gray-700">
              <div className="flex justify-between mb-1">
                <span className="font-medium text-primary-700">System</span>
                <span className="text-xs text-gray-500">{formattedCallTime}</span>
              </div>
              <div className="typing-animation flex space-x-1">
                <div className="dot animate-bounce delay-75"></div>
                <div className="dot animate-bounce delay-100"></div>
                <div className="dot animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .typing-animation {
          display: flex;
          align-items: center;
        }
        
        .dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: #6b7280;
          margin: 0 2px;
        }
        
        .delay-75 {
          animation-delay: 0ms;
        }
        
        .delay-100 {
          animation-delay: 150ms;
        }
        
        .delay-150 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
};
