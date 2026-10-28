"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useFormik } from "formik";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import axiosInstance from "@/lib/utils/axios";
import toast from "react-hot-toast";
import axios from "axios";
import { loginSchema } from "@/validation/loginSchema";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // --- FORMIK SETUP ---
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Send request to  login API
        const response = await axiosInstance.post("/auth/login", values);

        toast.success(response.data.message || "Welcome back!");

        // Redirect to dashboard or home page after successful login
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "Invalid credentials");
        } else {
          toast.error("An unexpected error occurred");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/login/login-bg.png"
        alt="Background"
        fill
        priority
        className="-z-10 object-cover"
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-3 sm:px-6 lg:px-12">
        <div className="flex w-full max-w-7xl flex-col gap-6 md:gap-12 md:flex-row items-center justify-between">
          {" "}
          {/* Left Side - Login Card */}
          <div className="order-2 w-full  md:order-1 max-w-130 ">
            <Card className="rounded-[32px] border border-white/30 bg-white/80 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <CardContent className="p-6 sm:p-8 lg:p-12">
                {/* Header */}
                <div className="mb-10 flex flex-col items-center">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
                    Log In
                  </h1>
                  <div className="mt-3 h-1 w-12 rounded-full bg-[#105297]" />
                </div>

                <form
                  className="space-y-6"
                  onSubmit={formik.handleSubmit}
                  autoComplete="off"
                >
                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your email"
                      className={`h-12 rounded-xl border-0 bg-slate-100 px-4 text-slate-800 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#105297] ${
                        formik.touched.email && formik.errors.email
                          ? "ring-2 ring-red-500"
                          : ""
                      }`}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-xs text-red-500">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your password"
                        className={`h-12 rounded-xl border-0 bg-slate-100 px-4 pr-12 text-slate-800 focus-visible:ring-2 focus-visible:ring-[#105297] ${
                          formik.touched.password && formik.errors.password
                            ? "ring-2 ring-red-500"
                            : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                      >
                        {showPassword ? (
                          <FiEyeOff size={18} />
                        ) : (
                          <FiEye size={18} />
                        )}
                      </button>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <p className="text-xs text-red-500">
                        {formik.errors.password}
                      </p>
                    )}
                  </div>

                  {/* Forgot Password */}
                  <div className="flex justify-end">
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-[#105297] hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="h-12 w-full rounded-xl bg-[#1E285D] text-base font-semibold text-white shadow-lg hover:bg-[#16204d] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formik.isSubmitting ? "Logging in..." : "Log in"}
                  </Button>

                  {/* Register */}
                  <p className="pt-2 text-center text-sm text-slate-500">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/register"
                      className="font-semibold text-[#105297] hover:underline"
                    >
                      Register here
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
          {/* Right Side - Branding */}
          <div className="order-1 flex w-full flex-col items-center text-center md:order-2 md:items-start md:text-left lg:max-w-162.5">
            {" "}
            <div className="flex items-center justify-center gap-2">
              <Image
                src="/login/drishti-logo.png"
                alt="Drishti Logo"
                width={70}
                height={40}
                priority
                className="h-17 w-auto sm:h-20"
              />

              <Image
                src="/login/iit-logo.png"
                alt="iit Logo"
                width={70}
                height={100}
                priority
                className="h-17 w-auto sm:h-20"
              />

              <Image
                src="/login/aiims-bhopal.png"
                alt="AIIMS Bhopal Logo"
                width={70}
                height={100}
                priority
                className="h-17 w-auto sm:h-21"
              />
            </div>
            <h2 className="text-lg font-bold leading-tight text-slate-800 sm:text-2xl mt-3">
              PRATIGYA: The Pledge — Cancer QOL
              <br />
              Care Software for the Indian Context
            </h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-[#105297]" />
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-slate-500 sm:text-base">
              Care that listens, support that matters.
            </p>
            <div className="mt-8 hidden md:block">
              <Image
                src="/login/doclogo.png"
                alt="Healthcare Illustration"
                width={600}
                height={600}
                priority
                className="h-auto w-full max-w-125 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
