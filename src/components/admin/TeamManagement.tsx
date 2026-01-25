import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
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
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, Users, Upload, X } from "lucide-react";

interface TeamMember {
    id: string;
    name: string;
    role: string;
    email?: string;
    phone?: string;
    bio?: string;
    imageUrl?: string;
    order?: number;
    createdAt: Date;
}

interface TeamMemberFormData {
    name: string;
    role: string;
    email: string;
    phone: string;
    bio: string;
    imageUrl: string;
    order: string;
}

interface TeamMemberFormProps {
    onSubmit: (e: React.FormEvent) => void;
    submitLabel: string;
    formData: TeamMemberFormData;
    setFormData: (data: TeamMemberFormData) => void;
    isSubmitting: boolean;
    onCancel: () => void;
}

const TeamMemberForm = ({ onSubmit, submitLabel, formData, setFormData, isSubmitting, onCancel }: TeamMemberFormProps) => {
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            toast({
                title: "Invalid file",
                description: "Please select an image file.",
                variant: "destructive",
            });
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast({
                title: "File too large",
                description: "Image must be less than 5MB.",
                variant: "destructive",
            });
            return;
        }

        setIsUploading(true);
        try {
            const result = await uploadImage(file, { folder: "team" });
            setFormData({ ...formData, imageUrl: result.secure_url });
            toast({
                title: "Success",
                description: "Image uploaded successfully.",
            });
        } catch (error) {
            toast({
                title: "Upload failed",
                description: "Failed to upload image. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        disabled={isSubmitting}
                        placeholder="e.g., John Doe"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="role">Role/Position *</Label>
                    <Input
                        id="role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        required
                        disabled={isSubmitting}
                        placeholder="e.g., Senior Architect"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={isSubmitting}
                        placeholder="email@example.com"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={isSubmitting}
                        placeholder="+254 700 000 000"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="order">Display Order</Label>
                    <Input
                        id="order"
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                        disabled={isSubmitting}
                        placeholder="e.g., 1, 2, 3..."
                    />
                    <p className="text-xs text-muted-foreground">
                        Lower numbers appear first
                    </p>
                </div>
            </div>

            <div className="space-y-2">
                <Label>Team Member Image</Label>
                <div className="flex flex-col gap-4">
                    {formData.imageUrl ? (
                        <div className="relative w-32 h-32">
                            <img
                                src={formData.imageUrl}
                                alt="Team member"
                                className="w-full h-full object-cover rounded-lg border border-[#E5E5E5]"
                            />
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, imageUrl: "" })}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={isSubmitting || isUploading}
                                className="cursor-pointer"
                            />
                            {isUploading && <Loader2 className="h-5 w-5 animate-spin text-[#1A1A1A]" />}
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="imageUrl">Or provide image URL</Label>
                        <Input
                            id="imageUrl"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            disabled={isSubmitting || isUploading}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="bio">Bio/Description</Label>
                <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    disabled={isSubmitting}
                    rows={4}
                    placeholder="Brief description about the team member..."
                />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-[#E5E5E5]">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isSubmitting || isUploading}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || isUploading}>
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

const TeamManagement = () => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState<TeamMemberFormData>({
        name: "",
        role: "",
        email: "",
        phone: "",
        bio: "",
        imageUrl: "",
        order: "",
    });

    useEffect(() => {
        fetchTeamMembers();
    }, []);

    const fetchTeamMembers = async () => {
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
            const querySnapshot = await getDocs(collection(db, "teamMembers"));
            const members: TeamMember[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                members.push({ ...data, id: doc.id } as TeamMember);
            });
            // Sort by order field, then by name
            members.sort((a, b) => {
                if (a.order !== undefined && b.order !== undefined) {
                    return a.order - b.order;
                }
                return a.name.localeCompare(b.name);
            });
            setTeamMembers(members);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch team members.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            role: "",
            email: "",
            phone: "",
            bio: "",
            imageUrl: "",
            order: "",
        });
    };

    const handleAddMember = async (e: React.FormEvent) => {
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
            await addDoc(collection(db, "teamMembers"), {
                name: formData.name,
                role: formData.role,
                email: formData.email || null,
                phone: formData.phone || null,
                bio: formData.bio || null,
                imageUrl: formData.imageUrl || null,
                order: formData.order ? parseInt(formData.order) : 0,
                createdAt: new Date(),
            });

            toast({
                title: "Success!",
                description: "Team member added successfully.",
            });

            setIsAddDialogOpen(false);
            resetForm();
            fetchTeamMembers();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to add team member.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditMember = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!db || !selectedMember) {
            toast({
                title: "Error",
                description: "Firebase is not configured or no member selected.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            await updateDoc(doc(db, "teamMembers", selectedMember.id), {
                name: formData.name,
                role: formData.role,
                email: formData.email || null,
                phone: formData.phone || null,
                bio: formData.bio || null,
                imageUrl: formData.imageUrl || null,
                order: formData.order ? parseInt(formData.order) : 0,
                updatedAt: new Date(),
            });

            toast({
                title: "Success!",
                description: "Team member updated successfully.",
            });

            setIsEditDialogOpen(false);
            setSelectedMember(null);
            resetForm();
            fetchTeamMembers();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update team member.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteMember = async () => {
        if (!db || !selectedMember) {
            toast({
                title: "Error",
                description: "Firebase is not configured or no member selected.",
                variant: "destructive",
            });
            return;
        }

        try {
            await deleteDoc(doc(db, "teamMembers", selectedMember.id));

            toast({
                title: "Success!",
                description: "Team member deleted successfully.",
            });

            setDeleteDialogOpen(false);
            setSelectedMember(null);
            fetchTeamMembers();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete team member.",
                variant: "destructive",
            });
        }
    };

    const openEditDialog = (member: TeamMember) => {
        setSelectedMember(member);
        setFormData({
            name: member.name,
            role: member.role,
            email: member.email || "",
            phone: member.phone || "",
            bio: member.bio || "",
            imageUrl: member.imageUrl || "",
            order: member.order?.toString() || "0",
        });
        setIsEditDialogOpen(true);
    };

    const openDeleteDialog = (member: TeamMember) => {
        setSelectedMember(member);
        setDeleteDialogOpen(true);
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
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">
                        Team Members ({teamMembers.length})
                    </h3>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => resetForm()}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Team Member
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-none border-black">
                        <DialogHeader>
                            <DialogTitle>Add New Team Member</DialogTitle>
                            <DialogDescription>
                                Add a new member to your team. Fill in the required fields.
                            </DialogDescription>
                        </DialogHeader>
                        <TeamMemberForm
                            onSubmit={handleAddMember}
                            submitLabel="Add Member"
                            formData={formData}
                            setFormData={setFormData}
                            isSubmitting={isSubmitting}
                            onCancel={() => {
                                setIsAddDialogOpen(false);
                                resetForm();
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            {teamMembers.length === 0 ? (
                <div className="text-center py-12 border rounded-none">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">No team members yet</p>
                    <Button onClick={() => setIsAddDialogOpen(true)} className="rounded-none">
                        <Plus className="mr-2 h-4 w-4 " />
                        Add Your First Team Member
                    </Button>
                </div>
            ) : (
                <div className="border rounded-none">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Order</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {teamMembers.map((member) => (
                                <TableRow key={member.id} className="hover:bg-gray-50">
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            {member.imageUrl ? (
                                                <img
                                                    src={member.imageUrl}
                                                    alt={member.name}
                                                    className="h-10 w-10 rounded-full object-cover border border-[#E5E5E5]"
                                                />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                                    <Users size={16} className="text-gray-400" />
                                                </div>
                                            )}
                                            {member.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{member.role}</TableCell>
                                    <TableCell>{member.email || "-"}</TableCell>
                                    <TableCell>{member.phone || "-"}</TableCell>
                                    <TableCell>{member.order || "0"}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openEditDialog(member)}
                                                className="rounded-none"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openDeleteDialog(member)}
                                                className="rounded-none"
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
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-none border-black">
                    <DialogHeader>
                        <DialogTitle>Edit Team Member</DialogTitle>
                        <DialogDescription>
                            Update the team member information.
                        </DialogDescription>
                    </DialogHeader>
                    <TeamMemberForm
                        onSubmit={handleEditMember}
                        submitLabel="Update Member"
                        formData={formData}
                        setFormData={setFormData}
                        isSubmitting={isSubmitting}
                        onCancel={() => {
                            setIsEditDialogOpen(false);
                            setSelectedMember(null);
                            resetForm();
                        }}
                    />
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent className="rounded-none border-black">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete {selectedMember?.name} from your team.
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setSelectedMember(null)} className="rounded-none">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteMember}
                            className="bg-red-500 hover:bg-red-600 rounded-none"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default TeamManagement;
