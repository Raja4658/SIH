import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, UploadCloud, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { API_BASE } from "../lib/api";

const categories = ["Waste Management", "Water", "Agriculture", "Transportation", "Education", "Environment", "Public Safety", "Infrastructure"];

export default function ReportProblem() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleNext = () => setStep(step + 1);

  const handleSubmit = async () => {
    const apiBase = API_BASE;
    setStep(4);
    try {
      const response = await fetch(`${apiBase}/problems`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: description,
          location: "Coimbatore",
          category: category || "Waste Management",
          expected_impact: "Community safety and cleanliness"
        })
      });
      const data = await response.json();
      setTimeout(() => {
        navigate(`/ai-analysis?id=${data.id}`);
      }, 2000);
    } catch (error) {
      console.error("Failed to submit problem to backend:", error);
      setTimeout(() => {
        navigate("/ai-analysis");
      }, 2000);
    }
  };

  return (
    <div className="flex-1 flex flex-col pt-10 px-4">
      <div className="container max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Report a Problem</h1>

        {/* Stepper */}
        <div className="flex justify-between items-center mb-12 relative">
          <div className="absolute left-0 right-0 h-1 bg-border top-1/2 -translate-y-1/2 z-0" />
          <div className="absolute left-0 h-1 bg-emerald-500 top-1/2 -translate-y-1/2 z-0 transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%` }} />
          {[1, 2, 3].map((num) => (
            <div key={num} className={`z-10 h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= num ? "bg-emerald-500 text-white" : "bg-card border-2 border-border text-muted-foreground"}`}>
              {num}
            </div>
          ))}
        </div>

        {/* Form Area */}
        <div className="glass-card rounded-2xl p-6 md:p-10 relative overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <label className="block font-semibold mb-2">Describe the Problem in Detail</label>
                  <textarea 
                    rows={4} 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl p-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none" 
                    placeholder="E.g., Garbage collection is not happening regularly in our area, leading to health hazards..." 
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Upload Photos or Video</label>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-muted-foreground hover:bg-white/5 hover:border-emerald-500/50 transition-colors cursor-pointer">
                    <UploadCloud className="h-10 w-10 mb-2 opacity-50" />
                    <span>Click or drag files here to upload</span>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-700">Next <ChevronRight className="ml-2 w-4 h-4" /></Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <label className="block font-semibold mb-2">Select Location</label>
                  <div className="h-48 rounded-xl border border-border bg-muted flex items-center justify-center text-muted-foreground relative overflow-hidden">
                     {/* Leaflet Map Placeholder for visual appeal */}
                     <div className="absolute inset-0 bg-[url('https://maps.wikimedia.org/osm-intl/12/2927/1908.png')] bg-cover bg-center opacity-40"></div>
                     <MapPin className="h-8 w-8 text-destructive z-10 animate-bounce" />
                  </div>
                  <input type="text" className="w-full bg-background border border-border rounded-xl p-3 mt-4 text-sm outline-none" defaultValue="Cross Cut Road, Coimbatore" />
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-700">Next <ChevronRight className="ml-2 w-4 h-4" /></Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <label className="block font-semibold mb-4">Select AI Detected Category</label>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map(cat => (
                      <div 
                        key={cat} 
                        onClick={() => setCategory(cat)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${category === cat ? "border-emerald-500 bg-emerald-500/10 text-emerald-500 font-semibold" : "border-border hover:border-border/80 text-muted-foreground"}`}
                      >
                        {cat}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                  <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">Submit Problem <CheckCircle2 className="ml-2 w-4 h-4" /></Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-full space-y-4 py-12">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="h-20 w-20 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                </motion.div>
                <h3 className="text-2xl font-bold">Problem Submitted Successfully</h3>
                <p className="text-muted-foreground">Redirecting to AI Analysis...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
