import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductCard({
  product,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">
          {product.name}
        </h2>

        <span className="font-semibold">
          CAD ${product.price}
        </span>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        {product.description}
      </p>

      <div className="mt-4">
        <h4 className="font-medium mb-2">
          Best For
        </h4>

        <ul className="list-disc ml-5 text-sm">
          {product.bestFor.map((item) => (
            <li key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}