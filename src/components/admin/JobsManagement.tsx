import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AddJobForm from "./AddJobForm";
import EditJobForm from "./EditJobForm";

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

const JobsManagement = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    if (!db) {
      setIsLoading(false);
      return;
    }

    const q = query(collection(db, "jobVacancies"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const jobsData: Job[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          jobsData.push({
            id: doc.id,
            ...data,
          } as Job);
        });
        setJobs(jobsData);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching jobs:", error);
        toast({
          title: "Error",
          description: "Failed to load job vacancies.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    if (!db) {
      toast({
        title: "Error",
        description: "Firebase is not configured.",
        variant: "destructive",
      });
      return;
    }

    try {
      await deleteDoc(doc(db, "jobVacancies", id));
      toast({
        title: "Success",
        description: "Job vacancy deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete job vacancy.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setIsEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditingJob(null);
    setIsEditDialogOpen(false);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading job vacancies...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Total job vacancies: <span className="font-semibold">{jobs.length}</span>
        </p>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Job Vacancy</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Job Vacancy</DialogTitle>
              <DialogDescription>Post a new job opening</DialogDescription>
            </DialogHeader>
            <AddJobForm onSuccess={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No job vacancies yet. Click "Add New Job Vacancy" to get started.
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell className="capitalize">{job.department.replace("-", " ")}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell className="capitalize">{job.type}</TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      job.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {job.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(job)}
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(job.id, job.title)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {editingJob && (
        <Dialog open={isEditDialogOpen} onOpenChange={handleEditClose}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Job Vacancy</DialogTitle>
              <DialogDescription>Update job vacancy information</DialogDescription>
            </DialogHeader>
            <EditJobForm 
              job={editingJob} 
              onSuccess={handleEditClose}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default JobsManagement;
