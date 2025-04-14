import { useDemoContext } from "@/context/DemoContext";

export const VisualWorkflow = () => {
  const { demoState } = useDemoContext();
  const { currentStep } = demoState;
  
  // Define the steps in sequence
  const steps = [
    { id: 'input', label: 'Input', description: 'Initial user input' },
    { id: 'authentication', label: 'Authentication', description: 'User verification' },
    { id: 'intent', label: 'Intent', description: 'Intent recognition' },
    { id: 'routing', label: 'Routing', description: 'Decision making' },
    { id: 'end', label: 'End', description: 'Process complete' }
  ];
  
  // Helper to get the status of a step
  const getStepStatus = (stepId: string) => {
    if (stepId === 'fallback') return 'error';
    
    const stepOrder = steps.findIndex(s => s.id === stepId);
    const currentOrder = steps.findIndex(s => s.id === currentStep);
    
    if (stepOrder < currentOrder) return 'completed';
    if (stepOrder === currentOrder) return 'in-progress';
    return 'pending';
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="font-semibold text-lg text-gray-800 mb-4">Workflow Visualization</h2>
      
      <div className="relative py-4">
        {/* Horizontal line connecting all buttons */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>
        
        {/* Steps */}
        <div className="relative flex justify-between items-center">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            let bgColor = 'bg-gray-200'; // Default / pending
            let textColor = 'text-gray-500';
            
            if (status === 'completed') {
              bgColor = 'bg-green-500';
              textColor = 'text-white';
            } else if (status === 'in-progress') {
              bgColor = 'bg-orange-500';
              textColor = 'text-white';
            } else if (status === 'error') {
              bgColor = 'bg-red-500';
              textColor = 'text-white';
            }
            
            return (
              <div key={step.id} className="flex flex-col items-center z-10">
                <div 
                  className={`flex items-center justify-center h-10 w-10 rounded-full ${bgColor} ${textColor} font-medium text-sm mb-2`}
                >
                  {index + 1}
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-700">{step.label}</div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Fallback state indicator (if active) */}
        {currentStep === 'fallback' && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-md p-3 flex items-center">
            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-red-800 text-sm">Error State</h3>
              <p className="text-red-700 text-xs">System encountered an error and needs to recover</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
