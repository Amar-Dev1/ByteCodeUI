import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const SetUsernamePage = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { session, refreshUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    
    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await axios.patch(
        'http://localhost:3000/auth/profile',
        { username },
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      
      await refreshUser();
      navigate('/community');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to set username. It may already be taken.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-[95%] lg:w-[80%] max-w-md bg-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3 hover:rotate-6 transition-transform shadow-lg">
            <span className="text-3xl font-bold text-white">{"{ }"}</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Choose a Username</h1>
          <p className="text-gray-400">This is how others will see you in the ByteCode community.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Username</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors">
                               <span className='material-symbols-outlined'>person</span>

                {/* <FiUser /> */}
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-background/50 border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                placeholder="developer123"
                required
              />
            </div>
            {error && <p className="text-red-400 text-sm mt-2 ml-1 animate-fade-in">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(var(--color-primary),0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center group"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Continue</span>
                <span className='material-symbols-outlined'>arrow_forward</span>
                {/* <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" /> */}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetUsernamePage;
