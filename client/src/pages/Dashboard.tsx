import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Task {
  id: number;
  content: string;
  completed: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchTasks(parsedUser.id);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchTasks = async (userId: number) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks?userId=${userId}`);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks");
    }
  };

  const handleAddTask = async () => {
    if (!newTask.trim() || !user) return;
    try {
      await axios.post('http://localhost:5000/api/tasks', {
        content: newTask,
        userId: user.id
      });
      setNewTask('');
      fetchTasks(user.id);
    } catch (err) {
      alert("Error adding task");
    }
  };

  // --- HNA L-JADID (Delete) ---
  const handleDelete = async (taskId: number) => {
    if(!window.confirm("Wach bsse7 baghi tms7ha?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      if (user) fetchTasks(user.id); // Refresh
    } catch (err) {
      alert("Mochkil f l-mssi7");
    }
  };

  // --- HNA L-JADID (Toggle Complete) ---
  const handleToggle = async (taskId: number, currentStatus: boolean) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
        completed: !currentStatus
      });
      if (user) fetchTasks(user.id); // Refresh
    } catch (err) {
      alert("Mochkil f l-update");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">TaskFlow 🚀</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">Marhba, {user?.name}</span>
          <button onClick={handleLogout} className="text-red-500 font-medium hover:text-red-700">Déconnexion</button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto mt-10 p-6">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex gap-2">
          <input 
            type="text" 
            className="flex-1 p-2 border rounded focus:outline-none focus:border-blue-500"
            placeholder="Chnou baghi dir lyouma?"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <button onClick={handleAddTask} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            + Zid
          </button>
        </div>

        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">Mazal ma 3ndk hta tâche. Zid chi whda! 📝</p>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className={`bg-white p-4 rounded shadow flex justify-between items-center transition ${task.completed ? 'opacity-50' : ''}`}>
                
                {/* Click 3la Tâche bach t-cochiha */}
                <div 
                  onClick={() => handleToggle(task.id, task.completed)}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                    {task.completed && <span className="text-white text-sm">✓</span>}
                  </div>
                  <span className={`text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {task.content}
                  </span>
                </div>

                {/* Bouton Delete */}
                <button 
                  onClick={() => handleDelete(task.id)}
                  className="text-gray-400 hover:text-red-500 p-2 transition"
                  title="Mss7"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;