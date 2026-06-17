"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Package,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";
import { ProductService } from "@/services/product.service";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types/product";
export default function ProductsPage() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [search, setSearch] =
    useState("");

  const [sort, setSort] =
    useState("asc");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const data =
      await ProductService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }

  const filteredProducts =
    useMemo(() => {
      const filtered =
        products.filter((product) =>
          product.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
        );

      return filtered.sort((a, b) =>
        sort === "asc"
          ? a.price - b.price
          : b.price - a.price
      );
    }, [products, search, sort]);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HERO */}

      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />

        <div className="relative overflow-hidden border-b bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900">

  <div className="absolute inset-0 opacity-10">
    <div className="absolute left-20 top-10 h-72 w-72 rounded-full bg-white blur-3xl" />
    <div className="absolute right-20 bottom-10 h-72 w-72 rounded-full bg-blue-400 blur-3xl" />
  </div>

  <div className="relative mx-auto max-w-7xl px-6 py-16">

    <div className="max-w-3xl">

      <h1 className="text-5xl font-bold text-white">
        Find The Right Tax Product
      </h1>

      <p className="mt-4 text-lg text-slate-300">
        Browse, compare and explore tax software products
        designed for individuals, freelancers, investors
        and businesses.
      </p>

    </div>

  </div>

</div>

      </section>

      {/* STATS */}

      <div className="mt-5 container mx-auto px-6 -mt-6">

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Total Products
                </p>

                <h2 className="mt-2 text-4xl font-bold">
                  {products.length}
                </h2>

              </div>

              <div className="rounded-2xl bg-blue-100 p-4">
                <Package className="h-8 w-8 text-blue-600" />
              </div>

            </div>

          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">

            <p className="text-sm text-slate-500">
              Search Results
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {filteredProducts.length}
            </h2>

          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">

            <p className="text-sm text-slate-500">
              Pricing Options
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              Flexible
            </h2>

          </div>

        </div>

      </div>

      {/* FILTERS */}

      <div className="container mx-auto px-6 py-10">

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="relative w-full lg:max-w-md">

              <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border bg-slate-50 py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div className="flex items-center gap-3">

              <ArrowUpDown className="h-4 w-4 text-slate-500" />

              <select
                value={sort}
                onChange={(e) =>
                  setSort(
                    e.target.value
                  )
                }
                className="rounded-xl border px-4 py-3"
              >
                <option value="asc">
                  Price Low → High
                </option>

                <option value="desc">
                  Price High → Low
                </option>
              </select>

            </div>

          </div>

        </div>

        {/* PRODUCTS */}

        <div className="mt-10">

          {filteredProducts.length === 0 ? (
            <div className="rounded-3xl border bg-white py-20 text-center shadow-sm">

              <h3 className="text-2xl font-bold">
                No Products Found
              </h3>

              <p className="mt-2 text-slate-500">
                Try changing your search
                criteria.
              </p>

            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

              {filteredProducts.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                )
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}