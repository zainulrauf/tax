"use client";

import { useEffect, useMemo, useState } from "react";

import {
  ShieldCheck,
  Download,
  Database,
  CheckCircle,
  AlertCircle,
  Package,
} from "lucide-react";

import { api } from "@/services/api";
import { Product } from "@/types/product";

export default function AdminProductsPage() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [validation, setValidation] =
    useState<any>(null);
  
  const [expandedProduct, setExpandedProduct] =
    useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const response =
        await api.get(
          "/api/admin/products",
        );

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const validationSummary =
    useMemo(() => {
      const results = products.map(
        (product) => {
          const errors: string[] =
            [];

          if (!product.id) {
            errors.push(
              "Missing Product ID",
            );
          }

          if (!product.name) {
            errors.push(
              "Missing Product Name",
            );
          }

          if (
            product.price ===
              undefined ||
            product.price === null
          ) {
            errors.push(
              "Missing Price",
            );
          }

          if (
            !product.bestFor ||
            product.bestFor.length ===
              0
          ) {
            errors.push(
              "Missing Best For",
            );
          }

          if (
            !product.supports
          ) {
            errors.push(
              "Missing Feature Configuration",
            );
          }

          return {
            productId:
              product.id,
            valid:
              errors.length ===
              0,
            errors,
          };
        },
      );

      return {
        total:
          results.length,
        valid:
          results.filter(
            (x) => x.valid,
          ).length,
        invalid:
          results.filter(
            (x) => !x.valid,
          ).length,
        results,
      };
    }, [products]);

    function validateProducts() {
      if (validation) {
        setValidation(null);
        return;
      }
    
      setValidation(validationSummary);
    }

  async function exportProducts() {
    const blob = new Blob(
      [
        JSON.stringify(
          products,
          null,
          2,
        ),
      ],
      {
        type: "application/json",
      },
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement(
        "a",
      );

    link.href = url;

    link.download =
      "product-config.json";

    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      
      <div className="relative overflow-hidden border-b bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900">

  <div className="absolute inset-0 opacity-10">
    <div className="absolute left-20 top-10 h-72 w-72 rounded-full bg-white blur-3xl" />
    <div className="absolute right-20 bottom-10 h-72 w-72 rounded-full bg-blue-400 blur-3xl" />
  </div>

  <div className="relative max-w-7xl mx-auto px-6 py-12">

    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

      {/* Left Side */}

      <div>

        <h1 className="text-5xl font-bold text-white">
          Product Configuration
        </h1>

        <p className="mt-3 text-lg text-slate-300 max-w-2xl">
          Manage and validate product configuration,
          supported features, pricing, and
          recommendation rules.
        </p>

      </div>

      {/* Right Side */}

      <div className="flex flex-wrap gap-3">

        <button
          onClick={validateProducts}
          className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 font-medium transition ${
            validation
              ? "bg-red-500/20 text-red-100 border border-red-400/30 hover:bg-red-500/30"
              : "bg-white text-slate-900 hover:bg-slate-100"
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          {validation
            ? "Hide Validation"
            : "Validate Config"}
        </button>

        <button
          onClick={exportProducts}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white font-medium transition hover:bg-blue-700"
        >
          <Download className="h-4 w-4" />
          Export JSON
        </button>

      </div>

    </div>

  </div>

</div>

      {/* Header */}
      <div className="container mx-auto px-6 py-8">

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="rounded-3xl bg-white p-6 border shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Total Products
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  {products.length}
                </h3>

              </div>

              <Package className="h-8 w-8 text-blue-600" />

            </div>

          </div>

          <div className="rounded-3xl bg-white p-6 border shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Valid Configs
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-600">
                  {
                    validationSummary.valid
                  }
                </h3>

              </div>

              <CheckCircle className="h-8 w-8 text-green-600" />

            </div>

          </div>

          <div className="rounded-3xl bg-white p-6 border shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Invalid Configs
                </p>

                <h3 className="mt-2 text-3xl font-bold text-red-600">
                  {
                    validationSummary.invalid
                  }
                </h3>

              </div>

              <AlertCircle className="h-8 w-8 text-red-600" />

            </div>

          </div>

          <div className="rounded-3xl bg-white p-6 border shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Features
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  {products.reduce(
                    (
                      total,
                      product,
                    ) =>
                      total +
                      Object.keys(
                        product.supports ||
                          {},
                      ).length,
                    0,
                  )}
                </h3>

              </div>

              <Database className="h-8 w-8 text-purple-600" />

            </div>

          </div>

        </div>
                {/* Validation Results */}

                {validation && (
          <div className="mb-8 rounded-3xl border bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold">
                  Configuration Validation
                </h2>

                <p className="mt-1 text-slate-500">
                  Product schema and configuration checks.
                </p>

              </div>

              <span
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  validation.invalid === 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {validation.invalid === 0
                  ? "All Configurations Valid"
                  : `${validation.invalid} Issues Found`}
              </span>

            </div>

            {/* Summary Cards */}

            <div className="grid md:grid-cols-3 gap-4 mb-8">

              <div className="rounded-2xl bg-blue-50 p-5">

                <p className="text-sm font-medium text-blue-600">
                  Total Products
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  {validation.total}
                </h3>

              </div>

              <div className="rounded-2xl bg-green-50 p-5">

                <p className="text-sm font-medium text-green-600">
                  Valid Products
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-700">
                  {validation.valid}
                </h3>

              </div>

              <div className="rounded-2xl bg-red-50 p-5">

                <p className="text-sm font-medium text-red-600">
                  Invalid Products
                </p>

                <h3 className="mt-2 text-3xl font-bold text-red-700">
                  {validation.invalid}
                </h3>

              </div>

            </div>

            {/* Product Validation List */}

            <div className="space-y-4">

              {validation.results.map(
                (item: any) => (
                  <div
                    key={item.productId}
                    className="rounded-2xl border p-5"
                  >

                    <div className="flex items-center justify-between">

                      <div>

                        <h4 className="font-semibold">
                          {item.productId}
                        </h4>

                      </div>

                      {item.valid ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          Valid
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                          Invalid
                        </span>
                      )}

                    </div>

                    {!item.valid && (

                      <div className="mt-4">

                        <p className="mb-2 text-sm font-medium text-red-600">
                          Validation Errors
                        </p>

                        <ul className="list-disc space-y-1 pl-5 text-sm text-red-600">

                          {item.errors.map(
                            (error: string) => (
                              <li key={error}>
                                {error}
                              </li>
                            )
                          )}

                        </ul>

                      </div>

                    )}

                  </div>
                )
              )}

            </div>

          </div>
        )}
                {/* Product Configuration */}

                <div>

<div className="mb-6 flex items-center justify-between">

  <div>

    <h2 className="text-3xl font-bold">
      Product Configuration
    </h2>

    <p className="mt-1 text-slate-500">
      Review product pricing, supported features,
      recommendation criteria, and configuration details.
    </p>

  </div>

</div>

<div className="grid gap-6">

  {products.map((product) => {

    const supported = Object.entries(
      product.supports || {},
    )
      .filter(
        ([, value]) => value === true,
      )
      .map(([key]) => key);

    const unsupported = Object.entries(
      product.supports || {},
    )
      .filter(
        ([, value]) => value === false,
      )
      .map(([key]) => key);

    const productErrors: string[] = [];

    if (!product.id)
      productErrors.push("Missing ID");

    if (!product.name)
      productErrors.push("Missing Name");

    if (
      product.price === undefined
    )
      productErrors.push("Missing Price");

    if (
      !product.bestFor?.length
    )
      productErrors.push(
        "Missing Best For",
      );

    const isExpanded =
      expandedProduct ===
      product.id;

    return (

      <div
        key={product.id}
        className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:shadow-lg"
      >

        {/* Card Header */}

        <div className="border-b p-6">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <div className="flex items-center gap-3">

                <h3 className="text-2xl font-bold">
                  {product.name}
                </h3>

                {productErrors.length ===
                0 ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Valid
                  </span>
                ) : (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                    Invalid
                  </span>
                )}

              </div>

              <p className="mt-2 text-sm text-slate-500">
                Product ID:
                {" "}
                {product.id}
              </p>

            </div>

            <div className="text-right">

              <p className="text-sm text-slate-500">
                Product Price
              </p>

              <h4 className="text-3xl font-bold">
                CAD $
                {product.price}
              </h4>

            </div>

          </div>

        </div>

        {/* Quick Info */}

        <div className="grid gap-6 p-6 md:grid-cols-3">

          <div className="rounded-2xl bg-slate-50 p-5">

            <p className="text-sm font-medium text-slate-500">
              Best For
            </p>

            <h4 className="mt-2 text-2xl font-bold">
              {
                product.bestFor
                  ?.length
              }
            </h4>

            <p className="text-sm text-slate-500">
              Recommendation
              Categories
            </p>

          </div>

          <div className="rounded-2xl bg-green-50 p-5">

            <p className="text-sm font-medium text-green-600">
              Supported
            </p>

            <h4 className="mt-2 text-2xl font-bold text-green-700">
              {
                supported.length
              }
            </h4>

            <p className="text-sm text-green-600">
              Enabled Features
            </p>

          </div>

          <div className="rounded-2xl bg-red-50 p-5">

            <p className="text-sm font-medium text-red-600">
              Unsupported
            </p>

            <h4 className="mt-2 text-2xl font-bold text-red-700">
              {
                unsupported.length
              }
            </h4>

            <p className="text-sm text-red-600">
              Disabled Features
            </p>

          </div>

        </div>

        {/* Action Button */}

        <div className="px-6 pb-6">

          <button
            onClick={() =>
              setExpandedProduct(
                isExpanded
                  ? null
                  : product.id,
              )
            }
            className="rounded-xl border px-5 py-3 font-medium transition hover:bg-slate-50"
          >
            {isExpanded
              ? "Hide Details"
              : "View Details"}
          </button>

        </div>
                          {/* Expanded Details */}

                          {isExpanded && (

<div className="border-t bg-slate-50 p-6">

  <div className="grid gap-6 lg:grid-cols-3">

    {/* Best For */}

    <div className="rounded-2xl bg-white p-5 border">

      <h4 className="mb-4 text-lg font-semibold">
        Best For
      </h4>

      <ul className="space-y-2">

        {product.bestFor?.map(
          (item) => (
            <li
              key={item}
              className="flex items-center gap-2"
            >
              <span className="h-2 w-2 rounded-full bg-blue-600" />

              <span>
                {item}
              </span>
            </li>
          ),
        )}

      </ul>

    </div>

    {/* Supported Features */}

    <div className="rounded-2xl bg-white p-5 border">

      <h4 className="mb-4 text-lg font-semibold text-green-700">
        Supported Features
      </h4>

      <div className="flex flex-wrap gap-2">

        {supported.map(
          (feature) => (
            <span
              key={feature}
              className="rounded-full bg-green-100 px-3 py-2 text-sm font-medium text-green-700"
            >
              {feature}
            </span>
          ),
        )}

      </div>

    </div>

    {/* Unsupported Features */}

    <div className="rounded-2xl bg-white p-5 border">

      <h4 className="mb-4 text-lg font-semibold text-red-700">
        Unsupported Features
      </h4>

      <div className="flex flex-wrap gap-2">

        {unsupported.map(
          (feature) => (
            <span
              key={feature}
              className="rounded-full bg-red-100 px-3 py-2 text-sm font-medium text-red-700"
            >
              {feature}
            </span>
          ),
        )}

      </div>

    </div>

  </div>

  {/* Validation Errors */}

  {productErrors.length > 0 && (

    <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">

      <h4 className="mb-3 font-semibold text-red-700">
        Validation Issues
      </h4>

      <ul className="list-disc pl-5 text-red-600">

        {productErrors.map(
          (error) => (
            <li
              key={error}
            >
              {error}
            </li>
          ),
        )}

      </ul>

    </div>

  )}

</div>

)}

</div>
);
})}

</div>

</div>

</div>

</div>
);
}