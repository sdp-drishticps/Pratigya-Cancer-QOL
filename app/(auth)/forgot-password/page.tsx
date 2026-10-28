"use client";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";

import axiosInstance from "@/lib/utils/axios";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { forgotPasswordSchema } from "@/validation/forgotPasswordSchema";

export default function ForgotPasswordPage() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: forgotPasswordSchema,

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axiosInstance.post(
          "/auth/forgot-password",
          values,
        );

        toast.success(response.data.message);

        resetForm();
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

          {/* Right Side - Forgot Password Card */}
          <div className="w-full max-w-130 order-2">
            <Card className="rounded-[32px] border border-white/30 bg-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-md">
              <CardContent className="p-6 sm:p-10 lg:p-4">
                {/* Header */}
                <div className="mb-6 flex flex-col items-center text-center">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                    Forgot Password
                  </h1>
                  <div className="mt-3 h-1 w-12 rounded-full bg-[#105297]" />
                  <p className="mt-4 text-sm text-slate-500 max-w-sm">
                    Enter your registered email address below and we&apos;ll
                    send you a secure password reset link.{" "}
                  </p>
                </div>

                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`h-12 rounded-xl border-0 bg-slate-100 px-4 focus-visible:ring-2 focus-visible:ring-[#105297] ${
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

                  {/* Send OTP Button */}
                  <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="h-12 w-full rounded-xl bg-[#1E285D] text-base font-semibold transition-colors hover:bg-[#16204d] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {formik.isSubmitting ? "Sending..." : "Send Reset Link"}
                  </Button>

                  {/* Back to Login Link */}
                  <div className="flex justify-center pt-2">
                    <Link
                      href="/login"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#105297] transition-all hover:underline"
                    >
                      <FiArrowLeft size={16} />
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
