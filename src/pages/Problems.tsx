import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, AlertCircle, Calendar, BrainCircuit, GraduationCap, School, Briefcase, Heart, Landmark, User } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useRole } from "../context/RoleContext";

interface Problem {
  id: string;
  description: string;
  location: string;
  category: string;
  expected_impact?: string;
  created_at?: string;
}

export default function Problems() {
  const { role } = useRole();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionStates, setActionStates] = useState<{ [key: string]: boolean }>({});
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/problems");
        if (res.ok) {
          const data = await res.json();
          setProblems(data.reverse());
        }
      } catch (err) {
        console.error("Failed to fetch problems from database:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const handleRoleAction = (problemId: string, actionType: string) => {
    setActionStates(prev => ({
      ...prev,
      [`${problemId}-${actionType}`]: true
    }));
  };

  // Role details for headers
  const portalBanners: { [key: string]: { title: string; desc: string; bg: string; icon: any } } = {
    Citizen: {
      title: "Citizen Portal",
      desc: "Report issues in your neighborhood, view priority scores, and track AI matches.",
      bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
      icon: <User className="w-8 h-8 shrink-0" />
    },
    Student: {
      title: "Student Innovation Portal",
      desc: "Identify local engineering challenges. Pitch tech solutions and apply for academic research credits.",
      bg: "bg-blue-500/10 border-blue-500/20 text-blue-500",
      icon: <GraduationCap className="w-8 h-8 shrink-0" />
    },
    University: {
      title: "University Research Hub",
      desc: "Review public infrastructure problems, coordinate student labs, and match with government funding grants.",
      bg: "bg-amber-500/10 border-amber-500/20 text-amber-500",
      icon: <School className="w-8 h-8 shrink-0" />
    },
    Industry: {
      title: "Industry Collaboration Center",
      desc: "Discover pilot-ready projects. Bid for smart hardware (IoT sensors) and supply chain integrations.",
      bg: "bg-purple-500/10 border-purple-500/20 text-purple-500",
      icon: <Briefcase className="w-8 h-8 shrink-0" />
    },
    NGO: {
      title: "NGO & Community Mobilization",
      desc: "Track critical hot-zones in Coimbatore. Organize volunteer drives, cleanups, and public awareness campaigns.",
      bg: "bg-rose-500/10 border-rose-500/20 text-rose-500",
      icon: <Heart className="w-8 h-8 shrink-0" />
    },
    Government: {
      title: "Government Administration Dashboard",
      desc: "Monitor urban severity ratings, allocate municipal budget reserves, and authorize large scale pilot projects.",
      bg: "bg-cyan-500/10 border-cyan-500/20 text-cyan-500",
      icon: <Landmark className="w-8 h-8 shrink-0" />
    }
  };

  const currentBanner = portalBanners[role] || portalBanners.Citizen;

  // Get unique categories from problems list
  const uniqueCategories = ["All", ...Array.from(new Set(problems.map(p => p.category)))];
  
  // Filter problems by selected category
  const filteredProblems = selectedCategory === "All" 
    ? problems 
    : problems.filter(p => p.category === selectedCategory);

  return (
    <div className="flex-1 container max-w-6xl mx-auto py-10 px-4">
      {/* Dynamic Portal Header */}
      <motion.div 
        key={role}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center gap-4 p-6 rounded-2xl border mb-10 ${currentBanner.bg}`}
      >
        {currentBanner.icon}
        <div>
          <h2 className="text-xl font-bold">{currentBanner.title}</h2>
          <p className="text-sm opacity-90 mt-1">{currentBanner.desc}</p>
        </div>
      </motion.div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reported Problems</h1>
          <p className="text-muted-foreground">List of all civic issues reported by citizens and parsed by AI.</p>
        </div>
        <Link to="/report">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Report New Problem
          </Button>
        </Link>
      </div>

      {/* Category Filter Tabs */}
      {!loading && problems.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border/40 pb-4">
          {uniqueCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all ${
                selectedCategory === category
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-border/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-muted-foreground font-medium">Loading issues list...</p>
        </div>
      ) : problems.length === 0 ? (
        <Card className="glass-card text-center py-16 border-dashed">
          <CardContent className="space-y-4">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
            <h3 className="text-xl font-semibold">No Problems Reported Yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">Be the first to report an issue in your community and let AI find solutions.</p>
            <Link to="/report" className="inline-block mt-4">
              <Button className="bg-primary hover:bg-primary/90 text-white">Get Started</Button>
            </Link>
          </CardContent>
        </Card>
      ) : filteredProblems.length === 0 ? (
        <Card className="glass-card text-center py-16 border-dashed">
          <CardContent className="space-y-4">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
            <h3 className="text-xl font-semibold">No Problems Found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">There are no reported problems under the "{selectedCategory}" category yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProblems.map((prob, idx) => (
            <motion.div
              key={prob.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full glass-card hover:border-emerald-500/30 transition-all flex flex-col justify-between overflow-hidden relative group">
                <CardContent className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-emerald-500/10 text-emerald-500 font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {prob.category}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Today
                      </span>
                    </div>

                    <h3 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {prob.description}
                    </h3>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-border/40">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-destructive/80 shrink-0" />
                      <span>{prob.location}</span>
                    </div>

                    {prob.expected_impact && (
                      <p className="text-xs bg-secondary/50 p-2.5 rounded-lg border border-border/20 text-muted-foreground italic">
                        Impact: {prob.expected_impact}
                      </p>
                    )}

                    <div className="space-y-2 pt-2">
                      <Link to={`/ai-analysis?id=${prob.id}`} className="w-full">
                        <Button className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-white border border-primary/20 transition-all text-sm font-semibold">
                          View AI Analysis <BrainCircuit className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>

                      {/* Role Specific Dynamic Actions */}
                      {role === "Student" && (
                        <Button 
                          onClick={() => handleRoleAction(prob.id, "pitch")}
                          disabled={actionStates[`${prob.id}-pitch`]}
                          className={`w-full text-xs font-semibold text-white ${actionStates[`${prob.id}-pitch`] ? 'bg-emerald-600 hover:bg-emerald-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                          {actionStates[`${prob.id}-pitch`] ? "Pitch Submitted ✓" : "Pitch Tech Solution"}
                        </Button>
                      )}

                      {role === "University" && (
                        <Button 
                          onClick={() => handleRoleAction(prob.id, "grant")}
                          disabled={actionStates[`${prob.id}-grant`]}
                          className={`w-full text-xs font-semibold text-white ${actionStates[`${prob.id}-grant`] ? 'bg-emerald-600 hover:bg-emerald-600' : 'bg-amber-600 hover:bg-amber-700'}`}
                        >
                          {actionStates[`${prob.id}-grant`] ? "Research Proposal Sent ✓" : "Request Research Grant"}
                        </Button>
                      )}

                      {role === "Industry" && (
                        <Button 
                          onClick={() => handleRoleAction(prob.id, "bid")}
                          disabled={actionStates[`${prob.id}-bid`]}
                          className={`w-full text-xs font-semibold text-white ${actionStates[`${prob.id}-bid`] ? 'bg-emerald-600 hover:bg-emerald-600' : 'bg-purple-600 hover:bg-purple-700'}`}
                        >
                          {actionStates[`${prob.id}-bid`] ? "Bid Submitted ✓" : "Bid for Implementation"}
                        </Button>
                      )}

                      {role === "NGO" && (
                        <Button 
                          onClick={() => handleRoleAction(prob.id, "ngo")}
                          disabled={actionStates[`${prob.id}-ngo`]}
                          className={`w-full text-xs font-semibold text-white ${actionStates[`${prob.id}-ngo`] ? 'bg-emerald-600 hover:bg-emerald-600' : 'bg-rose-600 hover:bg-rose-700'}`}
                        >
                          {actionStates[`${prob.id}-ngo`] ? "Campaign Scheduled ✓" : "Organize Volunteer Drive"}
                        </Button>
                      )}

                      {role === "Government" && (
                        <Button 
                          onClick={() => handleRoleAction(prob.id, "gov")}
                          disabled={actionStates[`${prob.id}-gov`]}
                          className={`w-full text-xs font-semibold text-white ${actionStates[`${prob.id}-gov`] ? 'bg-emerald-600 hover:bg-emerald-600' : 'bg-cyan-600 hover:bg-cyan-700'}`}
                        >
                          {actionStates[`${prob.id}-gov`] ? "Pilot Approved ✓" : "Authorize Pilot Budget"}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
