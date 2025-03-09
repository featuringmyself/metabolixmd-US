import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to signup page
    router.replace('/signup');
  }, [router]);

  // Return empty div while redirecting
  return <div></div>;
}