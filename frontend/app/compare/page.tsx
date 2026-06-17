"use client";

import { useEffect, useState } from "react";
import {
  Scale,
  Package,
  CheckCircle,
} from "lucide-react";

import ComparisonTable from "@/components/products/ComparisonTable";
import { ProductService } from "@/services/product.service";
import { Product } from "@/types/product";

export default function ComparePage() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data =
        await ProductService.getProducts();

      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="rounded-3xl border bg-white px-8 py-6 shadow-lg flex items-center gap-4">
          <div className="h-6 w-6 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />

          <div>
            <p className="font-medium">
              Loading Products
            </p>
            <p className="text-sm text-slate-500">
              Preparing comparison data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero Section */}

      <div className="relative overflow-hidden border-b bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900">

        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-20 top-10 h-72 w-72 rounded-full bg-white blur-3xl" />
          <div className="absolute right-20 bottom-10 h-72 w-72 rounded-full bg-blue-400 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">

          <div className="max-w-3xl">

            <h1 className="mt-6 text-5xl font-bold text-white">
              Compare Tax Products
            </h1>

            <p className="mt-4 text-lg text-slate-300">
              Compare features, pricing, and supported
              tax situations side-by-side to choose
              the right product with confidence.
            </p>

          </div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Stats */}

        <div className="grid gap-6 md:grid-cols-3 mb-10">

          <div className="rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-lg">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Products
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  {products.length}
                </h3>

              </div>

              <Package className="h-8 w-8 text-blue-600" />

            </div>

          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-lg">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Comparison Type
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  Side-by-Side
                </h3>

              </div>

              <Scale className="h-8 w-8 text-purple-600" />

            </div>

          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-lg">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Recommendation Ready
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-600">
                  Yes
                </h3>

              </div>

              <CheckCircle className="h-8 w-8 text-green-600" />

            </div>

          </div>

        </div>

        {/* Comparison Table */}

        <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">

          <div className="border-b px-8 py-6">

            <h2 className="text-2xl font-bold">
              Product Feature Comparison
            </h2>

            <p className="mt-2 text-slate-500">
              Review pricing, supported features,
              and capabilities across all available
              products.
            </p>

          </div>

          <div className="overflow-x-auto">
            <ComparisonTable
              products={products}
            />
          </div>

        </div>

      </div>

    </div>
  );
}