"use client";

export const dynamic = 'force-dynamic';

import { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectedFrom = searchParams.get("redirectedFrom") || "/account";
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      // Redirect after successful login
      router.push(redirectedFrom);
      router.refresh();
    } catch (e) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
         style={{ background: "linear-gradient(180deg, #1A0800 0%, #2C1A0E 100%)" }}>
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4A017] to-[#C1440E] flex items-center justify-center mb-4">
            <span className="text-[#1A0800] font-bold text-2xl">GS</span>
          </div>
        </div>

        <div
          className="rounded-2xl p-8 border border-[#8B5E3C]"
          style={{
            background: "linear-gradient(135deg, #3D2010 0%, #4A2C15 100%)",
          }}
        >
          <h1 className="text-3xl font-bold font-[Playfair_Display] text-[#F0C040] mb-2 text-center">
            Welcome Back
          </h1>
          <p className="text-[#C8A882] mb-8 text-center">
            Sign in to your GoldSphere account
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-[#C1440E]/20 border border-[#C1440E] text-[#E8D5A3]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#F0C040] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B5E3C]" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#F0C040] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B5E3C]" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  className="w-full pl-12 pr-12 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B5E3C] hover:text-[#D4A017]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <Link href="#" className="text-sm text-[#D4A017] hover:text-[#F0C040]">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800] font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#8B5E3C]" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 text-[#C8A882] bg-[#3D2010]">or</span>
            </div>
          </div>

          <p className="text-center text-[#C8A882]">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#D4A017] hover:text-[#F0C040] font-semibold">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
