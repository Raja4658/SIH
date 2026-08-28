import { motion } from "framer-motion";
import { ArrowRight, Globe2, Lightbulb, Link2, Sprout, Building, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 pb-32">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-40 -right-40 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container relative z-10 px-4 md:px-8 max-w-screen-xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-3xl space-y-8"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium border border-border">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>AI-Powered Civic Innovation</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight">
              Real Problems. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Right People.</span> <br/>
              Smarter Solutions.
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl text-muted-foreground leading-relaxed">
              SolveTogether AI connects citizens with universities, industry, NGOs, and government to transform real-world problems into measurable societal solutions.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/problems">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-[0_0_20px_rgba(5,150,105,0.4)] transition-all">
                  Report a Problem <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/solutions">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full glass hover:bg-white/5 transition-all">
                  Explore Solutions
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Ecosystem Visualization */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 container max-w-5xl mx-auto relative hidden md:block"
        >
           <div className="flex justify-between items-center relative py-12">
             {/* Connection Line */}
             <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500/20 via-cyan-500/50 to-emerald-500/20 top-1/2 -translate-y-1/2 z-0" />
             
             {[
               { icon: <Users />, label: "Citizens", delay: 0.6 },
               { icon: <Lightbulb />, label: "Universities", delay: 0.8 },
               { icon: <Building />, label: "Industry", delay: 1.0 },
               { icon: <Globe2 />, label: "NGOs", delay: 1.2 },
               { icon: <Sprout />, label: "Government", delay: 1.4 }
             ].map((node, i) => (
               <motion.div 
                 key={i}
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: node.delay, duration: 0.5 }}
                 className="z-10 flex flex-col items-center group"
               >
                 <div className="h-20 w-20 rounded-2xl glass-card flex items-center justify-center text-primary group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent" />
                   {node.icon}
                 </div>
                 <span className="mt-4 font-semibold text-sm tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">{node.label}</span>
               </motion.div>
             ))}
           </div>
        </motion.div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-card relative z-10 border-t border-border/50">
        <div className="container px-4 md:px-8 max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How SolveTogether AI Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">From real-world problem to measurable impact, driven by collaborative intelligence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { num: "01", title: "Problem Submission", desc: "Citizens report issues with photos and location data." },
              { num: "02", title: "AI Intelligence", desc: "NLP classifies the problem and calculates priority." },
              { num: "03", title: "Smart Match", desc: "Engine matches universities and industry partners." },
              { num: "04", title: "Solution & Pilot", desc: "Teams collaborate to build and test prototypes." },
              { num: "05", title: "Measure Impact", desc: "Real-time metrics track improvement and scale." },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card rounded-2xl p-6 relative overflow-hidden group"
              >
                <div className="absolute -right-4 -top-4 text-7xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
                  {step.num}
                </div>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold mb-6">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                
                {/* AI Indicator */}
                {idx === 1 || idx === 2 ? (
                  <div className="mt-4 flex items-center text-xs text-emerald-400 bg-emerald-400/10 w-fit px-2 py-1 rounded">
                    <Lightbulb className="w-3 h-3 mr-1" /> AI Powered
                  </div>
                ) : null}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
