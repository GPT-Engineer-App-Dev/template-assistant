import React from 'react';
import { SupabaseAuthUI } from '../integrations/supabase/auth.jsx';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '../integrations/supabase/auth.jsx';

const Login = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex items-center justify-center">
        <SupabaseAuthUI />
      </div>
      <div className="w-1/2 bg-gray-200 flex items-center justify-center">
        <img src="/placeholder-image.jpg" alt="Placeholder" className="w-3/4 h-3/4 object-cover" />
      </div>
    </div>
  );
};

export default Login;