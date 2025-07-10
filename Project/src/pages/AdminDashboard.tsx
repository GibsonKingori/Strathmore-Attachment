import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Building2, 
  FileText, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  BarChart3,
  Plus,
  Eye,
  XCircle,
  Download,
  UserPlus,
  Edit,
  Settings as SettingsIcon,
  MapPin,
  Star
} from 'lucide-react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/DashboardHeader';
import StatsCard from '@/components/StatsCard';
import ApplicationCard from '@/components/ApplicationCard';
import AddOrganizationForm from '@/components/forms/AddOrganizationForm';
import AddStudentForm from '@/components/forms/AddStudentForm';
import StudentProfileForm from '@/components/forms/StudentProfileForm';
import EditStudentForm from '@/components/forms/EditStudentForm';
import AssignStudentForm from '@/components/forms/AssignStudentForm';
import OrganizationDetailsForm from '@/components/forms/OrganizationDetailsForm';
import EditOrganizationForm from '@/components/forms/EditOrganizationForm';
import ManageStudentsForm from '@/components/forms/ManageStudentsForm';
import ViewAllApplicationsForm from '@/components/forms/ViewAllApplicationsForm';
import ReviewApplicationForm from '@/components/forms/ReviewApplicationForm';
import CreateEvaluationForm from '@/components/forms/CreateEvaluationForm';
import EvaluationDetailsForm from '@/components/forms/EvaluationDetailsForm';
import MarkAttendanceForm from '@/components/forms/MarkAttendanceForm';
import SubmitReportForm from '@/components/forms/SubmitReportForm';
import ReviewReportForm from '@/components/forms/ReviewReportForm';
import StudentDetailsForm from '@/components/forms/StudentDetailsForm';

const AdminDashboard = () => {
  // Form visibility states
  const [showAddOrganizationForm, setShowAddOrganizationForm] = useState(false);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [showStudentProfileForm, setShowStudentProfileForm] = useState(false);
  const [showEditStudentForm, setShowEditStudentForm] = useState(false);
  const [showAssignStudentForm, setShowAssignStudentForm] = useState(false);
  const [showOrganizationDetailsForm, setShowOrganizationDetailsForm] = useState(false);
  const [showEditOrganizationForm, setShowEditOrganizationForm] = useState(false);
  const [showManageStudentsForm, setShowManageStudentsForm] = useState(false);
  const [showViewAllApplicationsForm, setShowViewAllApplicationsForm] = useState(false);
  const [showReviewApplicationForm, setShowReviewApplicationForm] = useState(false);
  const [showCreateEvaluationForm, setShowCreateEvaluationForm] = useState(false);
  const [showEvaluationDetailsForm, setShowEvaluationDetailsForm] = useState(false);
  const [showMarkAttendanceForm, setShowMarkAttendanceForm] = useState(false);
  const [showSubmitReportForm, setShowSubmitReportForm] = useState(false);
  const [showReviewReportForm, setShowReviewReportForm] = useState(false);
  const [showStudentDetailsForm, setShowStudentDetailsForm] = useState(false);
  
  // Selected items for forms
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedOrganization, setSelectedOrganization] = useState<any>(null);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [selectedStudentForEvaluation, setSelectedStudentForEvaluation] = useState('');

  // All dashboard data is now empty by default for new users
  const stats: any[] = [];
  const recentApplications: any[] = [];
  const students: any[] = [];
  const organizations: any[] = [];
  const evaluations: any[] = [];
  const reports: any[] = [];
  const systemAlerts: any[] = [];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'info':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  // Application handlers
  const handleReview = (id: number) => {
    const application = recentApplications.find(app => app.id === id);
    if (application) {
      setSelectedApplication(application);
      setShowReviewApplicationForm(true);
    }
  };

  const handleApprove = (id: number) => {
    console.log('Approving application:', id);
    // Update application status to approved
    const updatedApplications = recentApplications.map(app => 
      app.id === id ? { ...app, status: 'Approved' } : app
    );
    console.log('Application approved successfully');
  };

  const handleReject = (id: number) => {
    console.log('Rejecting application:', id);
    // Update application status to rejected
    const updatedApplications = recentApplications.map(app => 
      app.id === id ? { ...app, status: 'Rejected' } : app
    );
    console.log('Application rejected successfully');
  };

  const handleViewAll = () => {
    setShowViewAllApplicationsForm(true);
  };

  // Student handlers
  const handleAddStudent = (data: any) => {
    console.log('Student added:', data);
  };

  const handleViewProfile = (id: number) => {
    const student = students.find(s => s.id === id);
    if (student) {
      setSelectedStudent(student);
      setShowStudentProfileForm(true);
    }
  };

  const handleEditStudent = (id: number) => {
    const student = students.find(s => s.id === id);
    if (student) {
      setSelectedStudent(student);
      setShowEditStudentForm(true);
    }
  };

  const handleAssignStudent = (id: number) => {
    const student = students.find(s => s.id === id);
    if (student) {
      setSelectedStudent(student);
      setShowAssignStudentForm(true);
    }
  };

  const handleViewStudentDetails = (id: number) => {
    const student = students.find(s => s.id === id);
    if (student) {
      setSelectedStudent(student);
      setShowStudentDetailsForm(true);
    }
  };

  // Organization handlers
  const handleAddOrganization = (data: any) => {
    console.log('Organization added:', data);
  };

  const handleViewOrganizationDetails = (id: number) => {
    const organization = organizations.find(org => org.id === id);
    if (organization) {
      setSelectedOrganization(organization);
      setShowOrganizationDetailsForm(true);
    }
  };

  const handleEditOrganization = (id: number) => {
    const organization = organizations.find(org => org.id === id);
    if (organization) {
      setSelectedOrganization(organization);
      setShowEditOrganizationForm(true);
    }
  };

  const handleManageStudents = (id: number) => {
    const organization = organizations.find(org => org.id === id);
    if (organization) {
      setSelectedOrganization(organization);
      setShowManageStudentsForm(true);
    }
  };

  // Evaluation handlers
  const handleCreateEvaluation = (data: any) => {
    console.log('Evaluation created:', data);
  };

  const handleViewEvaluationDetails = (evaluation: any) => {
    setSelectedEvaluation(evaluation);
    setShowEvaluationDetailsForm(true);
  };

  const handleEvaluateStudent = (studentName: string) => {
    setSelectedStudentForEvaluation(studentName);
    setShowCreateEvaluationForm(true);
  };

  // Report handlers
  const handleSubmitReport = (data: any) => {
    console.log('Report submitted:', data);
  };

  const handleReviewReport = (data: any) => {
    console.log('Report reviewed:', data);
  };

  const handleReviewReportClick = (report: any) => {
    setSelectedReport(report);
    setShowReviewReportForm(true);
  };

  // Other handlers
  const handleMarkAttendance = (data: any) => {
    console.log('Attendance marked:', data);
  };

  const handleExportReport = () => {
    console.log('Generating comprehensive system report...');
    
    // Simulate report generation
    const reportData = {
      timestamp: new Date().toISOString(),
      totalStudents: stats[0].value,
      activeAttachments: stats[1].value,
      partnerOrganizations: stats[2].value,
      completionRate: stats[3].value,
      applications: recentApplications,
      students: students,
      organizations: organizations,
      evaluations: evaluations,
      reports: reports
    };

    // Create downloadable report
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `strathmore-attachment-system-report-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleReviewApplication = (data: any) => {
    console.log('Application reviewed:', data);
  };

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <DashboardHeader
          title="Administrator Dashboard"
          description="Manage and monitor the attachment system"
          actionButton={{
            label: "Add Organization",
            icon: Plus,
            onClick: () => setShowAddOrganizationForm(true)
          }}
        />

        <div className="flex space-x-2 mb-4">
          <Button variant="outline" onClick={handleExportReport}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline" onClick={() => setShowMarkAttendanceForm(true)}>
            <Clock className="mr-2 h-4 w-4" />
            Mark Attendance
          </Button>
          <Button variant="outline" onClick={() => setShowSubmitReportForm(true)}>
            <FileText className="mr-2 h-4 w-4" />
            Submit Report
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Show empty state if no stats */}
          {stats.length === 0 ? (
            <StatsCard
              title="No Data"
              value="N/A"
              change=""
              icon={BarChart3}
              iconColor="text-muted-foreground"
            />
          ) : (
            stats.map((stat) => (
              <StatsCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
                iconColor={stat.color}
              />
            ))
          )}
        </div>

        <Tabs defaultValue="applications" className="space-y-4">
          <TabsList>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
            <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="alerts">System Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Latest attachment applications requiring review</CardDescription>
                  </div>
                  <Button onClick={handleViewAll}>
                    <Eye className="mr-2 h-4 w-4" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((application) => (
                    <div key={application.id} className="p-4 border rounded-lg">
                      <ApplicationCard
                        application={application}
                        showReviewButton={true}
                        onReview={handleReview}
                      />
                      <div className="flex space-x-2 mt-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleReview(application.id)}
                        >
                          <Eye className="mr-1 h-4 w-4" />
                          Review
                        </Button>
                        {application.status === 'Pending Review' && (
                          <>
                            <Button size="sm" onClick={() => handleApprove(application.id)}>
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleReject(application.id)}>
                              <XCircle className="mr-1 h-4 w-4" />
                              Reject
                            </Button>
                          </>
                        )}
                        {application.status === 'Under Review' && (
                          <>
                            <Button size="sm" onClick={() => handleApprove(application.id)}>
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleReject(application.id)}>
                              <XCircle className="mr-1 h-4 w-4" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Student Directory</CardTitle>
                    <CardDescription>Manage all students in the system</CardDescription>
                  </div>
                  <Button onClick={() => setShowAddStudentForm(true)}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Student
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">ID: {student.studentId}</p>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                          <p className="text-sm text-muted-foreground">{student.course} - Year {student.year}</p>
                          <div className="mt-2">
                            <Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>
                              {student.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleViewProfile(student.id)}>
                            <Eye className="mr-1 h-4 w-4" />
                            View Profile
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleViewStudentDetails(student.id)}>
                            View Details
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleEditStudent(student.id)}>
                            <Edit className="mr-1 h-4 w-4" />
                            Edit
                          </Button>
                          <Button size="sm" onClick={() => handleAssignStudent(student.id)}>
                            Assign
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleEvaluateStudent(student.name)}>
                            Evaluate
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Organization:</span> {student.organization || 'Not assigned'}
                        </div>
                        <div>
                          <span className="font-medium">Supervisor:</span> {student.supervisor || 'Not assigned'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="organizations" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Organization Directory</CardTitle>
                    <CardDescription>Manage partner organizations</CardDescription>
                  </div>
                  <Button onClick={() => setShowAddOrganizationForm(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Organization
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {organizations.map((org) => (
                    <div key={org.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{org.name}</h3>
                            <Badge variant="secondary">{org.industry}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{org.rating}</span>
                          </div>
                          <Badge variant={org.status === 'Active' ? 'default' : 'destructive'}>
                            {org.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium">Contact Person</p>
                          <p className="text-sm text-muted-foreground">{org.contactPerson}</p>
                          <p className="text-xs text-muted-foreground">{org.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Location</p>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{org.location}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Capacity</p>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {org.activeStudents}/{org.totalCapacity} students
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          Phone: {org.phone}
                        </p>
                        <div className="space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleViewOrganizationDetails(org.id)}>
                            <Eye className="mr-1 h-4 w-4" />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleEditOrganization(org.id)}>
                            <Edit className="mr-1 h-4 w-4" />
                            Edit
                          </Button>
                          <Button size="sm" onClick={() => handleManageStudents(org.id)}>
                            <Users className="mr-1 h-4 w-4" />
                            Manage Students
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evaluations" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Student Evaluations</CardTitle>
                    <CardDescription>View and manage student evaluations</CardDescription>
                  </div>
                  <Button onClick={() => setShowCreateEvaluationForm(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Evaluation
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {evaluations.map((evaluation) => (
                    <div key={evaluation.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{evaluation.studentName}</h4>
                          <p className="text-sm text-muted-foreground">{evaluation.evaluationType}</p>
                          <p className="text-sm text-muted-foreground">Date: {evaluation.date}</p>
                          <p className="text-sm">Overall Rating: {evaluation.overallRating}/5</p>
                        </div>
                        <div className="space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleViewEvaluationDetails(evaluation)}>
                            <Eye className="mr-1 h-4 w-4" />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleViewEvaluationDetails(evaluation)}>
                            <Download className="mr-1 h-4 w-4" />
                            Download Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Student Reports</CardTitle>
                    <CardDescription>Review and manage student reports</CardDescription>
                  </div>
                  <Button onClick={() => setShowSubmitReportForm(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Submit Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{report.studentName}</h4>
                          <p className="text-sm text-muted-foreground">{report.title}</p>
                          <p className="text-sm text-muted-foreground">Submitted: {report.submittedDate}</p>
                          <Badge variant={report.status === 'Reviewed' ? 'default' : 'secondary'}>
                            {report.status}
                          </Badge>
                        </div>
                        <div className="space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleReviewReportClick(report)}>
                            Review
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="mr-1 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            {/* In analytics tab, render nothing or a message if no data */}
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>No data available</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-4">No analytics data to display. Please check back later.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Important notifications and system updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <p className="text-sm">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                      </div>
                      <Button size="sm" variant="ghost">
                        Dismiss
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* ALL FORMS - EVERY SINGLE ONE */}
        {showAddOrganizationForm && (
          <AddOrganizationForm
            onClose={() => setShowAddOrganizationForm(false)}
            onSubmit={handleAddOrganization}
          />
        )}

        {showAddStudentForm && (
          <AddStudentForm
            onClose={() => setShowAddStudentForm(false)}
            onSubmit={handleAddStudent}
          />
        )}

        {showStudentProfileForm && selectedStudent && (
          <StudentProfileForm
            onClose={() => {
              setShowStudentProfileForm(false);
              setSelectedStudent(null);
            }}
            student={selectedStudent}
          />
        )}

        {showEditStudentForm && selectedStudent && (
          <EditStudentForm
            onClose={() => {
              setShowEditStudentForm(false);
              setSelectedStudent(null);
            }}
            student={selectedStudent}
            onSubmit={(data) => {
              console.log('Student updated:', data);
              setShowEditStudentForm(false);
              setSelectedStudent(null);
            }}
          />
        )}

        {showAssignStudentForm && selectedStudent && (
          <AssignStudentForm
            onClose={() => {
              setShowAssignStudentForm(false);
              setSelectedStudent(null);
            }}
            onSubmit={(data) => {
              console.log('Student assigned:', data);
              setShowAssignStudentForm(false);
              setSelectedStudent(null);
            }}
          />
        )}

        {showOrganizationDetailsForm && selectedOrganization && (
          <OrganizationDetailsForm
            onClose={() => {
              setShowOrganizationDetailsForm(false);
              setSelectedOrganization(null);
            }}
            organization={selectedOrganization}
          />
        )}

        {showEditOrganizationForm && selectedOrganization && (
          <EditOrganizationForm
            onClose={() => {
              setShowEditOrganizationForm(false);
              setSelectedOrganization(null);
            }}
            organization={selectedOrganization}
            onSubmit={(data) => {
              console.log('Organization updated:', data);
              setShowEditOrganizationForm(false);
              setSelectedOrganization(null);
            }}
          />
        )}

        {showManageStudentsForm && selectedOrganization && (
          <ManageStudentsForm
            onClose={() => {
              setShowManageStudentsForm(false);
              setSelectedOrganization(null);
            }}
            organization={selectedOrganization}
          />
        )}

        {showViewAllApplicationsForm && (
          <ViewAllApplicationsForm
            onClose={() => setShowViewAllApplicationsForm(false)}
            applications={recentApplications}
            onReview={handleReview}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}

        {showReviewApplicationForm && selectedApplication && (
          <ReviewApplicationForm
            onClose={() => {
              setShowReviewApplicationForm(false);
              setSelectedApplication(null);
            }}
            application={selectedApplication}
            onSubmit={handleReviewApplication}
          />
        )}

        {showCreateEvaluationForm && (
          <CreateEvaluationForm
            onClose={() => {
              setShowCreateEvaluationForm(false);
              setSelectedStudentForEvaluation('');
            }}
            onSubmit={handleCreateEvaluation}
            studentName={selectedStudentForEvaluation}
          />
        )}

        {showEvaluationDetailsForm && selectedEvaluation && (
          <EvaluationDetailsForm
            onClose={() => {
              setShowEvaluationDetailsForm(false);
              setSelectedEvaluation(null);
            }}
            evaluation={selectedEvaluation}
          />
        )}

        {showMarkAttendanceForm && (
          <MarkAttendanceForm
            onClose={() => setShowMarkAttendanceForm(false)}
            onSubmit={handleMarkAttendance}
          />
        )}

        {showSubmitReportForm && (
          <SubmitReportForm
            onClose={() => setShowSubmitReportForm(false)}
            onSubmit={handleSubmitReport}
          />
        )}

        {showReviewReportForm && selectedReport && (
          <ReviewReportForm
            onClose={() => {
              setShowReviewReportForm(false);
              setSelectedReport(null);
            }}
            onSubmit={handleReviewReport}
            report={selectedReport}
          />
        )}

        {showStudentDetailsForm && selectedStudent && (
          <StudentDetailsForm
            onClose={() => {
              setShowStudentDetailsForm(false);
              setSelectedStudent(null);
            }}
            student={selectedStudent}
          />
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;