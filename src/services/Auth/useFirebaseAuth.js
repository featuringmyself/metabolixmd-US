"use client";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    updateProfile,
    signOut,
    signInWithPopup,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from "firebase/auth";
import { auth, googleProvider } from './firebaseConfigue';
import { setToken, removeToken, removeUser, removeFcmToken, removeSupportRoomId } from "./cookies";
import { firebaseErrorFinder } from "./firebaseErrors";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useEffect } from 'react';

export default function useFirebaseAuth() {
    const router = useRouter();
    const recaptchaVerifierRef = useRef(null);
    const confirmationResultRef = useRef(null);
    const createUserWithEmailMethod = async (email, password) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            //  Send a verification email
            // await sendEmailVerification(auth.currentUser)
            // Set up the cookie expiry time
            const expiryTime = new Date(Date.now() + 3600 * 1000);
            // Set the cookie
            const token = auth.currentUser.accessToken;
            setToken(token, expiryTime);
            localStorage.setItem('token', token);
            return { status: true, user: auth.currentUser, token: token, expiryTime: expiryTime };
        }
        catch (e) {
            const error = firebaseErrorFinder(e);
            toast.error(error, {
                toastId: "firebase-error"
            })
            return { status: false, error: error }
        }
    }
    const resendEmailVerificationLink = async () => {
        try {
            await sendEmailVerification(auth.currentUser)
            toast.success("Verification link has been resend successfully", {
                toastId: "verification-email-resend"
            })
        }
        catch (e) {
            const error = firebaseErrorFinder(e);
            toast.error(error, {
                toastId: "firebase-verification-email-resend-error"
            })
        }
    }

    const loginWithEmailAndPassword = async (email, password, redirect = "") => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            if (!res.user) {
                throw new Error('No user returned from authentication');
            }

            // Force token refresh to ensure we have the latest token
            const token = await res.user.getIdToken(true);
            const expiryTime = new Date(Date.now() + 3600 * 1000); // 1 hour expiry

            // Validate token format
            if (!token || typeof token !== 'string' || token.trim() === '') {
                throw new Error('Invalid token received from authentication');
            }

            // Set the token in cookie and localStorage
            setToken(token, expiryTime);
            localStorage.setItem('token', token);

            // Log success but not the actual token
            console.log('Authentication successful for:', email);

            return { 
                status: true, 
                user: res.user, 
                token: token, 
                expiryTime: expiryTime 
            };
        } catch (e) {
            console.error('Login error:', e);
            const error = firebaseErrorFinder(e);
            toast.error(error, {
                toastId: "firebase-error-login"
            });
            return { status: false, error: error };
        }
    }
    const logOut = async () => {
        try {
            // First sign out from Firebase
            await signOut(auth);
            
            // Then clean up local storage and cookies
            removeToken();
            removeUser();
            removeFcmToken();
            removeSupportRoomId();
            localStorage.removeItem('token');
            
            // Force a full page refresh by using window.location
            window.location.href = "/";
            
            return { status: true };
        }
        catch (e) {
            const error = firebaseErrorFinder(e);
            toast.error(error, {
                toastId: "firebase-error"
            })
            return { status: false, error: error }
        }
    }
    const forgotPassword = async (email) => {
        await sendPasswordResetEmail(auth, email);
        toast.success("Reset password email has been sent successfully", {
            toastId: "firebase-reset-password-sent-message"
        })
    }
    const deleteMyAccount = async () => {
        const user = auth.currentUser;
        await user.delete()        
    }
    const signInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            const user = res.user;

            // Check if this is the user's first sign-in
            const isFirstSignIn = user.metadata.creationTime === user.metadata.lastSignInTime;

            // Set up the cookie expiry time
            const expiryTime = new Date(Date.now() + 3600 * 1000);
            // Always get a fresh ID token
            const token = await user.getIdToken(true);

            // Set the token in cookie and localStorage
            setToken(token, expiryTime);
            localStorage.setItem('token', token);

            return { status: true, user: user, token: token, isFirstSignIn: isFirstSignIn, expiryTime: expiryTime };
        } catch (e) {
            const error = firebaseErrorFinder(e);
            toast.error(error, {
                toastId: "firebase-error"
            });
            return { status: false, error: error };
        }
    }

    const initializeRecaptcha = (container) => {
        if (!recaptchaVerifierRef.current && container) {
            recaptchaVerifierRef.current = new RecaptchaVerifier(auth, container, {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved, allow user to proceed with authentication
                },
                'expired-callback': () => {
                    // Response expired. Ask user to solve reCAPTCHA again.
                }
            });
        }
    };

    const phoneSignIn = async (phoneNumber) => {
        try {
            if (!recaptchaVerifierRef.current) {
                toast.error("ReCAPTCHA verifier not initialized", {
                    toastId: "Phone-recaptcha-error-1"
                })
                return { status: false, error: "ReCAPTCHA verifier not initialized" }
            }
            const recaptchaVerifier = recaptchaVerifierRef.current;
            const result = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
            confirmationResultRef.current = result;
            toast.success("OTP has been send to your phone number", {
                toastId: "firebase-sends-otp"
            });
            return { status: true, data: result };
        } catch (e) {
            const error = firebaseErrorFinder(e);
            toast.error(error, {
                toastId: "firebase-error"
            })
            return { status: false, error: error }
        }
    };

    const confirmCode = async (verificationCode) => {
        try {
            const res = await confirmationResultRef.current.confirm(verificationCode);
            const user = res.user;
            // Check if this is the user's first sign-in
            const isFirstSignIn = user.metadata.creationTime === user.metadata.lastSignInTime;

            // Set up the cookie expiry time
            const expiryTime = new Date(Date.now() + 3600 * 1000);
            // Set the cookie
            const token = auth.currentUser.accessToken;
            // setToken(token,expiryTime);

            // toast.success("Phone number has been verified successfully.",{
            //     toastId:"firebase-sends-otp-2"
            // })
            return { status: true, user: auth.currentUser, token: token, isFirstSignIn: isFirstSignIn, expiryTime: expiryTime };
        } catch (e) {
            const error = firebaseErrorFinder(e);
            toast.error(error, {
                toastId: `firebase-error-${Math.random()}`
            })
            return { status: false, error: error }
        }
    };

    return {
        createUserWithEmailMethod,
        resendEmailVerificationLink,
        logOut,
        loginWithEmailAndPassword,
        forgotPassword,
        signInWithGoogle,
        initializeRecaptcha,
        phoneSignIn,
        confirmCode,
        deleteMyAccount
    }
}