import React, { createContext, useContext, useState, useEffect } from 'react';
import { scenarios, initialConversation as initialConversationData, ScenarioData } from '@/lib/demoScenarios';
import { useCallTimer } from '@/hooks/useCallTimer';

interface Message {
  sender: 'system' | 'user';
  text: string;
  time: string;
}

// Type-cast the initialConversation to match our Message interface
const initialConversation: Message[] = initialConversationData as Message[];

interface ContextInfo {
  userId: string;
  accountNum: string;
  lastActivity: string;
  callOrigin: string;
}

interface DemoState {
  callActive: boolean;
  authenticated: boolean;
  currentScenario: string | null;
  currentStep: 'input' | 'authentication' | 'intent' | 'routing' | 'end' | 'fallback';
  isListening: boolean;
  isProcessing: boolean;
  isResponding: boolean;
  confidenceScore: number;
  responseDelay: number;
  detectedIntent: string;
  workflowStep: string;
  workflowDetails: string;
  contextInfo: ContextInfo;
  llmProvider: 'openai' | 'fireworksai';
  apiKey: string;
}

interface DemoContextType {
  demoState: DemoState;
  conversation: Message[];
  formattedCallTime: string;
  systemStatus: 'waiting' | 'processing' | 'responding';
  startListening: () => void;
  stopListening: () => void;
  resetDemo: () => void;
  loadScenario: (scenarioKey: string) => void;
  toggleAuthentication: () => void;
  updateConfidence: (value: number) => void;
  updateResponseTime: (value: number) => void;
  simulateError: () => void;
  updateLlmProvider: (provider: 'openai' | 'fireworksai') => void;
  updateApiKey: (key: string) => void;
}

const initialState: DemoState = {
  callActive: true,
  authenticated: false,
  currentScenario: null,
  currentStep: 'input',
  isListening: false,
  isProcessing: false,
  isResponding: false,
  confidenceScore: 85,
  responseDelay: 2,
  detectedIntent: 'Account Balance Inquiry',
  workflowStep: 'Initial Greeting',
  workflowDetails: 'Collecting user intent',
  contextInfo: {
    userId: 'Unknown',
    accountNum: '--',
    lastActivity: '--',
    callOrigin: 'Mobile App'
  },
  llmProvider: 'openai',
  apiKey: ''
};

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [demoState, setDemoState] = useState<DemoState>(initialState);
  const [conversation, setConversation] = useState<Message[]>(initialConversation);
  const { seconds, formattedTime, resetTimer, formatTime } = useCallTimer();
  
  const addMessage = (message: Message) => {
    setConversation(prev => [...prev, message]);
  };
  
  // Determine system status
  const systemStatus = demoState.isProcessing 
    ? 'processing' 
    : demoState.isResponding 
      ? 'responding' 
      : 'waiting';
  
  const startListening = () => {
    if (!demoState.callActive) return;
    
    setDemoState(prev => ({
      ...prev,
      isListening: true
    }));
  };
  
  const stopListening = () => {
    setDemoState(prev => ({
      ...prev,
      isListening: false
    }));
    
    // If no scenario is selected, automatically use 'new-customer' scenario
    if (!demoState.currentScenario) {
      loadScenario('new-customer');
      setTimeout(() => {
        processInput();
      }, 100);
    } else {
      processInput();
    }
  };
  
  const processInput = () => {
    if (!demoState.currentScenario) return;
    
    // Add user message to conversation
    const scenario = scenarios[demoState.currentScenario];
    addMessage({
      sender: 'user',
      text: scenario.userQuery,
      time: formattedTime
    });
    
    // Start processing
    setDemoState(prev => ({
      ...prev,
      isProcessing: true,
      currentStep: 'authentication'
    }));
    
    // Simulate processing delay
    setTimeout(() => {
      setDemoState(prev => ({
        ...prev,
        isProcessing: false,
        isResponding: true
      }));
      
      // Simulate system response delay
      setTimeout(() => {
        // Add system response
        addMessage({
          sender: 'system',
          text: scenario.systemResponse,
          time: formatTime(seconds)
        });
        
        setDemoState(prev => ({
          ...prev,
          isResponding: false,
          currentStep: 'intent'
        }));
        
        // Move to next step after some time
        setTimeout(() => {
          setDemoState(prev => ({
            ...prev,
            currentStep: 'routing'
          }));
          
          // Move to end step for completion
          setTimeout(() => {
            setDemoState(prev => ({
              ...prev,
              currentStep: 'end'
            }));
          }, 2000);
        }, 1500);
      }, demoState.responseDelay * 1000);
    }, 1500);
  };
  
  const resetDemo = () => {
    setDemoState(initialState);
    setConversation(initialConversation);
    resetTimer();
  };
  
  const loadScenario = (scenarioKey: string) => {
    const scenario = scenarios[scenarioKey];
    if (!scenario) return;
    
    setDemoState(prev => ({
      ...prev,
      currentScenario: scenarioKey,
      detectedIntent: scenario.intent,
      confidenceScore: scenario.confidence,
      authenticated: scenario.authentication,
      workflowStep: scenario.workflowStep,
      workflowDetails: scenario.workflowDetails,
      contextInfo: scenario.contextUpdates,
      currentStep: getStepFromWorkflow(scenario.workflowStep)
    }));
  };
  
  const getStepFromWorkflow = (workflowStep: string): DemoState['currentStep'] => {
    switch (workflowStep) {
      case 'Intent Recognition':
        return 'intent';
      case 'Authentication':
        return 'authentication';
      case 'Routing Decision':
        return 'routing';
      default:
        return 'input';
    }
  };
  
  const toggleAuthentication = () => {
    setDemoState(prev => ({
      ...prev,
      authenticated: !prev.authenticated
    }));
  };
  
  const updateConfidence = (value: number) => {
    setDemoState(prev => ({
      ...prev,
      confidenceScore: value
    }));
  };
  
  const updateResponseTime = (value: number) => {
    setDemoState(prev => ({
      ...prev,
      responseDelay: value
    }));
  };
  
  const simulateError = () => {
    setDemoState(prev => ({
      ...prev,
      currentStep: 'fallback'
    }));
    
    // Reset after 3 seconds
    setTimeout(() => {
      setDemoState(prev => ({
        ...prev,
        currentStep: 'input'
      }));
    }, 3000);
  };
  
  const updateLlmProvider = (provider: 'openai' | 'fireworksai') => {
    setDemoState(prev => ({
      ...prev,
      llmProvider: provider
    }));
  };
  
  const updateApiKey = (key: string) => {
    setDemoState(prev => ({
      ...prev,
      apiKey: key
    }));
  };
  
  return (
    <DemoContext.Provider
      value={{
        demoState,
        conversation,
        formattedCallTime: formattedTime,
        systemStatus,
        startListening,
        stopListening,
        resetDemo,
        loadScenario,
        toggleAuthentication,
        updateConfidence,
        updateResponseTime,
        simulateError,
        updateLlmProvider,
        updateApiKey
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemoContext = () => {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemoContext must be used within a DemoProvider');
  }
  return context;
};
