"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  Package,
  BarChart3,
  Settings,
  Wand2,
} from "lucide-react";

export default function HomePage() {
  return (
    <main>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />

        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="container relative mx-auto px-6 py-28">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT SIDE */}
            <div>

              <div className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-sm">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">
                  AI-Powered Tax Recommendation Platform
                </span>
              </div>

              <h1 className="mt-8 text-6xl font-extrabold leading-tight">
                Find The Perfect
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Tax Software
                </span>
                In Minutes
              </h1>

              <p className="mt-8 text-xl text-slate-600 max-w-xl">
                Answer a few simple questions and receive a personalized
                recommendation based on your tax situation, income,
                deductions, and filing preferences.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">

                <Link
                  href="/recommend"
                  className="group inline-flex items-center rounded-xl bg-black px-8 py-4 text-white font-medium shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  Find My Product

                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/compare"
                  className="rounded-xl border bg-white px-8 py-4 font-medium transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  Compare Products
                </Link>

              </div>

              <div className="mt-10 flex flex-wrap gap-6 text-sm">

                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-green-500" />
                  Secure Platform
                </div>

                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-blue-500" />
                  AI Assistant
                </div>

                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  Instant Recommendations
                </div>

              </div>

            </div>

            {/* RIGHT SIDE CARD */}
            <div className="relative">

              <div className="rounded-3xl border bg-white p-8 shadow-2xl">

                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">
                    Recommendation Preview
                  </h3>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    High Confidence
                  </span>
                </div>

                <div className="mt-8">

                  <p className="text-sm text-slate-500">
                    Recommended Product
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    Self-Employed
                  </h2>

                  <p className="mt-2 text-slate-600">
                    CAD $70
                  </p>

                  <div className="mt-8 space-y-4">

                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Freelance Income
                    </div>

                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Home Office Expenses
                    </div>

                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Business Expenses
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* QUICK ACCESS */}
      <section className="py-24">
        <div className="container mx-auto px-6">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold">
              Explore The Platform
            </h2>

            <p className="mt-4 text-slate-600">
              Access all available tools and product resources.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">

            <Link
              href="/products"
              className="rounded-2xl border bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
            >
              <Package className="h-10 w-10 mb-4" />

              <h3 className="text-xl font-bold">
                Products
              </h3>

              <p className="mt-3 text-slate-600">
                Browse all available tax products.
              </p>
            </Link>

            <Link
              href="/compare"
              className="rounded-2xl border bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
            >
              <BarChart3 className="h-10 w-10 mb-4" />

              <h3 className="text-xl font-bold">
                Compare Products
              </h3>

              <p className="mt-3 text-slate-600">
                Compare pricing and supported features.
              </p>
            </Link>

            <Link
              href="/recommend"
              className="rounded-2xl border bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
            >
              <Wand2 className="h-10 w-10 mb-4" />

              <h3 className="text-xl font-bold">
                Recommendation Wizard
              </h3>

              <p className="mt-3 text-slate-600">
                Get personalized recommendations.
              </p>
            </Link>

            <Link
              href="/assistant"
              className="rounded-2xl border bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
            >
              <Bot className="h-10 w-10 mb-4" />

              <h3 className="text-xl font-bold">
                AI Assistant
              </h3>

              <p className="mt-3 text-slate-600">
                Ask product-selection questions.
              </p>
            </Link>

            <Link
              href="/admin/products"
              className="rounded-2xl border bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
            >
              <Settings className="h-10 w-10 mb-4" />

              <h3 className="text-xl font-bold">
                Admin Config
              </h3>

              <p className="mt-3 text-slate-600">
                View product configuration data.
              </p>
            </Link>

            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
              <h3 className="text-2xl font-bold">
                8 Tax Products
              </h3>

              <p className="mt-3">
                Personal, Expert, Self-Employed and Corporate filing solutions.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* STATS */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-6">

          <div className="grid gap-6 md:grid-cols-4">

            {[
              { value: "8", label: "Products" },
              { value: "100%", label: "Rule Based" },
              { value: "AI", label: "Assistant" },
              { value: "24/7", label: "Available" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border bg-white p-8 text-center shadow-sm"
              >
                <h3 className="text-4xl font-bold">
                  {item.value}
                </h3>

                <p className="mt-2 text-slate-500">
                  {item.label}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24">
        <div className="container mx-auto px-6">

          <h2 className="text-center text-4xl font-bold">
            How It Works
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-3">

            {[
              "Answer Questions",
              "Smart Analysis",
              "Get Recommendation",
            ].map((step, index) => (
              <div
                key={step}
                className="rounded-2xl border p-8 shadow-sm hover:shadow-xl transition"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                  {index + 1}
                </div>

                <h3 className="text-xl font-semibold">
                  {step}
                </h3>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto max-w-4xl px-6">

          <h2 className="text-center text-4xl font-bold mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">

            <div className="rounded-2xl border bg-white p-6">
              <h3 className="font-semibold">
                Is this tax advice?
              </h3>

              <p className="mt-2 text-slate-600">
                No. This platform provides general product guidance only.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6">
              <h3 className="font-semibold">
                Can I compare products?
              </h3>

              <p className="mt-2 text-slate-600">
                Yes, use the comparison page to compare features and pricing.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6">
              <h3 className="font-semibold">
                Does AI provide tax advice?
              </h3>

              <p className="mt-2 text-slate-600">
                No. The AI assistant only provides product guidance based on
                configured rules.
              </p>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}