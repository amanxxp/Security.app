"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        toast.error(message || "Login failed", {
          position: "top-right",
          duration: 3000,
        });
        setIsLoading(false);
        return;
      }
      const { token, user } = await res.json();

      // Save token and user details to local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful!", {
        position: "top-right",
        duration: 2000,
        onAutoClose: () => {
          router.push("/dashboard");
        },
      });
    } catch (err) {
      toast.error(`Something went wrong. Please try again.${err}`, {
        position: "top-right",
        duration: 3000,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <Toaster richColors />
      <h1 className="text-center mt-[100px] text-3xl font-bold">Login</h1>
      <form onSubmit={handleLogin} className="mt-[50px]">
        <div className="flex justify-center">
          <h1 className="mr-12 text-lg mt-2">Enter Your Email</h1>
          <input
            className="p-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="flex justify-center mt-10">
          <h1 className="mr-6 text-lg mt-2">Enter Your Passcode</h1>
          <input
            className="p-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="bg-blue-500 p-2 text-xl rounded-xl flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
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
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
      <div className="flex justify-center mt-2 gap-4">
        <button
          onClick={() => router.push("/signup")}
          className="bg-green-500 p-2 text-xl rounded-xl"
          disabled={isLoading}
        >
          Not Registered yet?
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

export default LoginPage;
