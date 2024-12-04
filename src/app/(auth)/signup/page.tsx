"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const { message } = await res.json();
        toast.error(message || "Signup failed", {
          position: "top-right",
          duration: 3000,
        });
        setIsLoading(false);
        return;
      }

      const { token } = await res.json();
      localStorage.setItem("token", token);
      
      toast.success("Signup successful!", {
        position: "top-right",
        duration: 2000,
        onAutoClose: () => {
          router.push("/dashboard");
        }
      });
    } catch (err) {
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        duration: 3000,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <Toaster richColors />
      <h1 className="text-center mt-[100px] text-3xl font-bold">Signup</h1>
      <form onSubmit={handleSignup} className="mt-[50px]">
        <div className="flex justify-center gap-4">
          <h1 className="mt-2 text-lg">Enter your name</h1>
          <input
            className="p-2"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={isLoading}
          />
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <h1 className="text-lg mt-2">Enter your email</h1>
          <input
            className="p-2"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            disabled={isLoading}
          />
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <h1 className="text-lg mt-2">Enter Password</h1>
          <input
            className="p-2"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            disabled={isLoading}
          />
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <h1 className="text-lg mt-2">Select Your Role</h1>
          <select
            className="px-14 text-xl"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            disabled={isLoading}
          >
            <option value="USER">User</option>
            <option value="MODERATOR">Moderator</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <div className="flex justify-center mt-10">
          <button 
            type="submit" 
            className="bg-blue-500 p-2 text-xl rounded-xl flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg 
                  className="animate-spin h-5 w-5 mr-2" 
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
                Signing up...
              </div>
            ) : (
              "Signup"
            )}
          </button>
        </div>
      </form>
      <div className="flex justify-center mt-2 gap-4">
        <button
          onClick={() => router.push("/login")}
          className="bg-green-500 p-2 text-xl rounded-xl"
          disabled={isLoading}
        >
          Already Registered?
        </button>
        <button
          onClick={() => router.push("/")}
          className="bg-red-500 p-2 text-xl rounded-xl"
          disabled={isLoading}
        >
          Back to Auth Page
        </button>
      </div>
    </div>
  );
};

export default SignupPage;