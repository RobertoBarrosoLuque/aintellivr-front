import { useDemoContext } from "@/context/DemoContext";

export const SystemState = () => {
  const { demoState } = useDemoContext();
  const { 
    authenticated, 
    detectedIntent, 
    confidenceScore, 
    contextInfo, 
    workflowStep, 
    workflowDetails 
  } = demoState;
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="font-semibold text-lg text-gray-800 mb-4">System State</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Authentication Status</h3>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
            <span className="text-sm font-medium text-gray-700">
              {authenticated ? "Authenticated" : "Not Authenticated"}
            </span>
            {authenticated ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="3" />
                </svg>
                Verified
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-yellow-400" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="3" />
                </svg>
                Pending
              </span>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Detected Intent</h3>
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{detectedIntent}</span>
              <span className="text-xs font-medium text-gray-500">Confidence: {confidenceScore}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full" 
                style={{ width: `${confidenceScore}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Context Information</h3>
          <div className="bg-gray-50 p-3 rounded-md border border-gray-200 h-[120px] overflow-y-auto">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-gray-500">User ID:</dt>
              <dd className="text-gray-700 font-mono">{contextInfo.userId}</dd>
              
              <dt className="text-gray-500">Account #:</dt>
              <dd className="text-gray-700 font-mono">{contextInfo.accountNum}</dd>
              
              <dt className="text-gray-500">Last Activity:</dt>
              <dd className="text-gray-700 font-mono">{contextInfo.lastActivity}</dd>
              
              <dt className="text-gray-500">Call Origin:</dt>
              <dd className="text-gray-700 font-mono">{contextInfo.callOrigin}</dd>
            </dl>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Current Workflow Step</h3>
          <div className="flex items-center p-3 bg-gray-50 rounded-md border border-gray-200">
            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-700">{workflowStep}</span>
              <span className="block text-xs text-gray-500">{workflowDetails}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
