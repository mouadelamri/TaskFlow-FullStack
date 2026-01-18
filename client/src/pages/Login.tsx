import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });

      // 1. Khbbi l-user f LocalStorage (Bhal Cookies)
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // 2. Ddih l Dashboard nishan
      navigate('/dashboard'); 
      
    } catch (error) {
      alert('❌ Email aw Password ghalat');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Dkhool (Login)</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              className="w-full p-2 border rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              className="w-full p-2 border rounded mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Se Connecter
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm">
           Mazal ma mssjjl? <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/signup')}>Inscris-toi</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
