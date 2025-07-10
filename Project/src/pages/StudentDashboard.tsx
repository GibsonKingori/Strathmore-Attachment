import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  FileText, 
  Building2, 
  User, 
  Target,
  Plus,
  Search
} from 'lucide-react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/DashboardHeader';
import StatsCard from '@/components/StatsCard';
import ApplicationCard from '@/components/ApplicationCard';
import SubmitReportForm from '@/components/forms/SubmitReportForm';
import NewApplicationForm from '@/components/forms/NewApplicationForm';
import SearchOrganizationsForm from '@/components/forms/SearchOrganizationsForm';

const StudentDashboard = () => {
  const [showSubmitReportForm, setShowSubmitReportForm] = useState(false);
  const [showNewApplicationForm, setShowNewApplicationForm] = useState(false);
  const [showSearchOrganizationsForm, setShowSearchOrganizationsForm] = useState(false);

  // All dashboard data is now empty by default for new users
  const [activeApplications] = useState<any[]>([]);
  const [currentAttachment] = useState<any | null>(null);
  const [recentReports] = useState<any[]>([]);

  const handleSubmitReport = (data: any) => {
    console.log('Report submitted:', data);
  };

  const handleNewApplication = (data: any) => {
    console.log('Application submitted:', data);
  };

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <DashboardHeader
          title="Student Dashboard"
          description="Welcome back! Here's your attachment progress overview."
          actionButton={{
            label: "Submit Report",
            icon: FileText,
            onClick: () => setShowSubmitReportForm(true)
          }}
        />

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Active Applications"
            value={activeApplications.length.toString()}
            change=""
            icon={Building2}
            iconColor="text-muted-foreground"
          />
          <StatsCard
            title="Attachment Progress"
            value={currentAttachment ? `${currentAttachment.progress}%` : 'N/A'}
            change=""
            icon={Target}
            iconColor="text-muted-foreground"
          />
          <StatsCard
            title="Reports Submitted"
            value={currentAttachment ? `0/${currentAttachment.totalReports}` : '0/0'}
            change=""
            icon={FileText}
            iconColor="text-muted-foreground"
          />
          <StatsCard
            title="Overall Rating"
            value="N/A"
            change=""
            icon={User}
            iconColor="text-muted-foreground"
          />
        </div>

        {/* Remove Application History, Reports, Evaluations Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Current Attachment</CardTitle>
                  <CardDescription>Your ongoing attachment details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentAttachment ? (
                    <>
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold">{currentAttachment.organization}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{currentAttachment.position}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{currentAttachment.startDate} - {currentAttachment.endDate}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-muted-foreground">{currentAttachment.progress}%</span>
                        </div>
                        <Progress value={currentAttachment.progress} className="h-2" />
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">No current attachment found. Please apply for an attachment to see details here.</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Supervisors</CardTitle>
                  <CardDescription>Your assigned supervisors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentAttachment ? (
                    <>
                      <div className="space-y-2">
                        <span className="text-sm font-medium">School Supervisor</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <span>{currentAttachment.schoolSupervisor}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Host Supervisor</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-green-600" />
                          </div>
                          <span>{currentAttachment.hostSupervisor}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">No supervisor information available. Please check back later.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Forms */}
        {showSubmitReportForm && (
          <SubmitReportForm
            onClose={() => setShowSubmitReportForm(false)}
            onSubmit={handleSubmitReport}
          />
        )}

        {showNewApplicationForm && (
          <NewApplicationForm
            onClose={() => setShowNewApplicationForm(false)}
            onSubmit={handleNewApplication}
          />
        )}

        {showSearchOrganizationsForm && (
          <SearchOrganizationsForm
            onClose={() => setShowSearchOrganizationsForm(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export default StudentDashboard;