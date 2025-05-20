import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useFirebaseAuth from "@/services/Auth/useFirebaseAuth";
import { toast } from "react-toastify";
import { setUser, setUserType } from "@/services/Auth/cookies";

const AuthForm = ({ onNext, initialMode = 'signup' }) => {
  const router = useRouter();
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const {
    loginWithEmailAndPassword,
    createUserWithEmailMethod,
    signInWithGoogle,
    forgotPassword,
  } = useFirebaseAuth();

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      let result;
      if (mode === "signup") {
        if (!email || !password) {
          toast.error("Please fill in all required fields");
          return;
        }
        result = await createUserWithEmailMethod(email, password);
      } else {
        if (!email || !password) {
          toast.error("Please enter your email and password");
          return;
        }
        result = await loginWithEmailAndPassword(email, password);
      }

      if (result.status) {
        let userType = "User";

        try {
          if (mode === "signup") {
            const onboardingResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/onBoarding`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${result.token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: name || email.split("@")[0],
                  email: email,
                }),
              }
            );

            if (!onboardingResponse.ok) {
              const errorData = await onboardingResponse.json();
              throw new Error(errorData.message || "Failed to create user profile");
            }
          }

          const myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${result.token}`);

          const resp = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/me`,
            {
              method: "GET",
              headers: myHeaders,
              redirect: "follow",
            }
          );

          if (!resp.ok) {
            const errorData = await resp.json();
            console.error("Error fetching user type:", errorData);
            throw new Error(errorData.message || "Failed to fetch user type");
          }

          const userData = await resp.json();
          if (userData?.data?.__t) {
            userType = userData.data.__t;
          }
        } catch (error) {
          console.error("Error in user setup:", error);
          toast.warn("Signed in successfully, but there was an issue setting up your profile");
        }

        setUser({
          uid: result.user.uid,
          email: result.user.email,
          name: result.user.displayName || name || email.split("@")[0],
          __t: userType,
        });

        setUserType(userType);

        toast.success(
          mode === "signup"
            ? "Account created successfully!"
            : "Signed in successfully!"
        );
        
        window.dispatchEvent(new Event("auth-state-changed"));
        onNext(result);
      } else {
        console.error("Authentication failed:", result.error);
        toast.error(
          result.error ||
            "Authentication failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error(
        error.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider) => {
    setLoading(true);

    try {
      let result;
      let userType;

      if (provider === "google") {
        result = await signInWithGoogle();
      }

      if (result.status) {
        try {
          const myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${result.token}`);

          const resp = await fetch(
            process.env.NEXT_PUBLIC_API_URL + "/v1/auth/me",
            {
              method: "GET",
              headers: myHeaders,
              redirect: "follow",
            }
          );
          const userData = await resp.json();
          if (userData?.data?.__t) {
            userType = userData.data.__t;
          }
        } catch (error) {
          console.error("Error fetching user type for social auth:", error);
        }

        setUser({
          uid: result.user.uid,
          email: result.user.email,
          name: result.user.displayName || result.user.email.split("@")[0],
          __t: userType,
        });

        setUserType(userType);

        toast.success("Signed in successfully!");
        window.dispatchEvent(new Event("auth-state-changed"));
        onNext(result);
      }
    } catch (error) {
      console.error("Social authentication error:", error);
      toast.error("Failed to sign in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    try {
      await forgotPassword(resetEmail);
      setShowForgotPassword(false);
      setResetEmail("");
      toast.success("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Failed to send reset email. Please try again.");
    } finally {
      setResetLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    // Reset form fields when switching modes
    setEmail("");
    setPassword("");
    setName("");
    setShowForgotPassword(false);
    setResetEmail("");
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full md:w-[30vw] space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
            {mode === "signin" ? "Welcome back" : "Great news, you’re eligible!"}
          </h2>
          <p className="mt-4 text-center text-xs text-gray-600">
            {mode === "signin" 
              ? "Sign in to access your account" 
              : "Once your account is created, you’re just a few quick steps away from a free appointment with a provider"}
          </p>
        </div>

        {!showForgotPassword ? (
          <form className="mt-8 space-y-6" onSubmit={handleEmailAuth}>
            <div className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
                    placeholder="Enter your full name"
                  />
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {mode === "signin" && (
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm font-medium text-primary hover:text-primary/80 transition duration-150 ease-in-out"
                >
                  Forgot your password?
                </button>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : mode === "signin" ? (
                  "Sign in"
                ) : (
                  "Create account"
                )}
              </button>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleForgotPassword}>
            <div>
              <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="reset-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
                placeholder="Enter your email"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetEmail("");
                }}
                className="text-sm font-medium text-gray-600 hover:text-gray-500 transition duration-150 ease-in-out"
              >
                Back to sign in
              </button>
              <button
                type="submit"
                disabled={resetLoading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resetLoading ? "Sending..." : "Send reset link"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => handleSocialAuth("google")}
              className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z"
                  fill="#4285F4"
                />
                <path
                  d="M12.24 24.0008C15.4764 24.0008 18.2058 22.9382 20.1944 21.1039L16.3274 18.1055C15.2516 18.8375 13.8626 19.252 12.2444 19.252C9.08276 19.252 6.46951 17.1399 5.52484 14.3003H1.54077V17.3912C3.55364 21.4434 7.70284 24.0008 12.24 24.0008Z"
                  fill="#34A853"
                />
                <path
                  d="M5.52477 14.3002C5.15177 13.3099 4.94751 12.2479 4.94751 11.1616C4.94751 10.0752 5.15177 9.01325 5.52477 8.02295V4.93201H1.5407C0.558577 6.92483 0 9.07867 0 11.1616C0 13.2445 0.558577 15.3983 1.5407 17.3912L5.52477 14.3002Z"
                  fill="#FBBC04"
                />
                <path
                  d="M12.24 3.11012C14.5374 3.11012 16.5783 3.98134 18.1144 5.56167L20.2694 3.40664C18.2021 1.44489 15.4767 0 12.24 0C7.70284 0 3.55364 2.55745 1.54077 6.60964L5.52484 9.70058C6.46951 6.86103 9.08276 4.74888 12.24 4.74888V3.11012Z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>

        <div className="text-center text-sm">
          {mode === "signin" ? (
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="font-medium text-primary hover:text-primary/80 transition duration-150 ease-in-out"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="font-medium text-primary hover:text-primary/80 transition duration-150 ease-in-out"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;