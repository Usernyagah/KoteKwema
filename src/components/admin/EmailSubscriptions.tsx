import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

interface Subscription {
  id: string;
  email: string;
  subscribedAt: Date;
}

const EmailSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Firebase is not configured. Please check your .env file.",
        variant: "destructive",
      });
      return;
    }

    const q = query(collection(db, "emailSubscriptions"), orderBy("subscribedAt", "desc"));
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const subs: Subscription[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          subs.push({
            id: doc.id,
            email: data.email,
            subscribedAt: data.subscribedAt?.toDate() || new Date(),
          });
        });
        setSubscriptions(subs);
        setIsLoading(false);
      },
      (error) => {
        toast({
          title: "Error",
          description: "Failed to load subscriptions.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Are you sure you want to remove ${email} from subscriptions?`)) {
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
      await deleteDoc(doc(db, "emailSubscriptions", id));
      toast({
        title: "Success",
        description: "Subscription removed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove subscription.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading subscriptions...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Total subscriptions: <span className="font-semibold">{subscriptions.length}</span>
        </p>
      </div>

      {subscriptions.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No email subscriptions yet.
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Subscribed At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-medium">{subscription.email}</TableCell>
                  <TableCell>
                    {subscription.subscribedAt.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(subscription.id, subscription.email)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default EmailSubscriptions;
