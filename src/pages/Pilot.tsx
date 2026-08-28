import { motion } from "framer-motion";
import { ArrowDown, CheckCircle2, TrendingDown, MapPin, Target, Sparkles } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useState } from "react";

export default function Pilot() {
  const [approved, setApproved] = useState(false);

  return (
    <div className="flex-1 container max-w-6xl mx-auto py-10 px-4">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Pilot Test Dashboard</h1>
        <p className="text-muted-foreground">Smart Dustbin + IoT Monitoring System (Phase 1)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Map & Status */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden glass-card">
            <div className="h-64 bg-muted relative flex items-center justify-center">
              {/* Fake Leaflet Map */}
              <div className="absolute inset-0 bg-[url('https://maps.wikimedia.org/osm-intl/14/11754/7641.png')] bg-cover bg-center opacity-60"></div>
              
              <div className="absolute inset-0 bg-emerald-500/10"></div>
              
              {/* Map Markers */}
              <div className="absolute top-1/4 left-1/4 h-6 w-6 bg-emerald-500 rounded-full border-4 border-white animate-pulse shadow-lg" />
              <div className="absolute top-1/3 left-1/2 h-6 w-6 bg-emerald-500 rounded-full border-4 border-white animate-pulse shadow-lg" />
              <div className="absolute top-2/3 left-1/3 h-6 w-6 bg-amber-500 rounded-full border-4 border-white shadow-lg" />
              
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur px-4 py-2 rounded-lg border border-border text-sm font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-500" />
                Live: Zone 4, Coimbatore
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4 text-center divide-x divide-border">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Households</p>
                  <p className="text-2xl font-bold mt-1">450</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Active Sensors</p>
                  <p className="text-2xl font-bold mt-1 text-emerald-500">12 / 12</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Status</p>
                  <div className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span> Running
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> Key Objectives</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  <span className="text-muted-foreground">Reduce garbage overflow complaints by 50%</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  <span className="text-muted-foreground">Optimize collection truck routing based on sensor fill-levels</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  <span className="text-muted-foreground">Increase community awareness through the citizen app</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Results & Before/After */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-1"
          >
            <div className="bg-background rounded-xl p-6 h-full flex flex-col justify-center items-center text-center">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">Impact Result</h3>
              
              <div className="flex items-center justify-center gap-6 w-full">
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-black text-destructive/80 line-through decoration-destructive/50">100</span>
                  <span className="text-xs text-muted-foreground mt-2 font-medium">BEFORE</span>
                </div>
                
                <ArrowDown className="h-8 w-8 text-emerald-500" />
                
                <div className="flex flex-col items-center">
                  <span className="text-5xl font-black text-emerald-500">30</span>
                  <span className="text-xs text-muted-foreground mt-2 font-medium">AFTER</span>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 bg-emerald-500/10 text-emerald-500 px-6 py-2 rounded-full font-bold text-lg">
                <TrendingDown className="h-5 w-5" /> 70% Improvement
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">Complaints per month</p>
            </div>
          </motion.div>

          <Card className={`glass-card transition-all duration-300 ${approved ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-primary/20 bg-primary/5'}`}>
            <CardContent className="p-6 text-center space-y-4">
              {approved ? (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-4"
                >
                  <Sparkles className="h-12 w-12 text-emerald-500 mx-auto animate-bounce" />
                  <h3 className="font-bold text-lg text-emerald-500">Approved for City-wide Scale!</h3>
                  <p className="text-sm text-muted-foreground">The project has been scaled successfully! Deployed to city-wide phase. Communication channels are open.</p>
                </motion.div>
              ) : (
                <>
                  <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
                  <h3 className="font-bold text-lg">Pilot Successful</h3>
                  <p className="text-sm text-muted-foreground">This solution has met all criteria and is recommended for city-wide scale implementation.</p>
                </>
              )}
              <Button 
                onClick={() => setApproved(true)}
                disabled={approved}
                className={`w-full mt-4 text-white ${approved ? 'bg-emerald-600 hover:bg-emerald-600' : 'bg-primary hover:bg-primary/90'}`}
              >
                {approved ? 'Scale Approved' : 'Approve for Scale'}
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
