import SuccessPropt from '@/components/froms/SuccessPropt';
import MultiStepForm from '@/components/MultiStepForm'
import NavBar from '@/components/NavBar'
import { getMethod } from '@/services/API/ApiMethod';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Head from 'next/head';
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import Link from "next/link";
import { useAuth } from '@/contexts/AuthContext';

const GetStarted = () => {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const [userOrders, setUserOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  let initialForm = searchParams.get('form');
  
  // Handle case-insensitive form names and map to correct form keys
  if (initialForm) {
    const formParamLower = initialForm.toLowerCase();
    
    // Map URL parameter to form key
    if (formParamLower === 'calendlyform') {
      initialForm = 'calendly';
    } else if (formParamLower === 'checkoutform') {
      initialForm = 'checkout';
    } else if (formParamLower === 'licensedProvider') {
      initialForm = 'licensedProvider';
    }
  }

  const getOrderDetails = async () => {
    try {
      const res = await getMethod("/v1/order/user");
      if (res) {
        setUserOrders(res.data);
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      getOrderDetails();
    }
  }, [isSignedIn]);
  // Allow users to access the form without being logged in
  // Authentication will be handled within the MultiStepForm component

  return (
    <div>
      <Head><title>Get Started - MetabolixMD</title></Head>
      <NavBar />
      {userOrders ? (
        userOrders.length > 0 ? (
          <div className="multi-step-form py-10 mt-20 md:py-5 font-tt-hoves bg-[#ecf4f2]  min-h-screen flex flex-col justify-center items-center">
            <SuccessPropt type="2" />
          </div>
        ) : (
          <MultiStepForm initialForm={initialForm} />
        )
      ) : (
        <MultiStepForm initialForm={initialForm} />
      )}
    </div>
  );
}

export default GetStarted