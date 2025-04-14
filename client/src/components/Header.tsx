import { useDemoContext } from "@/context/DemoContext";

export const Header = () => {
  const { resetDemo } = useDemoContext();
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10V6Z" fill="currentColor"/>
              <path d="M18 10C18 14.4183 14.4183 18 10 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M5 14C5 15.6569 6.34315 17 8 17C9.30622 17 10.4175 16.1652 10.8293 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M17 17.5C17 19.433 15.433 21 13.5 21C11.567 21 10 19.433 10 17.5C10 15.567 11.567 14 13.5 14C15.433 14 17 15.567 17 17.5Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <h1 className="ml-2 font-bold text-xl text-gray-800">LLM-IVR Demo</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline-block text-sm text-gray-500">Proof of Concept Demonstration</span>
            <button 
              onClick={resetDemo}
              className="text-sm px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Reset Demo
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
