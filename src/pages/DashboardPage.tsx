import { Link } from "react-router-dom"
import { useStore } from "../store/useStore"
import { Button } from "../components/ui/Button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs"
import { Progress } from "../components/ui/Progress"
import { Book, PlayCircle } from "lucide-react"

export default function DashboardPage() {
    const { courses, enrollments, role } = useStore()

    const myEnrollments = enrollments.map(e => ({
        ...e,
        course: courses.find(c => c.id === e.courseId)!
    })).filter(e => e.course)

    return (
        <div className="container mx-auto px-4 py-8 flex-1 max-w-6xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground mt-1 text-sm">Welcome back to your AI learning space.</p>
                </div>
                {role === "creator" && (
                    <Button asChild className="rounded-full shadow-sm">
                        <Link to="/dashboard/create">Create New Course</Link>
                    </Button>
                )}
            </div>

            <Tabs defaultValue="enrolled" className="w-full">
                <TabsList className="mb-6 bg-transparent p-0 border-b w-full justify-start rounded-none h-auto">
                    <TabsTrigger
                        value="enrolled"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2 font-semibold"
                    >
                        My Learning
                    </TabsTrigger>
                    {role === "creator" && (
                        <TabsTrigger
                            value="created"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2 font-semibold"
                        >
                            Created Courses
                        </TabsTrigger>
                    )}
                </TabsList>

                <TabsContent value="enrolled" className="mt-0 outline-none">
                    {myEnrollments.length === 0 ? (
                        <div className="border border-dashed rounded-xl p-12 text-center bg-card shadow-sm">
                            <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <Book className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Start your learning journey</h3>
                            <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
                                You haven't enrolled in any courses yet. Explore our AI-generated catalog and find something exciting to learn today!
                            </p>
                            <Button asChild className="rounded-full">
                                <Link to="/courses">Browse Free Courses</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myEnrollments.map((enrollment) => {
                                const totalChapters = enrollment.course.layout?.chapters?.length || 1
                                const completed = enrollment.progress.completedChapters.length
                                const percent = Math.round((completed / totalChapters) * 100)

                                return (
                                    <div key={enrollment.courseId} className="bg-card border rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                                        <div className="h-32 bg-muted relative overflow-hidden">
                                            {enrollment.course.bannerUrl && (
                                                <img
                                                    src={enrollment.course.bannerUrl}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                                <span className="text-white text-sm font-medium shadow-sm">{percent}% Completed</span>
                                            </div>
                                        </div>
                                        <div className="p-5 flex flex-col flex-1">
                                            <h3 className="font-bold mb-1 line-clamp-1">{enrollment.course.title}</h3>
                                            <p className="text-xs text-muted-foreground mb-4">Enrolled on {new Date(enrollment.enrolledAt).toLocaleDateString()}</p>

                                            <Progress value={percent} className="mb-5 h-2" />

                                            <div className="mt-auto">
                                                <Button variant="secondary" size="sm" asChild className="w-full gap-2 text-primary">
                                                    <Link to={`/courses/${enrollment.courseId}`}>
                                                        <PlayCircle className="h-4 w-4" /> Pick up where you left off
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </TabsContent>

                {role === "creator" && (
                    <TabsContent value="created" className="mt-0 outline-none">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.filter(c => c.creatorId === 'user-1').map((course) => (
                                <div key={course.id} className="bg-card border rounded-2xl p-5 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-bold text-lg line-clamp-1 flex-1">{course.title}</h3>
                                        <div className={`text-xs ml-3 px-2 py-0.5 rounded-full border ${course.isPublished ? "bg-green-500/10 text-green-600 border-green-200" : "bg-yellow-500/10 text-yellow-600 border-yellow-200"}`}>
                                            {course.isPublished ? 'Live' : 'Draft'}
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-6 flex-1">
                                        {course.description}
                                    </p>
                                    <div className="flex gap-2 mt-auto">
                                        <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                                        <Button size="sm" variant={course.isPublished ? "secondary" : "default"} className="flex-1">
                                            {course.isPublished ? 'Unpublish' : 'Publish'}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                )}
            </Tabs>
        </div>
    )
}
