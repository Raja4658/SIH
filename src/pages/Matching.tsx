import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Network, Building2, Lightbulb, Users2, ArrowRight, X, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";

const matches = [
  {
    type: "University Match",
    icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
    entities: [
      { 
        name: "Environmental Engineering Dept.", 
        score: 96, 
        reason: "Specialized in urban waste management.",
        pastProject: "City-wide composting initiative.",
        howTheyDidIt: "Deployed automated compost bins across 50 neighborhoods and trained local staff to monitor temperature and moisture using IoT sensors."
      },
      { 
        name: "AI & Data Science Lab", 
        score: 91, 
        reason: "Can build predictive models for garbage generation.",
        pastProject: "Predictive traffic management.",
        howTheyDidIt: "Analyzed 5 years of city traffic data to train an AI model that adjusts traffic light timings dynamically, reducing congestion by 20%."
      }
    ]
  },
  {
    type: "Industry Match",
    icon: <Building2 className="w-5 h-5 text-blue-500" />,
    entities: [
      { 
        name: "EcoTech IoT Solutions", 
        score: 89, 
        reason: "Provides smart bin sensors.",
        pastProject: "Smart water meter deployment.",
        howTheyDidIt: "Installed 10,000 smart meters that send real-time usage data via LoRaWAN, identifying leaks instantly and saving 1 million liters of water."
      },
      { 
        name: "CloudSync Analytics", 
        score: 82, 
        reason: "Offers cloud infrastructure for data.",
        pastProject: "Real-time pollution dashboard.",
        howTheyDidIt: "Built a highly scalable cloud architecture on AWS to ingest and visualize air quality data from 500+ sensors across the state."
      }
    ]
  },
  {
    type: "NGO & Community Match",
    icon: <Users2 className="w-5 h-5 text-emerald-500" />,
    entities: [
      { 
        name: "Clean City Initiative", 
        score: 94, 
        reason: "Active in the affected geographic area.",
        pastProject: "Lake restoration project.",
        howTheyDidIt: "Mobilized 2,000 volunteers over 6 months to remove tons of plastic waste and plant native species around the lake periphery."
      }
    ]
  }
];

export default function Matching() {
  const [searchParams] = useSearchParams();
  const problemId = searchParams.get("id") || "";
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [requestedCollabs, setRequestedCollabs] = useState<string[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [activeMatches, setActiveMatches] = useState<any[]>([]);

  useEffect(() => {
    let active = true;
    const fetchAndMatch = async () => {
      try {
        setLoading(true);
        // 1. Fetch the problem details
        let description = "Garbage collection is not happening regularly in our area.";
        if (problemId) {
          const res = await fetch(`http://127.0.0.1:8000/problems/${problemId}`);
          if (res.ok && active) {
            const prob = await res.json();
            description = prob.description;
          }
        }

        // If active is false, it means component unmounted or problemId changed
        if (!active) return;

        // 2. Fetch AI Matches
        const matchRes = await fetch("http://127.0.0.1:8000/ai/match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            problem_id: problemId || "default-id",
            description: description
          })
        });

        if (!active) return;

        if (matchRes.ok) {
          const data = await matchRes.json();
          // Format data to fit our layout structure
          const formatted = [
            {
              type: "University Match",
              icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
              entities: data.university_matches || []
            },
            {
              type: "Industry Match",
              icon: <Building2 className="w-5 h-5 text-blue-500" />,
              entities: data.industry_matches || []
            },
            {
              type: "NGO & Community Match",
              icon: <Users2 className="w-5 h-5 text-emerald-500" />,
              entities: data.ngo_matches || []
            }
          ];
          if (active) {
            setActiveMatches(formatted);
          }
        } else {
          if (active) setActiveMatches(matches); // Fallback
        }
      } catch (err) {
        console.error("Failed to fetch dynamic matches:", err);
        if (active) setActiveMatches(matches); // Fallback
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchAndMatch();
    return () => {
      active = false;
    };
  }, [problemId]);

  return (
    <div className="flex-1 container max-w-4xl mx-auto py-12 px-4 relative">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 text-primary mb-4">
          <Network className="h-8 w-8 text-emerald-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Finding the Right People to Solve This</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our AI engine has scanned thousands of university departments, companies, and organizations to find the perfect team for this issue.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-muted-foreground font-medium">Scanning departments and companies for solutions...</p>
        </div>
      ) : (
        <div className="space-y-8 relative">
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-border z-0 hidden md:block" />

          {activeMatches.map((category, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="relative z-10 flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="bg-background border border-border h-16 w-16 rounded-full flex items-center justify-center shrink-0 shadow-sm hidden md:flex">
                {category.icon}
              </div>

              <div className="flex-1 w-full">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 md:hidden">
                  {category.icon} {category.type}
                </h2>
                <h2 className="text-xl font-bold mb-4 hidden md:block text-muted-foreground">{category.type}</h2>
                
                <div className="grid gap-4">
                  {category.entities.map((entity: any, eIdx: number) => (
                    <div 
                      key={eIdx} 
                      onClick={() => setSelectedEntity(entity)}
                      className="glass-card rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-primary/50 transition-colors cursor-pointer group hover:bg-primary/5"
                    >
                      <div>
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{entity.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{entity.reason}</p>
                      </div>
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="flex-1 sm:w-32 bg-secondary h-2 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${entity.score}%` }}
                            transition={{ duration: 1, delay: (idx * 0.2) + 0.5 }}
                            className={`h-full ${entity.score > 90 ? 'bg-emerald-500' : 'bg-cyan-500'}`}
                          />
                        </div>
                        <span className="font-bold text-sm w-10 text-right">{entity.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-12 flex justify-center"
      >
        <Link to="/collaboration">
          <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-[0_0_20px_rgba(5,150,105,0.3)]">
            Form Team & Open Workspace <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </motion.div>

      <AnimatePresence>
        {selectedEntity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card border border-border shadow-xl rounded-2xl p-6 max-w-lg w-full relative overflow-hidden"
            >
              <button 
                onClick={() => setSelectedEntity(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary text-muted-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3 mb-6 pr-8">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold ${selectedEntity.score > 90 ? 'bg-emerald-500' : 'bg-cyan-500'}`}>
                  <span>{selectedEntity.score}%</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedEntity.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedEntity.reason}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> What they solved
                  </h4>
                  <p className="bg-secondary/50 p-4 rounded-xl text-sm leading-relaxed border border-border/50 text-foreground font-medium">
                    {selectedEntity.pastProject}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" /> How they did it
                  </h4>
                  <p className="bg-secondary/50 p-4 rounded-xl text-sm leading-relaxed border border-border/50 text-foreground">
                    {selectedEntity.howTheyDidIt}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex justify-end">
                <Button onClick={() => setSelectedEntity(null)} variant="outline" className="mr-3">Close</Button>
                <Button 
                  onClick={() => {
                    if (!requestedCollabs.includes(selectedEntity.name)) {
                      setRequestedCollabs([...requestedCollabs, selectedEntity.name]);
                    }
                  }}
                  disabled={requestedCollabs.includes(selectedEntity.name)}
                  className={`text-white font-medium ${requestedCollabs.includes(selectedEntity.name) ? 'bg-emerald-600 hover:bg-emerald-600' : 'bg-primary hover:bg-primary/90'}`}
                >
                  {requestedCollabs.includes(selectedEntity.name) ? 'Request Sent ✓' : 'Request Collaboration'}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
