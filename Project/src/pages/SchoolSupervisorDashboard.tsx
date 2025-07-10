import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText } from 'lucide-react';
import Layout from '@/components/Layout';
import CreateEvaluationForm from '@/components/forms/CreateEvaluationForm';
import ReviewReportForm from '@/components/forms/ReviewReportForm';

const SchoolSupervisorDashboard = () => {
  const [showCreateEvaluationForm, setShowCreateEvaluationForm] = useState(false);
  const [showReviewReportForm, setShowReviewReportForm] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  // All dashboard data is now empty by default for new users
  const supervisedStudents: any[] = [];
  const recentReports: any[] = [];
  const upcomingEvaluations: any[] = [];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Needs Attention':
        return 'destructive';
      case 'Reviewed':
        return 'default';
      case 'Pending Review':
        return 'secondary';
      case 'Overdue':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-600';
      case 'Medium':
        return 'text-yellow-600';
      case 'Normal':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleCreateEvaluation = (data: any) => {
    console.log('Evaluation created:', data);
  };

  const handleReviewReport = (data: any) => {
    console.log('Report reviewed:', data);
  };

  const handleStartEvaluation = (studentName: string) => {
    setShowCreateEvaluationForm(true);
  };

  const handleReviewReportClick = (report: any) => {
    setSelectedReport(report);
    setShowReviewReportForm(true);
  };

  const handleGenerateReport = () => {
    console.log('Generating report...');
  };

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">School Supervisor Dashboard</h2>
            <p className="text-muted-foreground">
              Monitor and evaluate your supervised students
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowCreateEvaluationForm(true)}>
            <FileText className="mr-2 h-4 w-4" />
            Create Evaluation
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 border rounded-lg">
            <div className="text-2xl font-bold">{supervisedStudents.length}</div>
            <p className="text-sm text-muted-foreground">
              Currently active
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="text-2xl font-bold">
              {recentReports.filter(r => r.status === 'Pending Review').length}
            </div>
            <p className="text-sm text-muted-foreground">
              Need your review
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="text-2xl font-bold">N/A</div>
            <p className="text-sm text-muted-foreground">
              Overall student rating
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="text-2xl font-bold">{upcomingEvaluations.length}</div>
            <p className="text-sm text-muted-foreground">
              This week
            </p>
          </div>
        </div>

        {/* Remove My Students, Reports, Evaluations, Analytics Tabs */}
        <Tabs defaultValue="blank" className="space-y-4">
          <TabsList>
            <TabsTrigger value="blank">Blank</TabsTrigger>
          </TabsList>
          <TabsContent value="blank" className="space-y-4">
            <p className="text-sm text-muted-foreground">No data to display.</p>
          </TabsContent>
        </Tabs>

        {/* Forms */}
        {showCreateEvaluationForm && (
          <CreateEvaluationForm
            onClose={() => setShowCreateEvaluationForm(false)}
            onSubmit={handleCreateEvaluation}
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
      </div>
    </Layout>
  );
};

export default SchoolSupervisorDashboard;