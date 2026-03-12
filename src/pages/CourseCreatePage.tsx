import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useStore } from "../store/useStore"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Label } from "../components/ui/Label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/Accordion"
import { Sparkles, Loader2, Video, FileText, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

export default function CourseCreatePage() {
    const navigate = useNavigate()
    const { addCourse } = useStore()

    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    // Step 1 Form Data
    const [title, setTitle] = useState("")
    const [topic, setTopic] = useState("")
    const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner")

    // Generated Layout Data (Mock)
    const [layout, setLayout] = useState<any>(null)

    const handleGenerateLayout = () => {
        if (!title || !topic) {
            toast.error("Please fill in course title and topic.")
            return
        }

        setIsLoading(true)
        // Simulate AI Generation Delay
        setTimeout(() => {
            setLayout({
                chapters: [
                    {
                        id: "ch-1",
                        title: `Introduction to ${topic}`,
                        topics: [
                            { id: "t-1", title: `What is ${topic}?`, videos: [] },
                            { id: "t-2", title: `Setting up your environment`, videos: [] }
                        ]
                    },
                    {
                        id: "ch-2",
                        title: `Core Concepts of ${topic}`,
                        topics: [
                            { id: "t-3", title: `Basic Principles`, videos: [] },
                            { id: "t-4", title: `Advanced Techniques`, videos: [] }
                        ]
                    }
                ]
            })
            setIsLoading(false)
            setStep(2)
            toast.success("AI layout generated successfully!")
        }, 2000)
    }

    const handlePublish = () => {
        setIsLoading(true)
        setTimeout(() => {
            const newCourseId = `c-${Date.now()}`
            addCourse({
                id: newCourseId,
                title,
                description: `An engaging AI-generated course about ${topic}.`,
                level,
                creatorId: "user-1", // mock current user
                creatorName: "You",
                bannerUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
                isPublished: true,
                layout
            })
            setIsLoading(false)
            toast.success("Course published successfully!")
            navigate("/dashboard")
        }, 1500)
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            {/* Stepper Header */}
            <div className="mb-12">
                <h1 className="text-3xl font-extrabold mb-4">Create AI Course</h1>
                <div className="flex items-center w-full max-w-2xl">
                    {[1, 2, 3].map((i) => (
                        <React.Fragment key={i}>
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold relative z-10 transition-colors ${step >= i ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground"
                                    }`}
                            >
                                {step > i ? <CheckCircle2 className="h-5 w-5" /> : i}
                            </div>
                            {i < 3 && (
                                <div
                                    className={`flex-1 h-1 -mx-2 z-0 transition-colors ${step > i ? "bg-primary" : "bg-muted"
                                        }`}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <div className="flex justify-between w-full max-w-2xl mt-2 text-sm text-muted-foreground px-1">
                    <span>Details</span>
                    <span>Layout</span>
                    <span>Publish</span>
                </div>
            </div>

            {/* Step Content */}
            <div className="bg-card border rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden">

                {/* Step 1: Details */}
                {step === 1 && (
                    <div className="space-y-6 animate-in slide-in-from-right-8 fade-in">
                        <div className="space-y-2">
                            <Label htmlFor="title">Course Title</Label>
                            <Input
                                id="title"
                                placeholder="e.g. Fullstack Web Development in 2024"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="topic">Primary Topic (for AI prompt)</Label>
                            <Input
                                id="topic"
                                placeholder="e.g. React Native, TypeScript, Python"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2 pb-4">
                            <Label>Difficulty Level</Label>
                            <div className="flex gap-4">
                                {["beginner", "intermediate", "advanced"].map((lvl) => (
                                    <Button
                                        key={lvl}
                                        type="button"
                                        variant={level === lvl ? "default" : "outline"}
                                        className="flex-1 capitalize"
                                        onClick={() => setLevel(lvl as any)}
                                    >
                                        {lvl}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t">
                            <Button disabled={isLoading || !title || !topic} onClick={handleGenerateLayout} className="gap-2">
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                                Generate Course Layout
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 2: Layout Configuration */}
                {step === 2 && (
                    <div className="space-y-6 animate-in slide-in-from-right-8 fade-in">
                        <div className="flex justify-between items-center mb-6 border-b pb-4">
                            <div>
                                <h3 className="font-bold text-lg text-primary flex items-center gap-2">
                                    <FileText className="h-5 w-5" /> Generated Layout Structure
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">Review the AI-generated chapters prior to adding video content.</p>
                            </div>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                            {layout?.chapters?.map((chapter: any, chapterIdx: number) => (
                                <AccordionItem value={`item-${chapterIdx}`} key={chapter.id}>
                                    <AccordionTrigger className="font-semibold text-lg">{chapter.title}</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-3 pl-4 pt-2 border-l-2 ml-2 mb-4">
                                            {chapter.topics.map((t: any) => (
                                                <div key={t.id} className="flex items-center justify-between bg-muted/50 p-3 rounded-lg border">
                                                    <span className="font-medium text-sm">{t.title}</span>
                                                    <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground gap-1 hover:text-primary">
                                                        <Video className="h-3 w-3" /> Connect Video
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>

                        <div className="flex justify-between pt-6 border-t mt-8">
                            <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                            <Button onClick={() => setStep(3)}>Proceed to Finalize & Publish</Button>
                        </div>
                    </div>
                )}

                {/* Step 3: Publish */}
                {step === 3 && (
                    <div className="space-y-8 animate-in slide-in-from-right-8 fade-in text-center py-8">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Sparkles className="h-10 w-10 text-primary" />
                        </div>
                        <h2 className="text-3xl font-extrabold">Ready to Publish!</h2>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            Your course "{title}" is fully configured. We will generate the banner image and remaining markdown content in the background unpon publishing.
                        </p>

                        <div className="flex justify-center gap-4 pt-8">
                            <Button variant="outline" onClick={() => setStep(2)}>Review Layout</Button>
                            <Button size="lg" disabled={isLoading} onClick={handlePublish} className="gap-2">
                                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                                Publish Course Now
                            </Button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
