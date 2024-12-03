"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redirect to login if no token
    }

    // Fetch user details if needed
    // Example:
    // fetch('/api/user', { headers: { Authorization: `Bearer ${token}` } })
    //   .then(res => res.json())
    //   .then(data => setUser(data));
  }, [router]);

  return (
    <div>
      Welcome to your dashboard!
      <button
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/login");
        }}
        className="bg-red-600 text-right p-4 text-2xl "
      >
        logout
      </button>
    </div>
  );
};

export default DashboardPage;
