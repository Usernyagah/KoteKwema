import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Building2, Briefcase, Mail, LogOut, MessageSquare, Users, Newspaper } from "lucide-react";
import PropertiesManagement from "@/components/admin/PropertiesManagement";
import JobsManagement from "@/components/admin/JobsManagement";
import EmailSubscriptions from "@/components/admin/EmailSubscriptions";
import ContactSubmissions from "@/components/admin/ContactSubmissions";
import TeamManagement from "@/components/admin/TeamManagement";
import NewsManagement from "@/components/admin/NewsManagement";

const AdminDashboard = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "projects";

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  useEffect(() => {
    if (!auth) {
      navigate("/admin/login");
      return;
    }
    if (!loading && !user) {
      navigate("/admin/login");
    }
  }, [user, loading, navigate]);

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Firebase is not configured. Please check your .env file.</div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      navigate("/admin/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">{user.email}</span>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="projects">
              <Building2 className="mr-2 h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="jobs">
              <Briefcase className="mr-2 h-4 w-4" />
              Job Vacancies
            </TabsTrigger>
            <TabsTrigger value="team">
              <Users className="mr-2 h-4 w-4" />
              Team Members
            </TabsTrigger>
            <TabsTrigger value="news">
              <Newspaper className="mr-2 h-4 w-4" />
              News
            </TabsTrigger>
            <TabsTrigger value="subscriptions">
              <Mail className="mr-2 h-4 w-4" />
              Email Subscriptions
            </TabsTrigger>
            <TabsTrigger value="contact">
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact Submissions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Projects Management</CardTitle>
                <CardDescription>View, add, edit, and delete projects</CardDescription>
              </CardHeader>
              <CardContent>
                <PropertiesManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle>Job Vacancies Management</CardTitle>
                <CardDescription>View, add, edit, and delete job vacancies</CardDescription>
              </CardHeader>
              <CardContent>
                <JobsManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle>Team Members Management</CardTitle>
                <CardDescription>
                  Add, edit, and remove team members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TeamManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news">
            <Card>
              <CardHeader>
                <CardTitle>News Management</CardTitle>
                <CardDescription>
                  Add, edit, and publish news articles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NewsManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscriptions">
            <Card>
              <CardHeader>
                <CardTitle>Email Subscriptions</CardTitle>
                <CardDescription>
                  Manage email newsletter subscriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EmailSubscriptions />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form Submissions</CardTitle>
                <CardDescription>
                  View and manage contact form submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactSubmissions />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
