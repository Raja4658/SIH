import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { RoleProvider } from "./context/RoleContext";
import { Navbar } from "./components/Navbar";
import { AnimatePresence } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import { PageWrapper } from "./components/PageWrapper";

import Home from "./pages/Home";
import ReportProblem from "./pages/ReportProblem";
import AIAnalysis from "./pages/AIAnalysis";
import Matching from "./pages/Matching";
import Collaboration from "./pages/Collaboration";
import Impact from "./pages/Impact";
import Pilot from "./pages/Pilot";
import Problems from "./pages/Problems";

// Placeholder components for pages
const Solutions = () => <div className="p-8">Solutions Dashboard Placeholder</div>;

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/report" element={<PageWrapper><ReportProblem /></PageWrapper>} />
        <Route path="/ai-analysis" element={<PageWrapper><AIAnalysis /></PageWrapper>} />
        <Route path="/matching" element={<PageWrapper><Matching /></PageWrapper>} />
        <Route path="/collaboration" element={<PageWrapper><Collaboration /></PageWrapper>} />
        <Route path="/problems" element={<PageWrapper><Problems /></PageWrapper>} />
        <Route path="/solutions" element={<PageWrapper><Solutions /></PageWrapper>} />
        <Route path="/impact" element={<PageWrapper><Impact /></PageWrapper>} />
        <Route path="/pilot" element={<PageWrapper><Pilot /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <RoleProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col relative overflow-hidden">
              <AnimatedRoutes />
            </main>
          </div>
        </Router>
      </RoleProvider>
    </ErrorBoundary>
  );
}

export default App;
