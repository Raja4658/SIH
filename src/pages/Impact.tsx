import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts";
import { ArrowUpRight, TrendingUp, Users2, Building2, Map, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const impactData = [
  { month: 'Jan', problems: 120, solved: 20 },
  { month: 'Feb', problems: 250, solved: 80 },
  { month: 'Mar', problems: 400, solved: 150 },
  { month: 'Apr', problems: 550, solved: 300 },
  { month: 'May', problems: 800, solved: 480 },
  { month: 'Jun', problems: 1200, solved: 850 },
];

const categoryData = [
  { name: 'Waste', count: 400 },
  { name: 'Water', count: 300 },
  { name: 'Traffic', count: 200 },
  { name: 'Safety', count: 150 },
  { name: 'Education', count: 100 },
];

export default function Impact() {
  return (
    <div className="flex-1 p-6 md:p-10 container max-w-7xl mx-auto space-y-8">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">Measure What Changed.</h1>
          <p className="text-lg text-muted-foreground">Platform-wide societal impact and resolution metrics.</p>
        </div>
        <div className="bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-lg font-bold flex items-center gap-2 border border-emerald-500/20">
          <TrendingUp className="w-5 h-5" /> Live Data
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Citizens Impacted", value: "2.4M", icon: <Users2 className="w-5 h-5 text-blue-500" />, trend: "+12%" },
          { title: "Solutions Scaled", value: "850+", icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />, trend: "+24%" },
          { title: "Active Collaborations", value: "1,200", icon: <Building2 className="w-5 h-5 text-amber-500" />, trend: "+8%" },
          { title: "Cities Covered", value: "45", icon: <Map className="w-5 h-5 text-cyan-500" />, trend: "+5" },
        ].map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                {kpi.icon}
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{kpi.value}</div>
                <p className="text-xs text-emerald-500 flex items-center mt-1 font-medium">
                  <ArrowUpRight className="w-3 h-3 mr-1" /> {kpi.trend} this month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Growth Chart */}
        <Card className="lg:col-span-2 glass-card">
          <CardHeader>
            <CardTitle>Platform Adoption & Resolution Rate</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={impactData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProblems" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area type="monotone" dataKey="problems" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorProblems)" name="Problems Reported" />
                <Area type="monotone" dataKey="solved" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorSolved)" name="Solutions Scaled" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Problems by Category</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
