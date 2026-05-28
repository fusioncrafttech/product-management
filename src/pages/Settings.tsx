import { useState } from "react";
import toast from "react-hot-toast";
import { Save, Building2, Bell, Palette, Lock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/common/PageHeader";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { FormField } from "@/components/common/FormField";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useTheme } from "@/hooks/useTheme";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { errors, touched, validateAll, setFieldTouched, reset } = useFormValidation({
    currentPassword: { required: true, minLength: 6 },
    newPassword: { required: true, minLength: 8, custom: (val) => {
      if (!/[A-Z]/.test(val)) return "Must contain an uppercase letter";
      if (!/[0-9]/.test(val)) return "Must contain a number";
      return undefined;
    }},
    confirmPassword: { required: true, custom: (val) => {
      if (val !== passwordForm.newPassword) return "Passwords do not match";
      return undefined;
    }},
  });

  const updatePasswordField = (field: keyof typeof passwordForm, value: string) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdatePassword = () => {
    if (!validateAll(passwordForm)) return;
    toast.success("Password updated successfully");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    reset();
  };

  const isPasswordFormEmpty = !passwordForm.currentPassword && !passwordForm.newPassword;

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your clinic settings and preferences" />

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="profile">
            <Building2 className="mr-2 h-4 w-4 hidden sm:inline" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4 hidden sm:inline" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="mr-2 h-4 w-4 hidden sm:inline" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="mr-2 h-4 w-4 hidden sm:inline" />
            Security
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4 hidden sm:inline" />
            Users
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <AnimatedSection>
            <Card>
              <CardHeader>
                <CardTitle>Clinic Profile</CardTitle>
                <CardDescription>Update your clinic information and contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="clinic-name">Clinic Name</Label>
                    <Input id="clinic-name" defaultValue="DentaCare Dental Clinic" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="clinic-email">Email</Label>
                    <Input id="clinic-email" type="email" defaultValue="info@dentacare.com" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="clinic-phone">Phone</Label>
                    <Input id="clinic-phone" defaultValue="+1 (555) 100-2000" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="clinic-website">Website</Label>
                    <Input id="clinic-website" defaultValue="www.dentacare.com" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="clinic-address">Address</Label>
                  <Textarea id="clinic-address" defaultValue="123 Healthcare Avenue, Medical District, NY 10001" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="opening-hours">Opening Hours</Label>
                    <Input id="opening-hours" defaultValue="Mon-Fri: 8:00 AM - 6:00 PM" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="est">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="est">Eastern Time (EST)</SelectItem>
                        <SelectItem value="cst">Central Time (CST)</SelectItem>
                        <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                        <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={() => toast.success("Settings saved successfully")}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </AnimatedSection>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <AnimatedSection>
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { label: "Email Notifications", description: "Receive email notifications for new appointments", defaultChecked: true },
                  { label: "SMS Notifications", description: "Send SMS reminders to patients", defaultChecked: true },
                  { label: "Appointment Reminders", description: "Send reminders 24 hours before appointments", defaultChecked: true },
                  { label: "Payment Alerts", description: "Get notified for overdue payments", defaultChecked: false },
                  { label: "New Inquiry Alerts", description: "Notify when new patient inquiries arrive", defaultChecked: true },
                  { label: "Staff Attendance Alerts", description: "Alert for late or absent staff", defaultChecked: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch defaultChecked={item.defaultChecked} />
                  </div>
                ))}
                <Button onClick={() => toast.success("Notification preferences saved")}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </AnimatedSection>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <AnimatedSection>
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>Customize the appearance of the dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="font-medium text-foreground">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">Toggle between light and dark theme</p>
                  </div>
                  <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
                </div>
                <div className="grid gap-2">
                  <Label>Primary Color</Label>
                  <div className="flex gap-3">
                    {["#2563eb", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444", "#ec4899"].map((color) => (
                      <button
                        key={color}
                        className="h-8 w-8 rounded-full border-2 border-transparent hover:border-foreground/50 transition-colors"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Font Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <AnimatedSection>
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField label="Current Password" htmlFor="current-password" required error={errors.currentPassword} touched={touched.currentPassword}>
                  <Input
                    id="current-password"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => updatePasswordField("currentPassword", e.target.value)}
                    onBlur={() => setFieldTouched("currentPassword", passwordForm.currentPassword)}
                    className={touched.currentPassword && errors.currentPassword ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                </FormField>
                <FormField label="New Password" htmlFor="new-password" required error={errors.newPassword} touched={touched.newPassword}>
                  <Input
                    id="new-password"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => updatePasswordField("newPassword", e.target.value)}
                    onBlur={() => setFieldTouched("newPassword", passwordForm.newPassword)}
                    className={touched.newPassword && errors.newPassword ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                </FormField>
                <FormField label="Confirm New Password" htmlFor="confirm-password" required error={errors.confirmPassword} touched={touched.confirmPassword}>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => updatePasswordField("confirmPassword", e.target.value)}
                    onBlur={() => setFieldTouched("confirmPassword", passwordForm.confirmPassword)}
                    className={touched.confirmPassword && errors.confirmPassword ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                </FormField>
                <Button onClick={handleUpdatePassword} disabled={isPasswordFormEmpty}>
                  <Lock className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </CardContent>
            </Card>
          </AnimatedSection>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <AnimatedSection>
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage staff accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Admin User", email: "admin@dentacare.com", role: "Admin" },
                    { name: "Dr. Michael Chen", email: "michael.chen@dentacare.com", role: "Doctor" },
                    { name: "Jessica Adams", email: "jessica.a@dentacare.com", role: "Nurse" },
                    { name: "Reception Staff", email: "reception@dentacare.com", role: "Staff" },
                  ].map((user) => (
                    <div key={user.email} className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <span className="text-sm font-semibold text-primary">
                            {user.name.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{user.role}</span>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </TabsContent>
      </Tabs>
    </div>
  );
}
