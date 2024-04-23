"use client";

import { use, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const sendTestEmail = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/emailsender");
      const data = await res.json();
      if (data.sucess) {
        alert("Email sent sucsessfully");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex h-screen items-center justify-center p-24">
      <div className="flex flex-col p-4 border shadow-lg rounded-lg gap-4">
        <h1 className="text-2xl">CRONJOB - NEXT</h1>
        <button
          className="p-4 rounded-md bg-blue-500 hover:text-white"
          onClick={sendTestEmail}
          disabled={loading}
        >
          {loading ? "Sending" : "Send test email"}
        </button>
      </div>
    </main>
  );
}
