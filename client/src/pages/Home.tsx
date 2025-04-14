import { Header } from "@/components/Header";
import { CallSimulation } from "@/components/CallSimulation";
import { ConversationDisplay } from "@/components/ConversationDisplay";
import { VisualWorkflow } from "@/components/VisualWorkflow";
import { SystemState } from "@/components/SystemState";
import { DemoControls } from "@/components/DemoControls";
import { CallMetrics } from "@/components/CallMetrics";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-6">
            <CallSimulation />
            <ConversationDisplay />
            <VisualWorkflow />
          </div>
          
          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">
            <SystemState />
            <CallMetrics />
            <DemoControls />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
