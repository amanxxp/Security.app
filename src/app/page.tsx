'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const AuthPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-6">Welcome to Auth Page</h1>
      <div className="flex gap-4">
        <button
          onClick={() => router.push('/login')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
        >
          Go to Login
        </button>
        <button
          onClick={() => router.push('/signup')}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md"
        >
          Go to Signup
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
