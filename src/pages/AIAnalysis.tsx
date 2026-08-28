import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, AlertTriangle, Users, Map, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";

export default function AIAnalysis() {
  const [searchParams] = useSearchParams();
  const problemId = searchParams.get("id") || "";
  
  const [analyzing, setAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Understanding the problem...");
  
  // State for AI Results
  const [priorityScore, setPriorityScore] = useState(92);
  const [severityLevel, setSeverityLevel] = useState("High");
  const [peopleAffected, setPeopleAffected] = useState(1250);
  const [reasoning, setReasoning] = useState("Analyzing...");
  const [problemDesc, setProblemDesc] = useState("Loading problem details...");

  useEffect(() => {
    // Fake Progress Bar steps
    const steps = [
      "Analyzing location data...",
      "Cross-referencing similar reports...",
      "Calculating societal impact...",
      "Identifying priority score...",
      "AI Analysis Complete!"
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setAnalyzing(false), 800);
          return 100;
        }
        
        if (p % 20 === 0 && currentStep < steps.length) {
          setLoadingText(steps[currentStep]);
          currentStep++;
        }
        return p + 2.5;
      });
    }, 50); // Faster progress for better UX

    // Fetch details and hit the analyze API
    const runAnalysis = async () => {
      const apiBase = `http://${window.location.hostname}:8000`;
      try {
        // 1. Fetch description from problem API
        let description = "Garbage collection is not happening regularly in our area.";
        if (problemId) {
          const res = await fetch(`${apiBase}/problems/${problemId}`);
          if (res.ok) {
            const prob = await res.json();
            description = prob.description;
            setProblemDesc(description);
          }
        } else {
          setProblemDesc(description);
        }

        // 2. Run AI Analysis
        const analysisRes = await fetch(`${apiBase}/ai/analyze`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            problem_id: problemId || "default-id",
            description: description
          })
        });

        if (analysisRes.ok) {
          const data = await analysisRes.json();
          setPriorityScore(data.priority_score);
          setSeverityLevel(data.severity_level);
          setPeopleAffected(data.people_affected);
          setReasoning(data.reasoning);
        }
      } catch (err) {
        console.error("AI Analysis API error:", err);
      }
    };

    runAnalysis();

    return () => clearInterval(interval);
  }, [problemId]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-[calc(100vh-4rem)] relative overflow-hidden">
      
      {/* Background grids and effects */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {analyzing ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center max-w-md w-full z-10">
          <BrainCircuit className="h-16 w-16 text-emerald-400 mb-8 animate-pulse" />
          <h2 className="text-2xl font-bold mb-2">Analyzing with AI Engine</h2>
          <p className="text-muted-foreground mb-8 text-center h-6">{loadingText}</p>
          
          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 text-emerald-400 font-mono">{Math.floor(progress)}%</p>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl grid md:grid-cols-2 gap-8 z-10"
        >
          {/* Left Column: Score */}
          <div className="glass-card p-8 flex flex-col items-center justify-center rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 to-transparent pointer-events-none" />
            
            <h3 className="text-xl font-semibold mb-6 text-muted-foreground tracking-widest uppercase">Priority Score</h3>
            
            <div className="relative flex items-center justify-center w-64 h-64">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary" />
                <motion.circle 
                  cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" 
                  className={priorityScore > 80 ? "text-destructive" : "text-amber-500"}
                  strokeDasharray="283"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * (priorityScore / 100)) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className={`text-6xl font-black ${priorityScore > 80 ? "text-destructive" : "text-amber-500"}`}>{priorityScore}</span>
                <span className="text-sm text-muted-foreground mt-1">out of 100</span>
              </div>
            </div>
            
            <div className={`mt-6 font-bold px-6 py-2 rounded-full tracking-wide ${priorityScore > 80 ? "bg-destructive/10 text-destructive" : "bg-amber-500/10 text-amber-500"}`}>
              {priorityScore > 80 ? "CRITICAL PRIORITY" : "MEDIUM PRIORITY"}
            </div>
          </div>

          {/* Right Column: AI Insights */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold mb-2">AI Intelligence Report</h3>
            
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4 flex items-start gap-4">
                <AlertTriangle className="text-amber-500 mt-1 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Issue Understanding</p>
                  <p className="text-sm text-muted-foreground mt-1">{problemDesc}</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-4 flex flex-col gap-2">
                  <Users className="text-cyan-500 h-5 w-5" />
                  <p className="font-semibold text-sm">People Affected</p>
                  <p className="text-2xl font-bold">{peopleAffected.toLocaleString()}+</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-4 flex flex-col gap-2">
                  <Map className="text-emerald-500 h-5 w-5" />
                  <p className="font-semibold text-sm">Location Risk</p>
                  <p className="text-2xl font-bold">{severityLevel}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-emerald-500/5 border-emerald-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BrainCircuit className="text-emerald-500 h-4 w-4" />
                  <span className="font-semibold text-sm text-emerald-500">AI Reasoning</span>
                </div>
                <p className="text-sm text-muted-foreground">{reasoning}</p>
              </CardContent>
            </Card>

            <Link to={`/matching?id=${problemId}`} className="mt-4">
              <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-lg shadow-[0_0_15px_rgba(5,150,105,0.3)]">
                Find Collaborators <CheckCircle2 className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
