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
import { Plus, Pencil, Trash2, Loader2, Newspaper, Upload, X, Eye } from "lucide-react";
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

interface ImageUploadState {
    file: File | null;
    uploading: boolean;
    url: string;
}

const NewsManagement = () => {
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUpload, setImageUpload] = useState<ImageUploadState>({
        file: null,
        uploading: false,
        url: "",
    });

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
                    id: doc.id,
                    ...data,
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
        setImageUpload({ file: null, uploading: false, url: "" });
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

        setImageUpload({ file, uploading: true, url: "" });

        try {
            const result = await uploadImage(file, {
                folder: "news",
            });

            setImageUpload({ file: null, uploading: false, url: result.secure_url });
            setFormData({ ...formData, imageUrl: result.secure_url });

            toast({
                title: "Success!",
                description: "Image uploaded successfully.",
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to upload image. Please try again.";
            toast({
                title: "Upload failed",
                description: errorMessage,
                variant: "destructive",
            });
            setImageUpload({ file: null, uploading: false, url: "" });
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

            // Set published date if publishing for the first time
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
        setImageUpload({ file: null, uploading: false, url: article.imageUrl || "" });
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

    const NewsForm = ({ onSubmit, submitLabel }: { onSubmit: (e: React.FormEvent) => void; submitLabel: string }) => (
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        disabled={isSubmitting}
                        placeholder="Enter news article title"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="summary">Summary *</Label>
                    <Textarea
                        id="summary"
                        value={formData.summary}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        required
                        disabled={isSubmitting}
                        rows={3}
                        placeholder="Brief summary of the article (shown in news list)"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        required
                        disabled={isSubmitting}
                        rows={8}
                        placeholder="Full article content"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="author">Author</Label>
                        <Input
                            id="author"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            disabled={isSubmitting}
                            placeholder="e.g., John Doe"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                            id="category"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            disabled={isSubmitting}
                            placeholder="e.g., Architecture, Design, News"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Featured Image</Label>
                    <div className="space-y-2">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const files = e.target.files;
                                if (files && files.length > 0) {
                                    handleFileSelect(files[0]);
                                }
                            }}
                            disabled={isSubmitting || imageUpload.uploading}
                            className="cursor-pointer"
                        />
                        {imageUpload.uploading && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Uploading image...
                            </div>
                        )}
                        {(formData.imageUrl || imageUpload.url) && (
                            <div className="relative">
                                <img
                                    src={formData.imageUrl || imageUpload.url}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded border"
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-2 right-2"
                                    onClick={() => {
                                        setFormData({ ...formData, imageUrl: "" });
                                        setImageUpload({ file: null, uploading: false, url: "" });
                                    }}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="published"
                        checked={formData.published}
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                        disabled={isSubmitting}
                        className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="published" className="cursor-pointer">
                        Publish immediately
                    </Label>
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        setIsAddDialogOpen(false);
                        setIsEditDialogOpen(false);
                        resetForm();
                    }}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || imageUpload.uploading}>
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
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Newspaper className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">
                        News Articles ({newsArticles.length})
                    </h3>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => resetForm()}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add News Article
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Add New Article</DialogTitle>
                            <DialogDescription>
                                Create a new news article. Fill in the required fields.
                            </DialogDescription>
                        </DialogHeader>
                        <NewsForm onSubmit={handleAddNews} submitLabel="Add Article" />
                    </DialogContent>
                </Dialog>
            </div>

            {newsArticles.length === 0 ? (
                <div className="text-center py-12 border rounded-lg">
                    <Newspaper className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">No news articles yet</p>
                    <Button onClick={() => setIsAddDialogOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Your First Article
                    </Button>
                </div>
            ) : (
                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {newsArticles.map((article) => (
                                <TableRow key={article.id}>
                                    <TableCell className="font-medium max-w-xs">
                                        <div className="flex items-start gap-3">
                                            {article.imageUrl && (
                                                <img
                                                    src={article.imageUrl}
                                                    alt={article.title}
                                                    className="h-12 w-12 rounded object-cover flex-shrink-0"
                                                />
                                            )}
                                            <div className="min-w-0">
                                                <div className="font-medium truncate">{article.title}</div>
                                                <div className="text-sm text-muted-foreground truncate">
                                                    {article.summary}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{article.category || "-"}</TableCell>
                                    <TableCell>{article.author || "-"}</TableCell>
                                    <TableCell>
                                        <Badge variant={article.published ? "default" : "secondary"}>
                                            {article.published ? "Published" : "Draft"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        {article.publishedDate
                                            ? format(article.publishedDate, "MMM d, yyyy")
                                            : format(article.createdAt, "MMM d, yyyy")}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openPreviewDialog(article)}
                                                title="Preview"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openEditDialog(article)}
                                                title="Edit"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openDeleteDialog(article)}
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4 text-red-500" />
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
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Article</DialogTitle>
                        <DialogDescription>
                            Update the news article information.
                        </DialogDescription>
                    </DialogHeader>
                    <NewsForm onSubmit={handleEditNews} submitLabel="Update Article" />
                </DialogContent>
            </Dialog>

            {/* Preview Dialog */}
            <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Article Preview</DialogTitle>
                    </DialogHeader>
                    {selectedArticle && (
                        <div className="space-y-4">
                            {selectedArticle.imageUrl && (
                                <img
                                    src={selectedArticle.imageUrl}
                                    alt={selectedArticle.title}
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                            )}
                            <div>
                                <h2 className="text-2xl font-bold mb-2">{selectedArticle.title}</h2>
                                <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                                    {selectedArticle.author && <span>By {selectedArticle.author}</span>}
                                    {selectedArticle.category && (
                                        <Badge variant="outline">{selectedArticle.category}</Badge>
                                    )}
                                    {selectedArticle.publishedDate && (
                                        <span>{format(selectedArticle.publishedDate, "MMMM d, yyyy")}</span>
                                    )}
                                </div>
                            </div>
                            <div className="prose max-w-none">
                                <p className="text-lg font-medium text-muted-foreground mb-4">
                                    {selectedArticle.summary}
                                </p>
                                <div className="whitespace-pre-wrap">{selectedArticle.content}</div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete "{selectedArticle?.title}".
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setSelectedArticle(null)}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteNews}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default NewsManagement;
