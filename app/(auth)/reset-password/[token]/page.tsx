"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";

import axiosInstance from "@/lib/utils/axios";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { resetPasswordSchema } from "@/validation/resetPasswordSchema";

export default function ResetPasswordPage() {
  const router = useRouter();

  const params = useParams();

  const token = params.token as string;

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validationSchema: resetPasswordSchema,

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axiosInstance.post("/auth/reset-password", {
          token,
          password: values.password,
        });

        toast.success(response.data.message);

        resetForm();

        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "Something went wrong");
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Image
        src="/login/login-bg.png"
        alt="Background"
        fill
        priority
        className="-z-10 object-cover"
      />

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
                className="h-14 w-auto sm:h-20"
              />
            </div>

            <h2 className="mt-3 text-lg font-bold leading-tight text-slate-800 sm:text-2xl">
              PRATIGYA: The Pledge — Cancer QOL
              <br />
              Care Software for the Indian Context
            </h2>

            <div className="mt-3 h-1 w-12 rounded-full bg-[#105297]" />

            <p className="mt-5 max-w-lg  text-sm leading-relaxed text-slate-500 sm:text-base">
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

          {/* Right */}
          <div className="w-full max-w-130 order-2">
            <Card className="rounded-[32px] border border-white/30 bg-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-md">
              <CardContent className="p-6 sm:p-10 lg:p-4">
                <div className="mb-6 text-center">
                  <h1 className="text-3xl font-bold">Reset Password</h1>

                  <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#105297]" />

                  <p className="mt-4 text-sm text-slate-500">
                    Create a new secure password for your account.
                  </p>
                </div>

                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                  {/* Password */}

                  <div className="space-y-1">
                    <label className="text-sm font-semibold">
                      New Password
                    </label>

                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter new password"
                        className="h-12 rounded-xl border-0 bg-slate-100 pr-12"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>

                    {formik.touched.password && formik.errors.password && (
                      <p className="text-xs text-red-500">
                        {formik.errors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm */}

                  <div className="space-y-1">
                    <label className="text-sm font-semibold">
                      Confirm Password
                    </label>

                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Confirm password"
                        className="h-12 rounded-xl border-0 bg-slate-100 pr-12"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>

                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <p className="text-xs text-red-500">
                          {formik.errors.confirmPassword}
                        </p>
                      )}
                  </div>

                  <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="h-12 w-full rounded-xl bg-[#1E285D] text-base font-semibold transition-colors hover:bg-[#16204d] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {formik.isSubmitting ? "Updating..." : "Reset Password"}
                  </Button>

                  <div className="flex justify-center">
                    <Link
                      href="/login"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#105297] hover:underline"
                    >
                      <FiArrowLeft />
                      Back to Login
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
