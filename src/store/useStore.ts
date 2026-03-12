import { create } from "zustand"

export type UserRole = "learner" | "creator"
export type CourseLevel = "beginner" | "intermediate" | "advanced"

export interface Course {
    id: string
    title: string
    description: string
    level: CourseLevel
    creatorId: string
    creatorName: string
    bannerUrl: string
    isPublished: boolean
    layout: any
}

export interface Enrollment {
    courseId: string
    progress: { completedChapters: string[] }
    enrolledAt: string
}

interface AppState {
    // Mock User
    role: UserRole
    setRole: (role: UserRole) => void

    // Courses
    courses: Course[]
    addCourse: (course: Course) => void
    updateCourse: (id: string, updates: Partial<Course>) => void

    // Enrollments
    enrollments: Enrollment[]
    enroll: (courseId: string) => void
    updateProgress: (courseId: string, chapterId: string) => void
}

const mockCourses: Course[] = [
    {
        id: "c-1",
        title: "React Basics",
        description: "Learn the fundamentals of React, hooks, and component architecture.",
        level: "beginner",
        creatorId: "user-1",
        creatorName: "AI Instructor",
        bannerUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
        isPublished: true,
        layout: {
            chapters: [
                {
                    id: "ch-1",
                    title: "Introduction to React",
                    topics: [
                        { id: "t-1", title: "What is React?", videos: [] },
                        { id: "t-2", title: "JSX Syntax", videos: [] }
                    ]
                }
            ]
        }
    },
    {
        id: "c-2",
        title: "AI Fundamentals",
        description: "A comprehensive guide to understanding Large Language Models.",
        level: "intermediate",
        creatorId: "user-2",
        creatorName: "Sarah Connor",
        bannerUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
        isPublished: true,
        layout: {}
    }
]

export const useStore = create<AppState>((set) => ({
    role: "learner",
    setRole: (role) => set({ role }),

    courses: mockCourses,
    addCourse: (course) => set((state) => ({ courses: [...state.courses, course] })),
    updateCourse: (id, updates) => set((state) => ({
        courses: state.courses.map(c => c.id === id ? { ...c, ...updates } : c)
    })),

    enrollments: [],
    enroll: (courseId) => set((state) => {
        if (state.enrollments.find(e => e.courseId === courseId)) return state
        return {
            enrollments: [...state.enrollments, { courseId, progress: { completedChapters: [] }, enrolledAt: new Date().toISOString() }]
        }
    }),
    updateProgress: (courseId, chapterId) => set((state) => ({
        enrollments: state.enrollments.map(e => {
            if (e.courseId === courseId) {
                const completed = e.progress.completedChapters
                const newCompleted = completed.includes(chapterId)
                    ? completed.filter(id => id !== chapterId)
                    : [...completed, chapterId]
                return { ...e, progress: { completedChapters: newCompleted } }
            }
            return e
        })
    }))
}))
