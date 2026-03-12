import { Link } from "react-router-dom"
import { Sparkles, Github, Twitter } from "lucide-react"

export default function Footer() {
    return (
        <footer className="border-t bg-muted/20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            <div className="bg-primary/10 p-1.5 rounded-lg">
                                <Sparkles className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-bold text-lg tracking-tight">LearnAI</span>
                        </Link>
                        <p className="text-muted-foreground text-sm max-w-sm mb-6">
                            The first truly intelligent online learning platform. Generate courses on any topic, track your progress, and learn efficiently for free.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Platform</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link to="/courses" className="hover:text-foreground transition-colors">Browse Courses</Link></li>
                            <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Creator Dashboard</Link></li>
                            <li><Link to="/dashboard/create" className="hover:text-foreground transition-colors">AI Generator</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Legal</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} LearnAI Platform. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
