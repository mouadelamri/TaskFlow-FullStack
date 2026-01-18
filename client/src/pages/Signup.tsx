import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // <--- Zidna hadi

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // <--- Zidna hadi

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        name,
        email,
        password
      });

      // HNA FIN KAN L-MOCHKIL:
      // Daba ghan-sjjlo l-ma3loumat d l-user nishan f PC
      localStorage.setItem('user', JSON.stringify(response.data));

      alert('✅ T-sjjlti b najah! Marhba bik.');
      
      // W n-ddiwh nishan l Dashboard
      navigate('/dashboard'); 

    } catch (error) {
      alert('❌ Wa9a3 mochkil. Rbma l-email deja kayn.');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Inscription</h2>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-700">Smiya</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded mt-1"
              placeholder="Smiya dyalk"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              className="w-full p-2 border rounded mt-1"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              className="w-full p-2 border rounded mt-1"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            S'inscrire (w Dkhool)
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm">
           Deja 3ndk compte? <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/login')}>Se connecter</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;