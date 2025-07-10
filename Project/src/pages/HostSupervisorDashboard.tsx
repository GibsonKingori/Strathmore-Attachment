import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  Calendar,
  FileText,
  TrendingUp,
  Plus,
  UserPlus
} from 'lucide-react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/DashboardHeader';
import StatsCard from '@/components/StatsCard';
import StudentCard from '@/components/StudentCard';
import MarkAttendanceForm from '@/components/forms/MarkAttendanceForm';
import CreateEvaluationForm from '@/components/forms/CreateEvaluationForm';
import AssignStudentForm from '@/components/forms/AssignStudentForm';
import StudentDetailsForm from '@/components/forms/StudentDetailsForm';

function HostSupervisorDashboard() {
  const [showMarkAttendanceForm, setShowMarkAttendanceForm] = useState(false);
  const [showCreateEvaluationForm, setShowCreateEvaluationForm] = useState(false);
  const [showAssignStudentForm, setShowAssignStudentForm] = useState(false);
  const [showStudentDetailsForm, setShowStudentDetailsForm] = useState(false);
  const [selectedStudentForEvaluation, setSelectedStudentForEvaluation] = useState<string>('');
  const [selectedStudentForDetails, setSelectedStudentForDetails] = useState<any>(null);

  // All dashboard data is now empty by default for new users
  const students: any[] = [];
  const todayAttendance: any[] = [];
  const recentEvaluations: any[] = [];
  const pendingEvaluations: any[] = [];
  const averageAttendance = 0;
  const presentToday = 0;

  function handleViewDetails(id: number) {
    const student = students.find(s => s.id === id);
    if (student) {
      setSelectedStudentForDetails(student);
      setShowStudentDetailsForm(true);
    }
  }

  function handleEvaluate(id: number) {
    const student = students.find(s => s.id === id);
    if (student) {
      setSelectedStudentForEvaluation(student.name);
      setShowCreateEvaluationForm(true);
    }
  }

  function handleMarkAttendance(data: any) {
    console.log('Attendance marked:', data);
  }

  function handleCreateEvaluation(data: any) {
    console.log('Evaluation created:', data);
  }

  function handleAssignStudent(data: any) {
    console.log('Student assigned:', data);
  }

  function handleStartEvaluation(studentName: string) {
    setSelectedStudentForEvaluation(studentName);
    setShowCreateEvaluationForm(true);
  }

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <DashboardHeader
          title="Host Supervisor Dashboard"
          description="Monitor student attendance and performance at your organization"
          actionButton={{
            label: "Record Attendance",
            icon: FileText,
            onClick: () => setShowMarkAttendanceForm(true)
          }}
        />
        {/* Hide Quick Stats and Tabs if all data is empty */}
        {students.length > 0 || todayAttendance.length > 0 || recentEvaluations.length > 0 || pendingEvaluations.length > 0 ? (
          <>
            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Assigned Students"
                value="0"
                change=""
                icon={Users}
                iconColor="text-muted-foreground"
              />
              <StatsCard
                title="Today's Attendance"
                value="0/0"
                change=""
                icon={CheckCircle}
                iconColor="text-muted-foreground"
              />
              <StatsCard
                title="Avg Attendance Rate"
                value="N/A"
                change=""
                icon={TrendingUp}
                iconColor="text-muted-foreground"
              />
              <StatsCard
                title="Pending Evaluations"
                value="0"
                change=""
                icon={Calendar}
                iconColor="text-muted-foreground"
              />
            </div>

            {/* Tabs for My Students, Attendance Management, Student Evaluations, all blank */}
            <Tabs defaultValue="students" className="space-y-4">
              <TabsList>
                <TabsTrigger value="students">My Students</TabsTrigger>
                <TabsTrigger value="attendance">Attendance Management</TabsTrigger>
                <TabsTrigger value="evaluations">Student Evaluations</TabsTrigger>
              </TabsList>
              <TabsContent value="students" className="space-y-4">
                <p className="text-sm text-muted-foreground">No students assigned yet.</p>
              </TabsContent>
              <TabsContent value="attendance" className="space-y-4">
                <p className="text-sm text-muted-foreground">No attendance records for today.</p>
              </TabsContent>
              <TabsContent value="evaluations" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Pending Evaluations</CardTitle>
                          <CardDescription>Evaluations that need to be completed</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">No pending evaluations.</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Evaluations</CardTitle>
                      <CardDescription>Performance evaluations for your students</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">No recent evaluations.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </>
        ) : null}

        {/* Forms */}
        {showMarkAttendanceForm && (
          <MarkAttendanceForm
            onClose={() => setShowMarkAttendanceForm(false)}
            onSubmit={handleMarkAttendance}
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

        {showAssignStudentForm && (
          <AssignStudentForm
            onClose={() => setShowAssignStudentForm(false)}
            onSubmit={handleAssignStudent}
          />
        )}

        {showStudentDetailsForm && selectedStudentForDetails && (
          <StudentDetailsForm
            onClose={() => {
              setShowStudentDetailsForm(false);
              setSelectedStudentForDetails(null);
            }}
            student={selectedStudentForDetails}
          />
        )}
      </div>
    </Layout>
  );
}

export default HostSupervisorDashboard;