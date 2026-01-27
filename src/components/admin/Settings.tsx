import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Settings as SettingsIcon, Save, Bell, Shield, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
    const [siteName, setSiteName] = useState("Foster Clone");
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [notifications, setNotifications] = useState(true);

    const handleSave = () => {
        toast({
            title: "Settings saved",
            description: "Your changes have been saved successfully.",
        });
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <SettingsIcon className="h-5 w-5" />
                            <CardTitle>General Settings</CardTitle>
                        </div>
                        <CardDescription>
                            Basic configuration for your website.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="siteName">Site Name</Label>
                            <Input
                                id="siteName"
                                value={siteName}
                                onChange={(e) => setSiteName(e.target.value)}
                                placeholder="Enter site name"
                            />
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="space-y-0.5">
                                <Label>Maintenance Mode</Label>
                                <p className="text-xs text-muted-foreground">
                                    Disable public access to the site.
                                </p>
                            </div>
                            <Switch
                                checked={maintenanceMode}
                                onCheckedChange={setMaintenanceMode}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSave} className="w-full">
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            <CardTitle>Notifications</CardTitle>
                        </div>
                        <CardDescription>
                            Configure how you receive alerts.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="space-y-0.5">
                                <Label>Email Notifications</Label>
                                <p className="text-xs text-muted-foreground">
                                    Receive email for new contact submissions.
                                </p>
                            </div>
                            <Switch
                                checked={notifications}
                                onCheckedChange={setNotifications}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Palette className="h-5 w-5" />
                            <CardTitle>Appearance</CardTitle>
                        </div>
                        <CardDescription>
                            Customize the look and feel of your dashboard.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Theme settings and branding options will be available soon.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            <CardTitle>Security</CardTitle>
                        </div>
                        <CardDescription>
                            Manage security preferences.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Two-factor authentication and session management.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Settings;
