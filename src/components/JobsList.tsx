import { useState, useEffect } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Briefcase, Mail, ArrowRight, ChevronRight } from "lucide-react";

interface Job {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    requirements: string;
    applicationEmail: string;
    applicationUrl: string;
    isActive: boolean;
    createdAt: any;
}

const JobsList = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!db) {
            setError("Firebase is not configured");
            setIsLoading(false);
            return;
        }

        const q = query(
            collection(db, "jobVacancies"),
            where("isActive", "==", true),
            orderBy("createdAt", "desc")
        );

        let unsubscribeFallback: (() => void) | null = null;

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const jobsData: Job[] = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    jobsData.push({
                        ...data,
                        id: doc.id,
                    } as Job);
                });
                setJobs(jobsData);
                setIsLoading(false);
            },
            (error: any) => {
                if (error.code === "failed-precondition") {
                    const fallbackQuery = query(
                        collection(db, "jobVacancies"),
                        where("isActive", "==", true)
                    );

                    unsubscribeFallback = onSnapshot(fallbackQuery, (snapshot) => {
                        const jobsData: Job[] = [];
                        snapshot.forEach((doc) => {
                            const data = doc.data();
                            jobsData.push({ ...data, id: doc.id } as Job);
                        });

                        jobsData.sort((a, b) => {
                            const aTime = a.createdAt?.toMillis?.() || 0;
                            const bTime = b.createdAt?.toMillis?.() || 0;
                            return bTime - aTime;
                        });

                        setJobs(jobsData);
                        setIsLoading(false);
                        setError(null);
                    });
                } else {
                    console.error("Error fetching jobs:", error);
                    setError("Failed to load job vacancies");
                    setIsLoading(false);
                }
            }
        );

        return () => {
            unsubscribe();
            if (unsubscribeFallback) unsubscribeFallback();
        };
    }, []);

    if (isLoading) {
        return (
            <div className="py-8">
                <p className="text-lg text-[#1A1A1A] font-light italic">Refining opportunities...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-8">
                <p className="text-lg text-destructive font-light">{error}</p>
            </div>
        );
    }

    if (jobs.length === 0) {
        return (
            <div className="py-12 border-t border-[#E5E5E5]">
                <h3 className="text-xl md:text-2xl font-light text-black mb-4">No Open Positions Currently</h3>
                <p className="text-base md:text-lg text-[#4A4A4A] font-light leading-relaxed max-w-2xl">
                    While we don't have any specific roles open at the moment, we are always looking for exceptional talent to join our studio.
                    Feel free to share your vision and portfolio with us for future consideration at{" "}
                    <a href="mailto:careers@kotekwema.com" className="text-black font-medium hover:underline">careers@kotekwema.com</a>.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-16 md:space-y-24">
            {jobs.map((job) => (
                <div key={job.id} className="group animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-8">
                        <div>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-black mb-4 group-hover:tracking-tight transition-all duration-500">
                                {job.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm md:text-base text-[#666666] font-light uppercase tracking-widest">
                                <span className="flex items-center gap-2">
                                    <Briefcase size={14} strokeWidth={1.5} />
                                    {job.department.replace("-", " ")}
                                </span>
                                <span className="flex items-center gap-2">
                                    <MapPin size={14} strokeWidth={1.5} />
                                    {job.location}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock size={14} strokeWidth={1.5} />
                                    {job.type}
                                </span>
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <ChevronRight className="w-8 h-8 text-[#E5E5E5] group-hover:text-black group-hover:translate-x-2 transition-all duration-300" strokeWidth={1} />
                        </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                        <div className="lg:col-span-8 space-y-10">
                            <div className="border-l-2 border-[#E5E5E5] pl-6 md:pl-8">
                                <h4 className="text-xs font-semibold text-black uppercase tracking-[0.2em] mb-4">The Role</h4>
                                <p className="text-base md:text-lg text-[#4A4A4A] font-light leading-relaxed whitespace-pre-line max-w-3xl">
                                    {job.description}
                                </p>
                            </div>

                            {job.requirements && (
                                <div className="border-l-2 border-[#E5E5E5] pl-6 md:pl-8">
                                    <h4 className="text-xs font-semibold text-black uppercase tracking-[0.2em] mb-4">Requirements</h4>
                                    <p className="text-base md:text-lg text-[#4A4A4A] font-light leading-relaxed whitespace-pre-line max-w-3xl">
                                        {job.requirements}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-4 flex flex-col justify-end">
                            <div className="bg-[#FAFAFA] p-8 space-y-6">
                                <p className="text-xs font-semibold text-black uppercase tracking-widest">Apply Now</p>
                                <p className="text-sm text-[#666666] font-light leading-relaxed">
                                    To apply for this position, please send your portfolio and CV to our careers desk or follow the application link below.
                                </p>
                                <div className="pt-2">
                                    <Button asChild variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white rounded-none py-6 transition-all duration-300 shadow-none">
                                        <a href={`mailto:${job.applicationEmail}?subject=Application for ${job.title}`} className="flex items-center justify-center w-full h-full !text-inherit">
                                            Email Application <Mail className="ml-2 w-4 h-4" />
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 border-b border-[#E5E5E5] w-full" />
                </div>
            ))}
        </div>
    );
};

export default JobsList;
