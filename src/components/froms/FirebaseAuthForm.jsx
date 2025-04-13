import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import useFirebaseAuth from '@/services/Auth/useFirebaseAuth';
import { toast } from 'react-toastify';

const FirebaseAuthForm = ({ onNext, mode = 'signin' }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const recaptchaContainerRef = useRef(null);
  
  const {
    loginWithEmailAndPassword,
    createUserWithEmailMethod,
    signInWithGoogle,
    signInWithFacebook,
    signInWithApple,
    initializeRecaptcha,
    phoneSignIn,
    confirmCode
  } = useFirebaseAuth();

  // Initialize recaptcha when component mounts
  React.useEffect(() => {
    if (recaptchaContainerRef.current) {
      initializeRecaptcha(recaptchaContainerRef.current);
    }
  }, [initializeRecaptcha]);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let result;
      
      if (mode === 'signin') {
        result = await loginWithEmailAndPassword(email, password);
      } else {
        result = await createUserWithEmailMethod(email, password);
      }
      
      if (result.status) {
        // Import the setUser function
        const { setUser } = await import('@/services/Auth/cookies');
        
        // Set user data in cookies
        setUser({
          uid: result.user.uid,
          email: result.user.email,
          name: result.user.displayName || email.split('@')[0]
        });
        
        toast.success(`${mode === 'signin' ? 'Signed in' : 'Account created'} successfully!`);
        console.log('User ID:', result.user.uid);
        window.dispatchEvent(new Event('auth-state-changed'));
        onNext({});
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider) => {
    setLoading(true);
    
    try {
      let result;
      
      switch (provider) {
        case 'google':
          result = await signInWithGoogle();
          break;
        case 'facebook':
          result = await signInWithFacebook();
          break;
        case 'apple':
          result = await signInWithApple();
          break;
        default:
          throw new Error('Invalid provider');
      }
      
      if (result.status) {
        // Import the setUser function
        const { setUser } = await import('@/services/Auth/cookies');
        
        // Set user data in cookies
        setUser({
          uid: result.user.uid,
          email: result.user.email,
          name: result.user.displayName || result.user.email.split('@')[0]
        });
        
        toast.success('Signed in successfully!');
        console.log('User ID:', result.user.uid);
        window.dispatchEvent(new Event('auth-state-changed'));
        onNext({});
      }
    } catch (error) {
      console.error('Social authentication error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {mode === 'signin' ? 'Sign In' : 'Create Account'}
      </h2>
      
      <form onSubmit={handleEmailAuth} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            mode === 'signin' ? 'Sign In' : 'Create Account'
          )}
        </button>
      </form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => handleSocialAuth('google')}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
            </svg>
          </button>
          
          <button
            type="button"
            onClick={() => handleSocialAuth('facebook')}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button
            type="button"
            onClick={() => handleSocialAuth('apple')}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm">
        {mode === 'signin' ? (
          <p>
            Don't have an account?{' '}
            <button 
              type="button"
              onClick={() => {
                // Toggle mode within the modal instead of redirecting
                const event = new CustomEvent('toggleAuthMode', { detail: 'signup' });
                window.dispatchEvent(event);
              }}
              className="text-primary hover:text-primary/80 font-medium"
            >
              Sign up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <button 
              type="button"
              onClick={() => {
                // Toggle mode within the modal instead of redirecting
                const event = new CustomEvent('toggleAuthMode', { detail: 'signin' });
                window.dispatchEvent(event);
              }}
              className="text-primary hover:text-primary/80 font-medium"
            >
              Sign in
            </button>
          </p>
        )}
      </div>
      
      {/* Hidden recaptcha container for phone authentication */}
      <div id="recaptcha-container" ref={recaptchaContainerRef}></div>
    </div>
  );
};

export default FirebaseAuthForm;