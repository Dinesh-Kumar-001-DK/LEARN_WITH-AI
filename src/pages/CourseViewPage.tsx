import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import ReactPlayer from "react-player"
import { useStore } from "../store/useStore"
import { Button } from "../components/ui/Button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/Accordion"
import { Progress } from "../components/ui/Progress"
import { CheckCircle2, Circle, ChevronLeft, ArrowRight } from "lucide-react"

export default function CourseViewPage() {
    const { courseId } = useParams()
    const navigate = useNavigate()
    const { courses, enrollments, enroll, updateProgress } = useStore()

    const course = courses.find(c => c.id === courseId)
    const enrollment = enrollments.find(e => e.courseId === courseId)

    const [activeVideoIndex, setActiveVideoIndex] = useState(0)

    if (!course) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Course not found</h2>
                <Button onClick={() => navigate("/courses")}>Back to Courses</Button>
            </div>
        )
    }

    // Get total chapters/topics
    const allTopics = course.layout?.chapters?.flatMap((ch: any) => ch.topics) || []
    const currentTopic = allTopics[activeVideoIndex] || null

    // Calculate Progress
    const completedCount = enrollment ? enrollment.progress.completedChapters.length : 0
    const progressPercent = allTopics.length > 0 ? Math.round((completedCount / allTopics.length) * 100) : 0

    const handleEnroll = () => {
        if (!enrollment && courseId) {
            enroll(courseId)
        }
    }

    const handleMarkComplete = (topicId: string) => {
        if (!enrollment && courseId) handleEnroll()
        if (courseId) {
            updateProgress(courseId, topicId)
        }
    }

    if (!enrollment) {
        return (
            <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
                <div className="bg-card border rounded-2xl p-12 shadow-sm">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="h-12 w-12 text-primary" />
                    </div>
                    <h1 className="text-3xl font-extrabold mb-4">{course.title}</h1>
                    <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                        {course.description}
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button variant="outline" onClick={() => navigate(-1)}><ChevronLeft className="mr-2 h-4 w-4" /> Back</Button>
                        <Button size="lg" onClick={handleEnroll} className="gap-2">
                            Enroll for Free <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col md:flex-row flex-1 h-[calc(100vh-4rem)]">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-80 border-r bg-muted/30 flex flex-col overflow-y-auto">
                <div className="p-4 border-b bg-background sticky top-0 z-10">
                    <Button variant="ghost" size="sm" className="mb-4 -ml-2 text-muted-foreground hover:text-foreground" onClick={() => navigate("/dashboard")}>
                        <ChevronLeft className="mr-1 h-4 w-4" /> Back to Dashboard
                    </Button>
                    <h2 className="font-bold text-lg mb-2">{course.title}</h2>
                    <div className="flex items-center justify-between text-sm mb-2 text-muted-foreground">
                        <span>{progressPercent}% Complete</span>
                        <span>{completedCount}/{allTopics.length} Steps</span>
                    </div>
                    <Progress value={progressPercent} className="h-2" />
                </div>

                <div className="p-4 flex-1">
                    <Accordion type="multiple" className="w-full" defaultValue={course.layout?.chapters?.map((_: any, i: number) => `ch-${i}`)}>
                        {course.layout?.chapters?.map((chapter: any, chapterIdx: number) => (
                            <AccordionItem value={`ch-${chapterIdx}`} key={chapter.id || chapterIdx}>
                                <AccordionTrigger className="text-left font-semibold py-3 hover:no-underline hover:text-primary">
                                    {chapter.title}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col space-y-1 mt-1">
                                        {chapter.topics.map((topic: any, topicIdx: number) => {
                                            const isCompleted = enrollment.progress.completedChapters.includes(topic.id)
                                            const globalIndex = course.layout.chapters
                                                .slice(0, chapterIdx)
                                                .reduce((acc: number, ch: any) => acc + ch.topics.length, 0) + topicIdx

                                            const isActive = activeVideoIndex === globalIndex

                                            return (
                                                <button
                                                    key={topic.id}
                                                    onClick={() => setActiveVideoIndex(globalIndex)}
                                                    className={`flex items-start text-left p-2 rounded-md transition-colors ${isActive ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                                                        }`}
                                                >
                                                    <div
                                                        className="mt-0.5 mr-3 shrink-0"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleMarkComplete(topic.id)
                                                        }}
                                                    >
                                                        {isCompleted ? (
                                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                        ) : (
                                                            <Circle className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                                                        )}
                                                    </div>
                                                    <span className="text-sm line-clamp-2">{topic.title}</span>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto bg-background flex flex-col">
                {currentTopic ? (
                    <div className="max-w-4xl mx-auto w-full p-6 lg:p-10 flex flex-col h-full">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold mb-2">{currentTopic.title}</h1>
                            {/* Simulated AI text content */}
                            <p className="text-muted-foreground text-sm">
                                This topic covers core concepts around {currentTopic.title.toLowerCase()}. Watch the curated video below and review the generated notes.
                            </p>
                        </div>

                        {/* Video Player Area */}
                        <div className="aspect-video bg-black/95 rounded-2xl overflow-hidden shadow-lg border relative flex-shrink-0 group">
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all">
                                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-2"></div>
                                </div>
                            </div>
                            {currentTopic.videos && currentTopic.videos.length > 0 ? (
                                <ReactPlayer
                                    url={currentTopic.videos[0].url}
                                    width="100%"
                                    height="100%"
                                    controls
                                    playing={false}
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-white/50 p-6 text-center">
                                    <p>Demo Video Placeholder for {currentTopic.title}</p>
                                    <p className="text-sm mt-2">In the real app, this will render a YouTube embed via React Player.</p>
                                </div>
                            )}
                        </div>

                        {/* Generated Content Area */}
                        <div className="mt-10 flex-1 prose prose-slate dark:prose-invert max-w-none pb-20">
                            <h3>AI Generated Notes</h3>
                            <p>
                                To master <strong>{currentTopic.title}</strong>, it is essential to understand the underlying principles. Here are some key takeaways:
                            </p>
                            <ul>
                                <li>Concept 1: Core definition and rationale.</li>
                                <li>Concept 2: Real-world applications and use cases.</li>
                                <li>Concept 3: Common pitfalls and best practices.</li>
                            </ul>
                            <div className="bg-muted p-4 rounded-lg my-6 border">
                                <p className="text-sm m-0 italic">"AI generated content provides customized learning pathways tailored to your proficiency level."</p>
                            </div>

                            <div className="flex justify-between items-center mt-12 pt-6 border-t">
                                <Button
                                    variant="outline"
                                    disabled={activeVideoIndex === 0}
                                    onClick={() => setActiveVideoIndex(prev => prev - 1)}
                                >
                                    Previous Topic
                                </Button>
                                <Button
                                    onClick={() => {
                                        handleMarkComplete(currentTopic.id)
                                        if (activeVideoIndex < allTopics.length - 1) {
                                            setActiveVideoIndex(prev => prev + 1)
                                        }
                                    }}
                                >
                                    {activeVideoIndex < allTopics.length - 1 ? 'Mark Complete & Next' : 'Finish Course'}
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground p-12">
                        No content available for this course yet.
                    </div>
                )}
            </main>
        </div>
    )
}
