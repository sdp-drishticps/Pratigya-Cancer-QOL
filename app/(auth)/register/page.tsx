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

import { registerSchema } from "@/validation/registerSchema";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- FORMIK SETUP ---
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axiosInstance.post("/auth/register", values);

        toast.success(response.data.message || "Registration successful!");
        resetForm();

        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "Registration failed");
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
        <div className="flex w-full max-w-7xl flex-col items-center gap-6 md:gap-12 md:flex-row md:justify-between">
          {/* Left Side - Branding & Illustration */}
          <div className="flex w-full max-w-162.5 flex-col items-center text-center md:items-start md:text-left order-1">
            <div className="flex items-center justify-center gap-2">
              <Image
                src="/login/drishti-logo.png"
                alt="Drishti Logo"
                width={70}
                height={40}
                priority
                className="h-12 w-auto sm:h-20"
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
                className="h-14 w-auto sm:h-21"
              />
            </div>

            <h2 className="text-lg font-bold leading-tight text-slate-800 sm:text-2xl mt-3">
              PRATIGYA: The Pledge — Cancer QOL
              <br />
              Care Software for the Indian Context
            </h2>

            <div className="mt-3 h-1 w-12 rounded-full bg-[#105297]" />

            <p className="mt-5 max-w-lg lg-px-4 text-sm leading-relaxed text-slate-500 sm:text-base">
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

          {/* Right Side - Register Card */}
          <div className="w-full max-w-130 order-2">
            <Card className="rounded-[32px] border border-white/30 bg-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-md">
              <CardContent className="p-4 sm:p-6 lg:p-4">
                <div className="mb-2 flex flex-col items-center">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                    Register
                  </h1>
                  <div className="mt-3 h-1 w-12 rounded-full bg-[#105297]" />
                </div>

                <form
                  className="space-y-4"
                  onSubmit={formik.handleSubmit}
                  autoComplete="off"
                >
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      name="fullName"
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your full name"
                      className={`h-12 rounded-xl border-0 bg-slate-100 px-4 ${
                        formik.touched.fullName && formik.errors.fullName
                          ? "ring-2 ring-red-500"
                          : ""
                      }`}
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                      <p className="text-xs text-red-500">
                        {formik.errors.fullName}
                      </p>
                    )}
                  </div>

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
                      className={`h-12 rounded-xl border-0 bg-slate-100 px-4 ${
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

                  {/* Phone Number */}
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      name="phoneNumber"
                      maxLength={10}
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your phone number"
                      className={`h-12 rounded-xl border-0 bg-slate-100 px-4 ${
                        formik.touched.phoneNumber && formik.errors.phoneNumber
                          ? "ring-2 ring-red-500"
                          : ""
                      }`}
                    />
                    {formik.touched.phoneNumber &&
                      formik.errors.phoneNumber && (
                        <p className="text-xs text-red-500">
                          {formik.errors.phoneNumber}
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
                        className={`h-12 rounded-xl border-0 bg-slate-100 px-4 pr-12 ${
                          formik.touched.password && formik.errors.password
                            ? "ring-2 ring-red-500"
                            : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
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

                  {/* Confirm Password */}
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Confirm your password"
                        className={`h-12 rounded-xl border-0 bg-slate-100 px-4 pr-12 ${
                          formik.touched.confirmPassword &&
                          formik.errors.confirmPassword
                            ? "ring-2 ring-red-500"
                            : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <FiEyeOff size={18} />
                        ) : (
                          <FiEye size={18} />
                        )}
                      </button>
                    </div>
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <p className="text-xs text-red-500">
                          {formik.errors.confirmPassword}
                        </p>
                      )}
                  </div>

                  {/* Register Button */}
                  <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="mt-2 h-12 w-full rounded-xl bg-[#1E285D] text-base font-semibold transition-colors hover:bg-[#16204d]"
                  >
                    {formik.isSubmitting ? "Registering..." : "Register"}
                  </Button>

                  <p className="text-center text-sm text-slate-500">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="font-semibold text-[#105297] transition-all hover:underline"
                    >
                      Login
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
