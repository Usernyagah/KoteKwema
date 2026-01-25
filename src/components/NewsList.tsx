import { useState, useEffect } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { format } from "date-fns";
import { ChevronRight, Calendar, User, Tag } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface NewsArticle {
    id: string;
    title: string;
    summary: string;
    content: string;
    author?: string;
    category?: string;
    imageUrl?: string;
    published: boolean;
    publishedDate?: any;
    createdAt: any;
}

interface NewsListProps {
    subtopic: string; // 'announcements' or 'news-awards'
}

const NewsList = ({ subtopic }: NewsListProps) => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

    useEffect(() => {
        if (!db) {
            setIsLoading(false);
            return;
        }

        // Determine filter categories based on subtopic
        // For Firm Announcements, we show 'News' or 'Architecture'
        // For News Awards & Recognition, we show 'Awards'
        const categories = subtopic === "announcements"
            ? ["News", "Architecture", "Firm", "Update"]
            : ["Awards", "Recognition", "Honor", "Competition"];

        const q = query(
            collection(db, "news"),
            where("published", "==", true),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const articlesData: NewsArticle[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                const category = data.category || "";

                // Client-side filtering because Firestore 'in' query has limits 
                // and we want flexible matching
                const matchesCategory = categories.some(cat =>
                    category.toLowerCase().includes(cat.toLowerCase())
                );

                if (matchesCategory || subtopic === "all") {
                    articlesData.push({
                        ...data,
                        id: doc.id,
                    } as NewsArticle);
                }
            });
            setArticles(articlesData);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [subtopic]);

    if (isLoading) {
        return (
            <div className="py-12">
                <p className="text-lg text-[#1A1A1A] font-light italic">Gathering insights...</p>
            </div>
        );
    }

    if (articles.length === 0) {
        return (
            <div className="py-12 border-t border-[#E5E5E5]">
                <h3 className="text-xl md:text-2xl font-light text-black mb-4">No Recent Updates</h3>
                <p className="text-base md:text-lg text-[#4A4A4A] font-light leading-relaxed max-w-2xl">
                    We haven't posted any updates in this category recently. Check back soon for news on our latest projects and milestones.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-16 md:space-y-24 mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                {articles.map((article) => (
                    <article
                        key={article.id}
                        className="group flex flex-col cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-700"
                        onClick={() => setSelectedArticle(article)}
                    >
                        {/* Image Container */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 mb-6">
                            {article.imageUrl ? (
                                <img
                                    src={article.imageUrl}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <span className="text-[10px] uppercase tracking-[0.3em]">No Image</span>
                                </div>
                            )}
                            <div className="absolute top-4 left-4">
                                <Badge className="bg-white/90 text-black rounded-none border-none text-[9px] uppercase tracking-[0.2em] font-light px-3 py-1 shadow-sm">
                                    {article.category || "News"}
                                </Badge>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 flex flex-col">
                            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.15em] text-[#666666] mb-4 font-light">
                                <span>{article.publishedDate ? format(article.publishedDate.toDate(), "MMM d, yyyy") : format(article.createdAt.toDate(), "MMM d, yyyy")}</span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                <span>{article.author || "Kote Kwema"}</span>
                            </div>

                            <h3 className="text-xl md:text-2xl font-light text-black mb-4 group-hover:text-gray-600 transition-colors leading-tight">
                                {article.title}
                            </h3>

                            <p className="text-sm md:text-base text-[#4A4A4A] font-light leading-relaxed line-clamp-3 mb-6">
                                {article.summary}
                            </p>

                            <div className="mt-auto flex items-center text-[10px] uppercase tracking-[0.2em] font-medium text-black">
                                Read Full Article
                                <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* Detailed Article Dialog */}
            <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-none border-black p-0">
                    {selectedArticle && (
                        <div className="flex flex-col">
                            {selectedArticle.imageUrl && (
                                <div className="aspect-[21/9] w-full overflow-hidden">
                                    <img
                                        src={selectedArticle.imageUrl}
                                        alt={selectedArticle.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            <div className="p-6 md:p-12 lg:p-16">
                                <div className="max-w-3xl mx-auto">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Badge variant="outline" className="rounded-none border-black uppercase tracking-[0.2em] font-light text-[10px] px-3">
                                            {selectedArticle.category || "News"}
                                        </Badge>
                                    </div>

                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-8 leading-tight">
                                        {selectedArticle.title}
                                    </h2>

                                    <div className="flex flex-wrap items-center gap-6 text-[10px] md:text-xs text-gray-500 uppercase tracking-widest border-y border-gray-100 py-6 mb-10">
                                        <div className="flex items-center gap-2">
                                            <User size={12} strokeWidth={1.5} className="text-black" />
                                            <span>{selectedArticle.author || "Kote Kwema Staff"}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={12} strokeWidth={1.5} className="text-black" />
                                            <span>{selectedArticle.publishedDate ? format(selectedArticle.publishedDate.toDate(), "MMMM d, yyyy") : format(selectedArticle.createdAt.toDate(), "MMMM d, yyyy")}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Tag size={12} strokeWidth={1.5} className="text-black" />
                                            <span>Studio Updates</span>
                                        </div>
                                    </div>

                                    <div className="prose prose-sm md:prose-lg max-w-none">
                                        <p className="text-lg md:text-xl font-light text-gray-800 mb-10 leading-relaxed italic border-l-2 border-black pl-8">
                                            {selectedArticle.summary}
                                        </p>
                                        <div className="whitespace-pre-wrap font-light text-gray-700 leading-relaxed text-base md:text-lg">
                                            {selectedArticle.content}
                                        </div>
                                    </div>

                                    <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
                                        <span className="text-[10px] uppercase tracking-widest text-gray-400">© Kote Kwema Architecture</span>
                                        <button
                                            onClick={() => setSelectedArticle(null)}
                                            className="text-[10px] uppercase tracking-widest font-bold hover:underline"
                                        >
                                            Close Article
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default NewsList;
