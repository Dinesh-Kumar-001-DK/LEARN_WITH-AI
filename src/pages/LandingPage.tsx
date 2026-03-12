import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Brain, Sparkles, Target, Zap } from "lucide-react"

export default function LandingPage() {
    return (
        <div className="flex flex-col flex-1">
            {/* Hero Section */}
            <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-b from-background to-muted/50">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-6">
                    <Sparkles className="h-4 w-4 mr-2 text-primary" />
                    AI-Powered Learning
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl mb-6">
                    Build & Learn with <span className="text-primary">AI</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mb-10">
                    The first truly intelligent online learning platform. Generate courses on any topic, track your progress, and learn efficiently for free.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" asChild className="gap-2">
                        <Link to="/signup">Get Started Free <Zap className="h-4 w-4" /></Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link to="/courses">Browse Courses</Link>
                    </Button>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-background container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-16">Why LearnAI?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                            <Brain className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">AI Generation</h3>
                        <p className="text-muted-foreground">Instantly generate structured course layouts and tailored content using advanced AI models.</p>
                    </div>
                    <div className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                            <Target className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Progress Tracking</h3>
                        <p className="text-muted-foreground">Stay motivated with visual progress bars and milestone tracking for every course.</p>
                    </div>
                    <div className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                            <Zap className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Free Access</h3>
                        <p className="text-muted-foreground">Knowledge should be free. Enjoy all of our core AI tools and course content at no cost.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
