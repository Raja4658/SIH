import { motion } from "framer-motion";
import { MessageSquare, Paperclip, CheckSquare, Plus, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Link } from "react-router-dom";

export default function Collaboration() {
  return (
    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden border-t border-border/50">
      
      {/* Left Sidebar: Navigation & Team */}
      <div className="w-full md:w-64 bg-card/30 border-r border-border/50 p-4 flex flex-col gap-6 hidden md:flex">
        <div>
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">Project</h3>
          <p className="font-bold text-sm">Smart Bin IoT System</p>
          <p className="text-xs text-muted-foreground mt-1">Location: Coimbatore</p>
        </div>
        
        <div>
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">Team Members</h3>
          <div className="space-y-3">
            {[
              { name: "Dr. Ramesh", role: "University Prof.", color: "bg-amber-500" },
              { name: "Priya S.", role: "IoT Engineer", color: "bg-blue-500" },
              { name: "Rahul K.", role: "Student Lead", color: "bg-emerald-500" },
              { name: "NGO Admin", role: "Community", color: "bg-purple-500" }
            ].map((member, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-full ${member.color} flex items-center justify-center text-white font-bold text-xs`}>
                  {member.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Center: Activity & Chat */}
      <div className="flex-1 flex flex-col bg-background/50 relative">
        <div className="p-4 border-b border-border/50 bg-card/20 backdrop-blur-md flex justify-between items-center">
          <h2 className="font-bold">Team Workspace</h2>
          <Link to="/pilot">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">Approve for Pilot Phase</Button>
          </Link>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="flex justify-center">
            <span className="text-xs bg-secondary px-3 py-1 rounded-full text-muted-foreground">Workspace Created - Today</span>
          </div>
          
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
            <div className="h-8 w-8 rounded-full bg-emerald-500 shrink-0 mt-1" />
            <div className="bg-card border border-border p-3 rounded-2xl rounded-tl-sm text-sm max-w-[80%]">
              <p className="font-semibold mb-1 text-emerald-500">System <span className="text-muted-foreground font-normal text-xs ml-2">10:00 AM</span></p>
              <p>Team formed successfully based on AI recommendations. The goal is to develop an IoT solution for waste management in the affected area.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex gap-4">
            <div className="h-8 w-8 rounded-full bg-amber-500 shrink-0 mt-1 flex items-center justify-center text-white text-xs font-bold">R</div>
            <div className="bg-card border border-border p-3 rounded-2xl rounded-tl-sm text-sm max-w-[80%]">
              <p className="font-semibold mb-1">Dr. Ramesh <span className="text-muted-foreground font-normal text-xs ml-2">10:15 AM</span></p>
              <p>Hello team! My students have already started designing the sensor module. We need the IoT partner to verify the cloud architecture.</p>
              <div className="mt-2 flex items-center gap-2 bg-secondary p-2 rounded-lg w-fit border border-border">
                <Paperclip className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs">sensor_schematic_v1.pdf</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="flex gap-4">
            <div className="h-8 w-8 rounded-full bg-blue-500 shrink-0 mt-1 flex items-center justify-center text-white text-xs font-bold">P</div>
            <div className="bg-card border border-border p-3 rounded-2xl rounded-tl-sm text-sm max-w-[80%]">
              <p className="font-semibold mb-1">Priya S. <span className="text-muted-foreground font-normal text-xs ml-2">10:30 AM</span></p>
              <p>Checking it right now. The architecture looks solid. I will upload the cloud provisioning scripts shortly.</p>
            </div>
          </motion.div>
        </div>

        <div className="p-4 bg-card/50 border-t border-border/50 backdrop-blur-md">
          <div className="relative">
            <input type="text" placeholder="Type a message..." className="w-full bg-background border border-border rounded-full pl-4 pr-12 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" />
            <Button size="icon" variant="ghost" className="absolute right-1 top-1 text-muted-foreground hover:text-primary">
              <MessageSquare className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Sidebar: Tasks & Milestones */}
      <div className="w-full md:w-80 bg-card/30 border-l border-border/50 p-4 flex flex-col gap-6 hidden lg:flex">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Project Tasks</h3>
          <Button size="icon" variant="ghost" className="h-6 w-6"><Plus className="h-4 w-4" /></Button>
        </div>
        
        <div className="space-y-3">
          {[
            { title: "Design sensor schematics", done: true },
            { title: "Review cloud architecture", done: true },
            { title: "Develop prototype software", done: false },
            { title: "Procure hardware components", done: false }
          ].map((task, i) => (
            <Card key={i} className={`bg-card/50 ${task.done ? "opacity-60" : ""}`}>
              <CardContent className="p-3 flex items-start gap-3">
                {task.done ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <CheckSquare className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                )}
                <p className={`text-sm ${task.done ? "line-through text-muted-foreground" : "font-medium"}`}>{task.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">Project Health</h3>
          <div className="glass-card p-4 rounded-xl">
            <div className="flex justify-between text-sm mb-2">
              <span>Prototype Readiness</span>
              <span className="font-bold text-emerald-400">85%</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[85%]" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
