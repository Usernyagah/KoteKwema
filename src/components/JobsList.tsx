import { useState, useEffect } from "react";
import { collection, query, where, getDocs, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Briefcase, Mail, ArrowRight } from "lucide-react";

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

        // Using onSnapshot for real-time updates as per usual pattern in this project
        const q = query(
            collection(db, "jobVacancies"),
            where("isActive", "==", true),
            orderBy("createdAt", "desc")
        );

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
                // Fallback for missing index
                if (error.code === "failed-precondition") {
                    console.warn("Firestore index missing for jobs, fetching without orderBy");
                    const fallbackQuery = query(
                        collection(db, "jobVacancies"),
                        where("isActive", "==", true)
                    );

                    onSnapshot(fallbackQuery, (snapshot) => {
                        const jobsData: Job[] = [];
                        snapshot.forEach((doc) => {
                            const data = doc.data();
                            jobsData.push({ ...data, id: doc.id } as Job);
                        });

                        // Sort manually
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

        return () => unsubscribe();
    }, []);

    if (isLoading) {
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground italic">Checking for open positions...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-destructive font-light">{error}</p>
            </div>
        );
    }

    if (jobs.length === 0) {
        return (
            <div className="text-center py-12 p-8 border border-dashed border-[#E5E5E5] rounded-lg bg-[#F9F9F9]">
                <Briefcase className="w-12 h-12 mx-auto text-[#CCCCCC] mb-4 font-light" />
                <h3 className="text-xl font-light text-black mb-2">No Open Positions Currently</h3>
                <p className="text-[#666666] font-light max-w-md mx-auto">
                    We're not currently hiring for any specific roles, but we're always interested in meeting talented people.
                    Feel free to send your portfolio to careers@kotekwema.com for future consideration.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6">
            {jobs.map((job) => (
                <Card key={job.id} className="border border-[#E5E5E5] hover:border-black transition-colors duration-300">
                    <CardHeader className="pb-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <CardTitle className="text-xl md:text-2xl font-semibold mb-2">{job.title}</CardTitle>
                                <div className="flex flex-wrap gap-3 text-sm text-[#666666]">
                                    <div className="flex items-center gap-1.5">
                                        <Briefcase className="w-4 h-4" />
                                        <span className="capitalize">{job.department.replace("-", " ")}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4" />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4" />
                                        <span className="capitalize">{job.type}</span>
                                    </div>
                                </div>
                            </div>
                            <Badge variant="outline" className="w-fit border-[#E5E5E5] text-[#1A1A1A] font-light px-3 py-1">
                                {job.type}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h4 className="text-sm font-semibold text-black uppercase tracking-wider mb-2">Description</h4>
                            <p className="text-sm md:text-base text-[#4A4A4A] font-light leading-relaxed whitespace-pre-line">
                                {job.description}
                            </p>
                        </div>

                        {job.requirements && (
                            <div>
                                <h4 className="text-sm font-semibold text-black uppercase tracking-wider mb-2">Requirements</h4>
                                <p className="text-sm md:text-base text-[#4A4A4A] font-light leading-relaxed whitespace-pre-line">
                                    {job.requirements}
                                </p>
                            </div>
                        )}

                        <div className="pt-4 border-t border-[#F0F0F0] flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-sm text-[#666666]">
                                Interested? Contact us at:{" "}
                                <a href={`mailto:${job.applicationEmail}`} className="text-black font-medium hover:underline">
                                    {job.applicationEmail}
                                </a>
                            </div>
                            <div className="flex gap-3 w-full sm:w-auto">
                                {job.applicationUrl ? (
                                    <Button asChild className="w-full sm:w-auto bg-black text-white hover:bg-[#333333]">
                                        <a href={job.applicationUrl} target="_blank" rel="noopener noreferrer">
                                            Apply Online <ArrowRight className="ml-2 w-4 h-4" />
                                        </a>
                                    </Button>
                                ) : (
                                    <Button asChild className="w-full sm:w-auto bg-black text-white hover:bg-[#333333]">
                                        <a href={`mailto:${job.applicationEmail}?subject=Application for ${job.title}`}>
                                            Apply via Email <Mail className="ml-2 w-4 h-4" />
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default JobsList;
