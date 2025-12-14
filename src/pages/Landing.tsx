import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  BarChart3, 
  Bell, 
  Layers, 
  ArrowRight, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const features = [
  {
    icon: Layers,
    title: "Visual Pipeline",
    description: "Track every application through customizable stages with drag-and-drop simplicity."
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "Understand your application success rate with real-time insights and trends."
  },
  {
    icon: Bell,
    title: "Follow-up Reminders",
    description: "Never miss a deadline with intelligent follow-up notifications."
  },
  {
    icon: Sparkles,
    title: "AI-Ready",
    description: "Built for the future with AI-powered insights and recommendations."
  }
];

const benefits = [
  "Track unlimited applications",
  "Visual Kanban pipeline",
  "Smart follow-up reminders",
  "Application analytics",
  "Export your data anytime",
  "Dark mode by default"
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">ApplyFlow</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/auth">Sign in</Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/auth?mode=signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/50 mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">AI-Ready Job Tracking</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Track applications
              <br />
              <span className="gradient-text">like a professional</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              The modern applicant tracking system for ambitious developers. 
              Stop losing track of opportunities. Start landing more offers.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/auth?mode=signup">
                  Start Tracking Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <Link to="/auth">Sign in to Dashboard</Link>
              </Button>
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-20 relative"
          >
            <div className="glass rounded-2xl border border-border/50 p-2 shadow-2xl">
              <div className="rounded-xl bg-card overflow-hidden">
                <div className="bg-secondary/50 px-4 py-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-status-interview/60" />
                  <div className="w-3 h-3 rounded-full bg-status-offer/60" />
                </div>
                <div className="p-6 grid grid-cols-4 gap-4">
                  {['Applied', 'OA', 'Interview', 'Offer'].map((stage, i) => (
                    <div key={stage} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          i === 0 ? 'bg-primary' : 
                          i === 1 ? 'bg-accent' : 
                          i === 2 ? 'bg-status-interview' : 
                          'bg-status-offer'
                        }`} />
                        <span className="text-sm font-medium text-foreground">{stage}</span>
                      </div>
                      {[1, 2, 3].slice(0, 3 - i).map((_, j) => (
                        <div key={j} className="glass rounded-lg p-3 space-y-2">
                          <div className="h-3 bg-muted rounded w-3/4" />
                          <div className="h-2 bg-muted/50 rounded w-1/2" />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary/20 via-transparent to-transparent blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need to land your dream role
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for serious job seekers who want clarity and control over their application process.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-6 hover:bg-card/80 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Stop using spreadsheets.
                <br />
                <span className="text-muted-foreground">Start using ApplyFlow.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of developers who've upgraded from chaotic spreadsheets 
                to a purpose-built application tracking system.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-status-offer flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Applications</span>
                  <span className="text-3xl font-bold text-foreground">47</span>
                </div>
                <div className="h-px bg-border" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-secondary/50">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-muted-foreground">Interviews</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-secondary/50">
                    <div className="text-2xl font-bold text-status-offer">3</div>
                    <div className="text-sm text-muted-foreground">Offers</div>
                  </div>
                </div>
                <div className="h-px bg-border" />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Success Rate</span>
                  <span className="text-xl font-bold text-status-offer">6.4%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[128px]" />
        </div>

        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Ready to take control of your job search?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Join ApplyFlow today and start tracking your applications like a pro.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/auth?mode=signup">
                Get Started — It's Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">ApplyFlow</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 ApplyFlow. Built for ambitious developers.
          </p>
        </div>
      </footer>
    </div>
  );
}
