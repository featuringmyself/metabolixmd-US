import SuccessPropt from '@/components/froms/SuccessPropt';
import MultiStepForm from '@/components/MultiStepForm'
import NavBar from '@/components/NavBar'
import { getMethod } from '@/services/API/ApiMethod';
import useFirebaseAuth from '@/services/Auth/useFirebaseAuth';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import Link from "next/link";

const GetStarted = () => {
  const { user, createUserWithEmailMethod, loginWithEmailAndPassword } = useFirebaseAuth();
  const [userOrders, setUserOrders] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const getOrderDetails = async () => {
    try {
      const res = await getMethod("/order/user");
      if (res) {
        setUserOrders(res.data);
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    if (user) {
      getOrderDetails();
    }
  }, [user]);
  if (!user) {
    return (
      <div>
        <Head><title>Get Started - MetabolixMD</title></Head>
        <NavBar />
        <div className="multi-step-form py-10 mt-20 md:py-5 font-tt-hoves bg-[#d3d2cc] min-h-screen flex flex-col justify-center items-center">
          <form onSubmit={async (e) => {
            e.preventDefault();
            if (!isLogin && password !== confirmPassword) {
              toast.error("Passwords do not match");
              return;
            }
            setLoading(true);
            try {
              if (isLogin) {
                await loginWithEmailAndPassword(email, password);
              } else {
                await createUserWithEmailMethod(email, password);
              }
            } catch (error) {
              toast.error(error.message);
            } finally {
              setLoading(false);
            }
          }} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {isLogin ? 'Login to Continue' : 'Create Account'}
            </h2>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            {!isLogin && (
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors flex justify-center items-center"
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color="#ffffff" /> : (isLogin ? 'Login' : 'Sign Up')}
            </button>
            <p className="mt-4 text-center text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-medium hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Head><title>Get Started - MetabolixMD</title></Head>
      <NavBar />
      {userOrders ? (
        userOrders.length > 0 ? (
          <div className="multi-step-form py-10 mt-20 md:py-5 font-tt-hoves bg-[#d3d2cc]  min-h-screen flex flex-col justify-center items-center">
            <SuccessPropt type="2" />
          </div>
        ) : (
          <MultiStepForm />
        )
      ) : (
        <MultiStepForm />
      )}
    </div>
  );
}

export default GetStarted