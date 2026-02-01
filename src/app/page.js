"use client";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 m-4">
      <div className="text-center max-w-md bg-white rounded-xl shadow-lg m-4 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          E-Commerce Application
        </h1>
        <SignInButton>
          <button className="w-full rounded-lg bg-black text-white py-3 font-medium hover:bg-gray-800 transition">
            Sign in
          </button>
        </SignInButton>
      </div>
    </main>
  );
}
