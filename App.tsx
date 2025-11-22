
import React, { useState } from 'react';
import { LayoutDashboard, Users, Calendar, Briefcase, FileText, Menu, X, BookOpenText } from 'lucide-react';
import { TeacherList } from './components/TeacherList';
import { ScheduleManager } from './components/ScheduleManager';
import { PKLManager } from './components/PKLManager';
import { ReportManager } from './components/ReportManager';
import { TeacherFormModal } from './components/TeacherFormModal';
import { CurriculumView } from './components/CurriculumView';
import { MOCK_TEACHERS, MOCK_SCHEDULE, MOCK_PKL, MOCK_REPORTS, SCHOOL_LOGO } from './constants';
import { ScheduleSlot, Teacher } from './types';

enum Tab {
  DASHBOARD = 'Dashboard',
  CURRICULUM = 'Struktur Kurikulum',
  TEACHERS = 'Data Guru',
  SCHEDULE = 'Jadwal',
  PKL = 'PKL',
  REPORTS = 'Laporan'
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  // State for data (simulated database)
  const [teachers, setTeachers] = useState<Teacher[]>(MOCK_TEACHERS);
  const [schedule, setSchedule] = useState(MOCK_SCHEDULE);
  const [pklList] = useState(MOCK_PKL);
  const [reports] = useState(MOCK_REPORTS);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const handleUpdateSchedule = (newSchedule: ScheduleSlot[]) => {
    setSchedule(newSchedule);
  };

  // CRUD Handlers for Teachers
  const handleAddTeacher = () => {
      setEditingTeacher(null);
      setIsModalOpen(true);
  };

  const handleEditTeacher = (teacher: Teacher) => {
      setEditingTeacher(teacher);
      setIsModalOpen(true);
  };

  const handleDeleteTeacher = (id: string) => {
      if (confirm('Apakah Anda yakin ingin menghapus data guru ini?')) {
          setTeachers(prev => prev.filter(t => t.id !== id));
      }
  };

  const handleSaveTeacher = (teacher: Teacher) => {
      if (editingTeacher) {
          // Edit Mode
          setTeachers(prev => prev.map(t => t.id === teacher.id ? teacher : t));
      } else {
          // Add Mode
          setTeachers(prev => [...prev, teacher]);
      }
      setIsModalOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.CURRICULUM:
        return <CurriculumView />;
      case Tab.TEACHERS:
        return (
            <TeacherList 
                teachers={teachers} 
                onAddTeacher={handleAddTeacher}
                onEditTeacher={handleEditTeacher}
                onDeleteTeacher={handleDeleteTeacher}
            />
        );
      case Tab.SCHEDULE:
        return <ScheduleManager teachers={teachers} currentSchedule={schedule} onUpdateSchedule={handleUpdateSchedule} />;
      case Tab.PKL:
        return <PKLManager pklList={pklList} teachers={teachers} />;
      case Tab.REPORTS:
        return <ReportManager reports={reports} teachers={teachers} />;
      case Tab.DASHBOARD:
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Dashboard Cards */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg text-blue-600"><Users size={24}/></div>
                    <span className="text-gray-400 text-sm">Total</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800">{teachers.length}</h3>
                <p className="text-gray-500 text-sm mt-1">Guru Aktif</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                    <div className="bg-purple-100 p-3 rounded-lg text-purple-600"><Calendar size={24}/></div>
                    <span className="text-gray-400 text-sm">Minggu Ini</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800">{schedule.length}</h3>
                <p className="text-gray-500 text-sm mt-1">Slot Terjadwal</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                    <div className="bg-orange-100 p-3 rounded-lg text-orange-600"><Briefcase size={24}/></div>
                    <span className="text-gray-400 text-sm">Sedang Berjalan</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800">{pklList.filter(p => p.status === 'Active').length}</h3>
                <p className="text-gray-500 text-sm mt-1">Siswa PKL</p>
            </div>
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                    <div className="bg-red-100 p-3 rounded-lg text-red-600"><FileText size={24}/></div>
                    <span className="text-gray-400 text-sm">Butuh Review</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800">{reports.filter(r => r.status === 'Sudah Dikumpulkan').length}</h3>
                <p className="text-gray-500 text-sm mt-1">Laporan Masuk</p>
            </div>

            {/* Welcome Section */}
            <div className="md:col-span-2 xl:col-span-4 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white mt-4 relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Selamat Datang, Kurikulum!</h1>
                    <p className="text-blue-100 max-w-2xl mb-6">
                        Gunakan menu di sebelah kiri untuk mulai mengelola data guru, menyusun jadwal otomatis dengan AI, atau memantau progres PKL siswa.
                    </p>
                    <button 
                        onClick={() => setActiveTab(Tab.SCHEDULE)}
                        className="bg-white text-blue-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                        Mulai Susun Jadwal
                    </button>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10">
                    <Calendar size={300} />
                </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
          <div className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-white border border-gray-100 overflow-hidden">
              <img src={SCHOOL_LOGO} alt="Logo" className="w-full h-full object-contain" />
            </div>
            Kurikulum.AI
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500">
            <X size={24} />
          </button>
        </div>
        
        <nav className="p-4 space-y-1">
            {[
                { id: Tab.DASHBOARD, icon: LayoutDashboard },
                { id: Tab.CURRICULUM, icon: BookOpenText },
                { id: Tab.TEACHERS, icon: Users },
                { id: Tab.SCHEDULE, icon: Calendar },
                { id: Tab.PKL, icon: Briefcase },
                { id: Tab.REPORTS, icon: FileText },
            ].map((item) => (
                <button
                    key={item.id}
                    onClick={() => {
                        setActiveTab(item.id);
                        if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        activeTab === item.id 
                        ? 'bg-blue-50 text-blue-700 shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                    <item.icon size={20} className={activeTab === item.id ? 'text-blue-600' : 'text-gray-400'} />
                    {item.id}
                </button>
            ))}
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center gap-3">
                <img src={SCHOOL_LOGO} alt="School" className="w-10 h-10 bg-white object-contain p-1 rounded-full border-2 border-gray-100 shadow-sm" />
                <div>
                    <div className="text-sm font-bold text-gray-800">Waka Kurikulum</div>
                    <div className="text-xs text-gray-500">SMKN 1 Purbalingga</div>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 justify-between lg:justify-end">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500">
                <Menu size={24} />
            </button>
            <div className="flex items-center gap-4">
               <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">v1.2.0 (Struktur Kurikulum)</span>
            </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
            {renderContent()}
        </main>
      </div>

      {/* Teacher Form Modal */}
      <TeacherFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTeacher}
        initialData={editingTeacher}
      />
      
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default App;
