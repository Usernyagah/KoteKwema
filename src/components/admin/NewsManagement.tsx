import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { uploadImage } from "@/utils/cloudinary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, Newspaper, Upload, X, Eye, FileText } from "lucide-react";
import { format } from "date-fns";

interface NewsArticle {
    id: string;
    title: string;
    summary: string;
    content: string;
    author?: string;
    category?: string;
    imageUrl?: string;
    published: boolean;
    publishedDate?: Date;
    createdAt: Date;
    updatedAt?: Date;
}

interface NewsFormData {
    title: string;
    summary: string;
    content: string;
    author: string;
    category: string;
    imageUrl: string;
    published: boolean;
}

interface NewsFormProps {
    onSubmit: (e: React.FormEvent) => void;
    submitLabel: string;
    formData: NewsFormData;
    setFormData: React.Dispatch<React.SetStateAction<NewsFormData>>;
    isSubmitting: boolean;
    onCancel: () => void;
    handleFileSelect: (file: File | null) => Promise<void>;
    imageUploading: boolean;
}

const NewsForm = ({
    onSubmit,
    submitLabel,
    formData,
    setFormData,
    isSubmitting,
    onCancel,
    handleFileSelect,
    imageUploading
}: NewsFormProps) => {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider">Title *</Label>
                    <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        disabled={isSubmitting}
                        placeholder="Enter news article title"
                        className="rounded-none border-gray-300 focus:border-black transition-colors"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="author" className="text-xs font-semibold uppercase tracking-wider">Author</Label>
                        <Input
                            id="author"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            disabled={isSubmitting}
                            placeholder="e.g., John Doe"
                            className="rounded-none border-gray-300 focus:border-black transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category" className="text-xs font-semibold uppercase tracking-wider">Category</Label>
                        <Input
                            id="category"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            disabled={isSubmitting}
                            placeholder="Architecture or News or Awards"
                            className="rounded-none border-gray-300 focus:border-black transition-colors"
                        />
                        <p className="text-[10px] text-muted-foreground uppercase tracking-tight">
                            Use "Architecture" or "News" for Announcements, "Awards" for Recognition
                        </p>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="summary" className="text-xs font-semibold uppercase tracking-wider">Summary *</Label>
                    <Textarea
                        id="summary"
                        value={formData.summary}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        required
                        disabled={isSubmitting}
                        rows={3}
                        placeholder="Brief summary shown in the news list..."
                        className="rounded-none border-gray-300 focus:border-black transition-colors resize-none"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="content" className="text-xs font-semibold uppercase tracking-wider">Full Content *</Label>
                    <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        required
                        disabled={isSubmitting}
                        rows={8}
                        placeholder="Full article content..."
                        className="rounded-none border-gray-300 focus:border-black transition-colors"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider">Featured Image</Label>
                    <div className="flex flex-col gap-4">
                        {formData.imageUrl ? (
                            <div className="relative aspect-video w-full max-w-sm overflow-hidden border border-gray-200">
                                <img
                                    src={formData.imageUrl}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, imageUrl: "" })}
                                    className="absolute top-2 right-2 bg-black/80 text-white rounded-full p-1.5 hover:bg-black transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <label className="cursor-pointer group flex-1">
                                    <div className="border-2 border-dashed border-gray-300 group-hover:border-black transition-colors p-8 flex flex-col items-center justify-center gap-2">
                                        <Upload className="w-6 h-6 text-gray-400 group-hover:text-black transition-colors" />
                                        <span className="text-xs uppercase tracking-widest text-gray-500 group-hover:text-black transition-colors">Upload image</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const files = e.target.files;
                                                if (files && files.length > 0) {
                                                    handleFileSelect(files[0]);
                                                }
                                            }}
                                            disabled={isSubmitting || imageUploading}
                                            className="hidden"
                                        />
                                    </div>
                                </label>
                                {imageUploading && <Loader2 className="h-6 w-6 animate-spin text-black" />}
                            </div>
                        )}
                        <div className="space-y-1">
                            <Label htmlFor="imageUrl" className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Or provide image URL</Label>
                            <Input
                                id="imageUrl"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                disabled={isSubmitting || imageUploading}
                                placeholder="https://example.com/image.jpg"
                                className="rounded-none border-gray-300 focus:border-black text-xs"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 py-2">
                    <input
                        type="checkbox"
                        id="published"
                        checked={formData.published}
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                        disabled={isSubmitting}
                        className="h-4 w-4 rounded-none border-gray-300 text-black focus:ring-black accent-black"
                    />
                    <Label htmlFor="published" className="text-xs font-semibold uppercase tracking-wider cursor-pointer">
                        Publish immediately
                    </Label>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isSubmitting || imageUploading}
                    className="rounded-none border-black hover:bg-gray-100"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={isSubmitting || imageUploading}
                    className="rounded-none bg-black text-white hover:bg-gray-800 px-8"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {submitLabel}...
                        </>
                    ) : (
                        submitLabel
                    )}
                </Button>
            </div>
        </form>
    );
};

const NewsManagement = () => {
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);

    const [formData, setFormData] = useState<NewsFormData>({
        title: "",
        summary: "",
        content: "",
        author: "",
        category: "",
        imageUrl: "",
        published: false,
    });

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        if (!db) {
            toast({
                title: "Error",
                description: "Firebase is not configured.",
                variant: "destructive",
            });
            setLoading(false);
            return;
        }

        try {
            const q = query(collection(db, "news"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const articles: NewsArticle[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                articles.push({
                    ...data,
                    id: doc.id,
                    createdAt: data.createdAt?.toDate(),
                    updatedAt: data.updatedAt?.toDate(),
                    publishedDate: data.publishedDate?.toDate(),
                } as NewsArticle);
            });
            setNewsArticles(articles);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch news articles.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            summary: "",
            content: "",
            author: "",
            category: "",
            imageUrl: "",
            published: false,
        });
        setImageUploading(false);
    };

    const handleFileSelect = async (file: File | null) => {
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast({
                title: "Invalid file",
                description: "Please select an image file.",
                variant: "destructive",
            });
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            toast({
                title: "File too large",
                description: "Image must be less than 10MB.",
                variant: "destructive",
            });
            return;
        }

        setImageUploading(true);

        try {
            const result = await uploadImage(file, {
                folder: "news",
            });

            setFormData(prev => ({ ...prev, imageUrl: result.secure_url }));

            toast({
                title: "Success!",
                description: "Image uploaded successfully.",
            });
        } catch (error) {
            toast({
                title: "Upload failed",
                description: "Failed to upload image. Please try again.",
                variant: "destructive",
            });
        } finally {
            setImageUploading(false);
        }
    };

    const handleAddNews = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!db) {
            toast({
                title: "Error",
                description: "Firebase is not configured.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const newsData = {
                title: formData.title,
                summary: formData.summary,
                content: formData.content,
                author: formData.author || null,
                category: formData.category || null,
                imageUrl: formData.imageUrl || null,
                published: formData.published,
                publishedDate: formData.published ? new Date() : null,
                createdAt: new Date(),
            };

            await addDoc(collection(db, "news"), newsData);

            toast({
                title: "Success!",
                description: "News article added successfully.",
            });

            setIsAddDialogOpen(false);
            resetForm();
            fetchNews();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to add news article.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditNews = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!db || !selectedArticle) {
            toast({
                title: "Error",
                description: "Firebase is not configured or no article selected.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const updateData: any = {
                title: formData.title,
                summary: formData.summary,
                content: formData.content,
                author: formData.author || null,
                category: formData.category || null,
                imageUrl: formData.imageUrl || null,
                published: formData.published,
                updatedAt: new Date(),
            };

            if (formData.published && !selectedArticle.published) {
                updateData.publishedDate = new Date();
            }

            await updateDoc(doc(db, "news", selectedArticle.id), updateData);

            toast({
                title: "Success!",
                description: "News article updated successfully.",
            });

            setIsEditDialogOpen(false);
            setSelectedArticle(null);
            resetForm();
            fetchNews();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update news article.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteNews = async () => {
        if (!db || !selectedArticle) {
            toast({
                title: "Error",
                description: "Firebase is not configured or no article selected.",
                variant: "destructive",
            });
            return;
        }

        try {
            await deleteDoc(doc(db, "news", selectedArticle.id));

            toast({
                title: "Success!",
                description: "News article deleted successfully.",
            });

            setDeleteDialogOpen(false);
            setSelectedArticle(null);
            fetchNews();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete news article.",
                variant: "destructive",
            });
        }
    };

    const openEditDialog = (article: NewsArticle) => {
        setSelectedArticle(article);
        setFormData({
            title: article.title,
            summary: article.summary,
            content: article.content,
            author: article.author || "",
            category: article.category || "",
            imageUrl: article.imageUrl || "",
            published: article.published,
        });
        setIsEditDialogOpen(true);
    };

    const openDeleteDialog = (article: NewsArticle) => {
        setSelectedArticle(article);
        setDeleteDialogOpen(true);
    };

    const openPreviewDialog = (article: NewsArticle) => {
        setSelectedArticle(article);
        setIsPreviewDialogOpen(true);
    };

    if (!db) {
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground">
                    Firebase is not configured. Please check your .env file.
                </p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-black" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Newspaper className="h-5 w-5" />
                    <h3 className="text-lg font-semibold uppercase tracking-tight">
                        News Articles ({newsArticles.length})
                    </h3>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => resetForm()} className="rounded-none bg-black hover:bg-gray-800">
                            <Plus className="mr-2 h-4 w-4" />
                            Add News Article
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-none border-black">
                        <DialogHeader>
                            <DialogTitle className="uppercase tracking-widest font-light text-2xl">Add New Article</DialogTitle>
                            <DialogDescription className="text-xs uppercase tracking-tight text-gray-500">
                                Create a new news article for the studio updates.
                            </DialogDescription>
                        </DialogHeader>
                        <NewsForm
                            onSubmit={handleAddNews}
                            submitLabel="Add Article"
                            formData={formData}
                            setFormData={setFormData}
                            isSubmitting={isSubmitting}
                            onCancel={() => {
                                setIsAddDialogOpen(false);
                                resetForm();
                            }}
                            handleFileSelect={handleFileSelect}
                            imageUploading={imageUploading}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            {newsArticles.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-gray-300 rounded-none">
                    <Newspaper className="h-12 w-12 mx-auto text-muted-foreground mb-4 font-light" />
                    <p className="text-muted-foreground mb-4 uppercase tracking-widest text-xs">No news articles yet</p>
                    <Button onClick={() => setIsAddDialogOpen(true)} className="rounded-none">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Your First Article
                    </Button>
                </div>
            ) : (
                <div className="border border-gray-200 rounded-none overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow className="hover:bg-transparent border-b-gray-200">
                                <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-semibold py-4">Title</TableHead>
                                <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-semibold py-4">Category</TableHead>
                                <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-semibold py-4">Status</TableHead>
                                <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-semibold py-4">Date</TableHead>
                                <TableHead className="text-right text-xs uppercase tracking-wider text-gray-500 font-semibold py-4">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {newsArticles.map((article) => (
                                <TableRow key={article.id} className="hover:bg-gray-50 transition-colors border-b-gray-100 last:border-0">
                                    <TableCell className="font-medium max-w-xs py-4">
                                        <div className="flex items-start gap-4">
                                            {article.imageUrl ? (
                                                <div className="h-12 w-12 bg-gray-100 flex-shrink-0">
                                                    <img
                                                        src={article.imageUrl}
                                                        alt={article.title}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="h-12 w-12 bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-400">
                                                    <FileText size={20} strokeWidth={1} />
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <div className="font-medium truncate text-[#1A1A1A]">{article.title}</div>
                                                <div className="text-xs text-muted-foreground font-light line-clamp-1 mt-0.5">
                                                    {article.summary}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="rounded-none border-gray-300 font-light text-[10px] uppercase tracking-wider">
                                            {article.category || "General"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`text-[10px] uppercase tracking-[0.15em] font-semibold ${article.published ? "text-green-600" : "text-amber-600"}`}>
                                            {article.published ? "Published" : "Draft"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-xs text-muted-foreground font-light">
                                        {article.publishedDate
                                            ? format(article.publishedDate, "MMM d, yyyy")
                                            : format(article.createdAt, "MMM d, yyyy")}
                                    </TableCell>
                                    <TableCell className="text-right py-4">
                                        <div className="flex justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openPreviewDialog(article)}
                                                className="h-8 w-8 hover:bg-black hover:text-white transition-all"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openEditDialog(article)}
                                                className="h-8 w-8 hover:bg-black hover:text-white transition-all"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openDeleteDialog(article)}
                                                className="h-8 w-8 hover:bg-red-600 hover:text-white transition-all"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-none border-black">
                    <DialogHeader>
                        <DialogTitle className="uppercase tracking-widest font-light text-2xl">Edit Article</DialogTitle>
                        <DialogDescription className="text-xs uppercase tracking-tight text-gray-500">
                            Update the news article information.
                        </DialogDescription>
                    </DialogHeader>
                    <NewsForm
                        onSubmit={handleEditNews}
                        submitLabel="Update Article"
                        formData={formData}
                        setFormData={setFormData}
                        isSubmitting={isSubmitting}
                        onCancel={() => {
                            setIsEditDialogOpen(false);
                            setSelectedArticle(null);
                            resetForm();
                        }}
                        handleFileSelect={handleFileSelect}
                        imageUploading={imageUploading}
                    />
                </DialogContent>
            </Dialog>

            {/* Preview Dialog */}
            <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-none border-black">
                    <DialogHeader>
                        <DialogTitle className="uppercase tracking-widest font-light text-2xl border-b pb-4">Article Preview</DialogTitle>
                    </DialogHeader>
                    {selectedArticle && (
                        <div className="space-y-8 py-4">
                            {selectedArticle.imageUrl && (
                                <div className="aspect-[21/9] w-full overflow-hidden bg-gray-100">
                                    <img
                                        src={selectedArticle.imageUrl}
                                        alt={selectedArticle.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div className="max-w-3xl">
                                <Badge variant="outline" className="rounded-none border-black mb-4 uppercase tracking-[0.2em] font-light text-[10px] px-3">
                                    {selectedArticle.category || "News"}
                                </Badge>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-6 leading-tight">
                                    {selectedArticle.title}
                                </h2>
                                <div className="flex flex-wrap items-center gap-6 text-[10px] md:text-xs text-gray-500 uppercase tracking-widest border-y border-gray-100 py-4 mb-8">
                                    {selectedArticle.author && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-black font-semibold">By</span>
                                            {selectedArticle.author}
                                        </div>
                                    )}
                                    {selectedArticle.publishedDate && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-black font-semibold">Published</span>
                                            {format(selectedArticle.publishedDate, "MMMM d, yyyy")}
                                        </div>
                                    )}
                                </div>
                                <div className="prose prose-sm md:prose-lg max-w-none">
                                    <p className="text-lg md:text-xl font-light text-gray-800 mb-8 leading-relaxed italic border-l-2 border-black pl-8">
                                        {selectedArticle.summary}
                                    </p>
                                    <div className="whitespace-pre-wrap font-light text-gray-700 leading-relaxed text-base md:text-lg">
                                        {selectedArticle.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end pt-8 border-t">
                        <Button
                            onClick={() => setIsPreviewDialogOpen(false)}
                            className="rounded-none bg-black text-white hover:bg-gray-800"
                        >
                            Close Preview
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent className="rounded-none border-black">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="uppercase tracking-widest font-light text-xl">Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm font-light leading-relaxed">
                            This will permanently delete <span className="font-semibold text-black italic">"{selectedArticle?.title}"</span> from your records. This process is irreversible.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2">
                        <AlertDialogCancel onClick={() => setSelectedArticle(null)} className="rounded-none">
                            Keep Article
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteNews}
                            className="bg-red-600 hover:bg-red-700 text-white rounded-none border-0"
                        >
                            Delete Permanently
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default NewsManagement;
