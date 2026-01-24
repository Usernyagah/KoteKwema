import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

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
  createdAt: Date;
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
        submissionsData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate()
        } as ContactSubmission);
      });
      setSubmissions(submissionsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="p-4">Loading submissions...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Contact Form Submissions</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No submissions found
                </TableCell>
              </TableRow>
            ) : (
              submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>
                    {submission.createdAt
                      ? format(new Date(submission.createdAt), "PPpp")
                      : "N/A"}
                  </TableCell>
                  <TableCell>{submission.name}</TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell>{submission.phone || "N/A"}</TableCell>
                  <TableCell className="capitalize">
                    {submission.formType || "General"}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {submission.message}
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
