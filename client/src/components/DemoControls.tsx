import { useDemoContext } from "@/context/DemoContext";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const DemoControls = () => {
  const { 
    demoState, 
    loadScenario, 
    toggleAuthentication, 
    updateConfidence, 
    updateResponseTime, 
    simulateError, 
    updateLlmProvider, 
    updateApiKey 
  } = useDemoContext();
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="font-semibold text-lg text-gray-800 mb-4">Demo Scenarios</h2>
      
      <div className="space-y-3">
        <p className="text-sm text-gray-500 mb-3">Select a predefined scenario to demonstrate:</p>
        
        <ScenarioOption 
          title="New Customer Inquiry" 
          description="Service information request" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          }
          bgColor="bg-blue-100"
          onClick={() => loadScenario('new-customer')}
        />
        
        <ScenarioOption 
          title="Billing Question" 
          description="Account balance and payments" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          bgColor="bg-green-100"
          onClick={() => loadScenario('billing-question')}
        />
        
        <ScenarioOption 
          title="Technical Support" 
          description="Troubleshooting assistance" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
          bgColor="bg-purple-100"
          onClick={() => loadScenario('tech-support')}
        />
        
        <ScenarioOption 
          title="Account Update" 
          description="Change personal information" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          }
          bgColor="bg-yellow-100"
          onClick={() => loadScenario('update-info')}
        />
        
        <ScenarioOption 
          title="Complaint Escalation" 
          description="Service dissatisfaction" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
          bgColor="bg-red-100"
          onClick={() => loadScenario('complaint')}
        />
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button 
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm font-medium text-gray-700 flex items-center"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 mr-1 transition-transform ${showAdvanced ? 'rotate-90' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
          Advanced Demo Controls
        </button>
        
        {showAdvanced && (
          <div className="mt-3 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">LLM Settings</h3>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="llm-provider" className="text-xs font-medium text-gray-700 mb-1">LLM Provider</Label>
                  <RadioGroup 
                    id="llm-provider" 
                    defaultValue={demoState.llmProvider}
                    onValueChange={(value) => updateLlmProvider(value as 'openai' | 'fireworksai')}
                    className="flex gap-4 mt-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="openai" id="openai" />
                      <Label htmlFor="openai" className="text-sm">OpenAI</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fireworksai" id="fireworksai" />
                      <Label htmlFor="fireworksai" className="text-sm">FireworksAI</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label htmlFor="api-key" className="text-xs font-medium text-gray-700 mb-1">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter your API key"
                    value={demoState.apiKey}
                    onChange={(e) => updateApiKey(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-4 flex flex-wrap gap-2">
              <button 
                onClick={toggleAuthentication}
                className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded"
              >
                Toggle Authentication
              </button>
              <button 
                onClick={simulateError}
                className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded"
              >
                Simulate Error
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

type ScenarioOptionProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  onClick: () => void;
};

const ScenarioOption = ({ title, description, icon, bgColor, onClick }: ScenarioOptionProps) => {
  return (
    <div 
      className="cursor-pointer p-3 rounded-md border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`h-8 w-8 rounded-full ${bgColor} flex items-center justify-center mr-3`}>
            {icon}
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700">{title}</span>
            <span className="block text-xs text-gray-500">{description}</span>
          </div>
        </div>
        <div className="text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};
