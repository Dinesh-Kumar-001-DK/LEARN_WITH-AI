import { Link, useLocation } from "react-router-dom"
import { Sparkles, Menu, UserCircle } from "lucide-react"
import { Button } from "../ui/Button"

export default function Navbar() {
    const location = useLocation()
    const isAuthPage = location.pathname === "/login" || location.pathname === "/signup"

    // Mock auth state for frontend-only build
    const isSignedIn = true

    if (isAuthPage) return null

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                        <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:inline-block">
                        LearnAI
                    </span>
                </Link>
                <nav className="hidden md:flex items-center space-x-6">
                    <Link to="/courses" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                        Explore Courses
                    </Link>
                    {isSignedIn && (
                        <Link to="/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                            Dashboard
                        </Link>
                    )}
                </nav>
                <div className="flex items-center space-x-4">
                    {isSignedIn ? (
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" asChild className="rounded-full">
                                <Link to="/profile"><UserCircle className="h-6 w-6 text-muted-foreground" /></Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="hidden sm:flex space-x-2">
                            <Button variant="ghost" asChild>
                                <Link to="/login">Sign In</Link>
                            </Button>
                            <Button asChild>
                                <Link to="/signup">Get Started</Link>
                            </Button>
                        </div>
                    )}
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    )
}
