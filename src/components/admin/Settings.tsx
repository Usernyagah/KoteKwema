import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Settings as SettingsIcon, Save, Bell, Shield, Palette, User, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
    const [user] = useAuthState(auth || ({} as any));
    const [siteName, setSiteName] = useState("Kote Kwema");
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [notifications, setNotifications] = useState(true);

    // Profile state
    const [displayName, setDisplayName] = useState("");
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

    // Security state
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

    useEffect(() => {
        if (user?.displayName) {
            setDisplayName(user.displayName);
        }
    }, [user]);

    const handleSaveGeneral = () => {
        toast({
            title: "Settings saved",
            description: "General configurations have been updated.",
        });
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth?.currentUser) return;

        setIsUpdatingProfile(true);
        try {
            await updateProfile(auth.currentUser, {
                displayName: displayName,
            });
            toast({
                title: "Profile updated",
                description: "Admin name has been updated successfully.",
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to update profile.",
                variant: "destructive",
            });
        } finally {
            setIsUpdatingProfile(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth?.currentUser) return;

        if (newPassword !== confirmPassword) {
            toast({
                title: "Error",
                description: "New passwords do not match.",
                variant: "destructive",
            });
            return;
        }

        setIsUpdatingPassword(true);
        try {
            // Re-authenticate first
            const credential = EmailAuthProvider.credential(auth.currentUser.email!, currentPassword);
            await reauthenticateWithCredential(auth.currentUser, credential);

            // Update password
            await updatePassword(auth.currentUser, newPassword);

            toast({
                title: "Password updated",
                description: "Your password has been changed successfully.",
            });
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.code === 'auth/wrong-password'
                    ? "Current password is incorrect."
                    : error.message || "Failed to update password.",
                variant: "destructive",
            });
        } finally {
            setIsUpdatingPassword(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                {/* General Settings */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <SettingsIcon className="h-5 w-5 text-primary" />
                            <CardTitle>General Settings</CardTitle>
                        </div>
                        <CardDescription>Basic website configuration.</CardDescription>
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
                        <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50/50 dark:bg-gray-800/20">
                            <div className="space-y-0.5">
                                <Label>Maintenance Mode</Label>
                                <p className="text-xs text-muted-foreground">Disable public access.</p>
                            </div>
                            <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSaveGeneral} className="w-full">
                            <Save className="mr-2 h-4 w-4" /> Save General Settings
                        </Button>
                    </CardFooter>
                </Card>

                {/* Profile Settings */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" />
                            <CardTitle>Admin Profile</CardTitle>
                        </div>
                        <CardDescription>Update your administrative details.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleUpdateProfile}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="adminName">Admin Name</Label>
                                <Input
                                    id="adminName"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    placeholder="Enter admin name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="adminEmail">Email Address</Label>
                                <Input
                                    id="adminEmail"
                                    value={user?.email || ""}
                                    disabled
                                    className="bg-gray-100 dark:bg-gray-800"
                                />
                                <p className="text-[10px] text-muted-foreground italic truncate">
                                    Email cannot be changed from this dashboard.
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full" disabled={isUpdatingProfile}>
                                {isUpdatingProfile ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" /> Update Profile
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                {/* Security Settings - Password Change */}
                <Card className="md:col-span-1">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Lock className="h-5 w-5 text-primary" />
                            <CardTitle>Change Password</CardTitle>
                        </div>
                        <CardDescription>Securing your administrative access.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleChangePassword}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Input
                                    id="currentPassword"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full" variant="destructive" disabled={isUpdatingPassword}>
                                {isUpdatingPassword ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                                    </>
                                ) : (
                                    <>
                                        <Shield className="mr-2 h-4 w-4" /> Update Password
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                {/* Other Settings Placeholder */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Bell className="h-5 w-5 text-primary" />
                                <CardTitle>Notifications</CardTitle>
                            </div>
                            <CardDescription>Configure alerts.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="space-y-0.5">
                                    <Label>Email Notifications</Label>
                                    <p className="text-xs text-muted-foreground">Receive email for new submissions.</p>
                                </div>
                                <Switch checked={notifications} onCheckedChange={setNotifications} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Palette className="h-5 w-5 text-primary" />
                                <CardTitle>Appearance</CardTitle>
                            </div>
                            <CardDescription>Customize look and feel.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">Branding options coming soon.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Settings;
