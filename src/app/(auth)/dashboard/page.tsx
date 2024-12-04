"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "sonner";

interface CustomError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const DashboardPage = () => {
  const [loadingEndpoint, setLoadingEndpoint] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<{
    name: string;
    role: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token) {
      router.push("/login");
      return;
    }

    if (user) {
      try {
        setUserDetails(JSON.parse(user));
      } catch (error) {
        console.error(
          "Failed to parse user details from local storage:",
          error
        );
      }
    }
  }, [router]);

  const checkPower = async (apiEndpoint: string) => {
    const token = localStorage.getItem("token");

    // Set loading state
    setLoadingEndpoint(apiEndpoint);

    try {
      const response = await axios.get(`/api/${apiEndpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Success toast
      toast.success(response.data.message, {
        position: "top-right",
        duration: 3000,
      });
    } catch (error: unknown) {
      const errorMessage =
        (error as CustomError)?.response?.data?.message ||
        "Failed to access the service";
      toast.error(errorMessage, {
        position: "top-right",
        duration: 3000,
      });
    } finally {
      // Reset loading state
      setLoadingEndpoint(null);
    }
  };

  const handleLogout = () => {
    // Add logout toast
    toast.info("Logging out...", {
      position: "top-right",
      duration: 1500,
      onAutoClose: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
      },
    });
  };

  const ENDPOINTS = [
    { name: "Activity", endpoint: "activity" },
    { name: "Delete Any Comment", endpoint: "deleteAnyComment" },
    { name: "Full Access", endpoint: "fullaccess" },
    { name: "View All Posts", endpoint: "posts" },
  ];

  return (
    <div className="flex relative min-h-screen">
      <Toaster richColors />

      <div className="w-full p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard!</h1>
        {userDetails && (
          <div className="mb-8">
            <p className="text-lg">
              Username:{" "}
              <span className="font-semibold">{userDetails.name}</span>
            </p>
            <p className="text-lg">
              Role: <span className="font-semibold">{userDetails.role}</span>
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 max-w-xl">
          {ENDPOINTS.map((item) => (
            <button
              key={item.endpoint}
              onClick={() => checkPower(item.endpoint)}
              className={`p-4 bg-green-500 rounded-md text-white font-semibold flex items-center justify-center relative ${
                loadingEndpoint === item.endpoint
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-600"
              }`}
              disabled={loadingEndpoint === item.endpoint}
            >
              {loadingEndpoint === item.endpoint ? (
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
                  Loading...
                </div>
              ) : (
                item.name
              )}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-600 text-white p-4 rounded-2xl hover:bg-red-700 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
