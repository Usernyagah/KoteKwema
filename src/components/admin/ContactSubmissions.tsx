import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Check, X, Clock } from "lucide-react";

type Status = 'new' | 'contacted' | 'completed' | 'spam';

const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  spam: 'bg-red-100 text-red-800',
};

const statusIcons = {
  new: <Clock className="h-4 w-4" />,
  contacted: <Clock className="h-4 w-4" />,
  completed: <Check className="h-4 w-4" />,
  spam: <X className="h-4 w-4" />,
};

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  formType: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

export default function ContactSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "contactSubmissions"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const submissionsData: ContactSubmission[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        submissionsData.push({
          ...data,
          id: doc.id,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate()
        } as ContactSubmission);
      });
      setSubmissions(submissionsData);
      setLoading(false);
    }, (error) => {
      toast({
        title: "Error fetching submissions",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (id: string, status: Status) => {
    try {
      await updateDoc(doc(db, "contactSubmissions", id), {
        status,
        updatedAt: new Date()
      });
    } catch (error) {
      toast({
        title: "Error updating status",
        description: "Failed to update submission status",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="p-4">Loading submissions...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Contact Form Submissions</h2>
        <div className="text-sm text-gray-500">
          {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No submissions found
                </TableCell>
              </TableRow>
            ) : (
              submissions.map((submission) => (
                <TableRow key={submission.id} className="hover:bg-gray-50">
                  <TableCell className="whitespace-nowrap">
                    <div className="text-sm">
                      {submission.createdAt
                        ? format(new Date(submission.createdAt), "MMM d, yyyy")
                        : "N/A"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {submission.createdAt
                        ? format(new Date(submission.createdAt), "h:mm a")
                        : ""}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {submission.name}
                    <div className="text-sm text-gray-500 capitalize">
                      {submission.formType || "General"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{submission.email}</div>
                    <div className="text-sm text-gray-500">
                      {submission.phone || "No phone"}
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">
                    {submission.formType || "General"}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${statusColors[submission.status]} capitalize`}>
                      {statusIcons[submission.status]}
                      <span className="ml-1">{submission.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="line-clamp-2">{submission.message}</div>
                    {(submission.projectType || submission.budget || submission.timeline) && (
                      <div className="mt-3 space-y-1 text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-100">
                        {submission.projectType && (
                          <div className="grid grid-cols-[60px_1fr] gap-2">
                            <span className="font-medium text-gray-700 uppercase tracking-wider text-[10px]">Project</span>
                            <span>{submission.projectType}</span>
                          </div>
                        )}
                        {submission.budget && (
                          <div className="grid grid-cols-[60px_1fr] gap-2">
                            <span className="font-medium text-gray-700 uppercase tracking-wider text-[10px]">Budget</span>
                            <span>{submission.budget}</span>
                          </div>
                        )}
                        {submission.timeline && (
                          <div className="grid grid-cols-[60px_1fr] gap-2">
                            <span className="font-medium text-gray-700 uppercase tracking-wider text-[10px]">Timeline</span>
                            <span>{submission.timeline}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => updateStatus(submission.id, 'contacted')}
                          className="flex items-center"
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          Mark as Contacted
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateStatus(submission.id, 'completed')}
                          className="flex items-center"
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Mark as Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateStatus(submission.id, 'spam')}
                          className="flex items-center text-red-600"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Mark as Spam
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
