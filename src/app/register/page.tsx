"use client";

export const dynamic = 'force-dynamic';

import { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { User, Mail, Lock, Eye, EyeOff, Loader2, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const showWelcome = searchParams.get("welcome") === "true";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const supabase = createClient();

  const getPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    return strength;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const full_name = formData.get("full_name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirm_password = formData.get("confirm_password") as string;

    if (password !== confirm_password) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name,
          },
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      // Redirect after successful signup
      router.push("/account");
      router.refresh();
    } catch (e) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const strength = getPasswordStrength(password);
  const strengthColors = [
    "bg-[#C1440E]",
    "bg-[#E8780C]",
    "bg-[#D4A017]",
    "bg-[#6A9A5A]",
  ];
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
         style={{ background: "linear-gradient(180deg, #1A0800 0%, #2C1A0E 100%)" }}>
      <div className="w-full max-w-md">
        {showWelcome && (
          <div className="mb-4 p-4 rounded-lg bg-[#6A9A5A]/20 border border-[#6A9A5A] text-[#F5E8C0] flex items-center gap-2">
            <Check className="w-5 h-5" />
            Welcome to GoldSphere!
          </div>
        )}

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
            Create Account
          </h1>
          <p className="text-[#C8A882] mb-8 text-center">
            Join GoldSphere and taste Africa
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-[#C1440E]/20 border border-[#C1440E] text-[#E8D5A3]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="full_name" className="block text-sm font-semibold text-[#F0C040] mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B5E3C]" />
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
                  placeholder="Your name"
                />
              </div>
            </div>

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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B5E3C] hover:text-[#D4A017]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {/* Password strength indicator */}
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded-full ${i < strength ? strengthColors[strength - 1] : "bg-[#2C1A0E]"}`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${strength === 0 ? "text-[#C1440E]" : "text-[#C8A882]"}`}>
                    {strength > 0 ? strengthLabels[strength - 1] : ""}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirm_password" className="block text-sm font-semibold text-[#F0C040] mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B5E3C]" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm_password"
                  name="confirm_password"
                  required
                  className="w-full pl-12 pr-12 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B5E3C] hover:text-[#D4A017]"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                className="mt-1 w-4 h-4 accent-[#D4A017]"
              />
              <span className="text-[#C8A882] text-sm">
                I agree to the{" "}
                <Link href="#" className="text-[#D4A017] hover:text-[#F0C040]">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-[#D4A017] hover:text-[#F0C040]">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800] font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Create Account"
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
            Already have an account?{" "}
            <Link href="/login" className="text-[#D4A017] hover:text-[#F0C040] font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
