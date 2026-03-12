import { useState } from "react"
import { useStore } from "../store/useStore"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Label } from "../components/ui/Label"
import { User, Book, Settings, LogOut } from "lucide-react"

export default function ProfilePage() {
    const { role, setRole, enrollments, courses } = useStore()
    const [name, setName] = useState("Demo User")

    const createdCount = courses.filter(c => c.creatorId === "user-1").length

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl flex-1">
            <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

            <div className="grid md:grid-cols-3 gap-8">

                {/* Sidebar Settings Navigation */}
                <div className="space-y-2">
                    <Button variant="secondary" className="w-full justify-start font-medium">
                        <User className="mr-2 h-4 w-4" /> Account Details
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                        <Settings className="mr-2 h-4 w-4" /> Preferences
                    </Button>
                </div>

                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">

                    <div className="bg-card border rounded-2xl p-6 shadow-sm">
                        <h3 className="text-xl font-bold mb-4">Personal Information</h3>
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold">
                                {name.charAt(0)}
                            </div>
                            <Button variant="outline" size="sm">Change Avatar</Button>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Display Name</Label>
                                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" value="demo@example.com" disabled />
                                <p className="text-xs text-muted-foreground">Connected via Clerk Auth</p>
                            </div>
                        </div>
                        <Button className="mt-6">Save Changes</Button>
                    </div>

                    <div className="bg-card border rounded-2xl p-6 shadow-sm">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            Role & Permissions
                        </h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            Toggle your role to experience the platform as a Creator or Learner.
                        </p>

                        <div className="flex bg-muted p-1 rounded-lg w-fit mb-6">
                            <button
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${role === 'learner' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                                onClick={() => setRole('learner')}
                            >
                                Learner Mode
                            </button>
                            <button
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${role === 'creator' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                                onClick={() => setRole('creator')}
                            >
                                Creator Mode
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="border rounded-xl p-4 flex flex-col items-center justify-center text-center bg-accent/30">
                                <span className="text-3xl font-extrabold text-primary mb-1">{enrollments.length}</span>
                                <span className="text-sm font-medium text-muted-foreground flex items-center gap-1"><Book className="h-3 w-3" /> Enrolled Courses</span>
                            </div>
                            <div className="border rounded-xl p-4 flex flex-col items-center justify-center text-center bg-accent/30">
                                <span className="text-3xl font-extrabold text-primary mb-1">{createdCount}</span>
                                <span className="text-sm font-medium text-muted-foreground flex items-center gap-1"><Book className="h-3 w-3" /> Created Courses</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button variant="destructive" variant-style="outline" className="gap-2">
                            <LogOut className="h-4 w-4" /> Sign Out
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    )
}
