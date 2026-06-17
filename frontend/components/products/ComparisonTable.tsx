import { Product } from "@/types/product";

interface Props {
  products: Product[];
}

const FEATURES = [
  {
    key: "salaryIncome",
    label: "Salary Income",
  },
  {
    key: "medicalExpenses",
    label: "Medical Expenses",
  },
  {
    key: "donations",
    label: "Donations",
  },
  {
    key: "investmentIncome",
    label: "Investment Income",
  },
  {
    key: "rentalIncome",
    label: "Rental Income",
  },
  {
    key: "freelanceIncome",
    label: "Freelance Income",
  },
  {
    key: "businessExpenses",
    label: "Business Expenses",
  },
  {
    key: "expertHelp",
    label: "Expert Help",
  },
  {
    key: "fullService",
    label: "Full Service",
  },
  {
    key: "corporateFiling",
    label: "Corporate Filing",
  },
  {
    key: "nilCorporateReturn",
    label: "Nil Return",
  },
];

export default function ComparisonTable({
  products,
}: Props) {
  return (
    <div className="overflow-x-auto border rounded-xl">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-slate-100">
            <th className="p-4 text-left">
              Feature
            </th>

            {products.map((product) => (
              <th
                key={product.id}
                className="p-4 text-center min-w-[140px]"
              >
                {product.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr className="border-b">
            <td className="p-4 font-medium">
              Price
            </td>

            {products.map((product) => (
              <td
                key={product.id}
                className="text-center p-4"
              >
                CAD ${product.price}
              </td>
            ))}
          </tr>

          {FEATURES.map((feature) => (
            <tr
              key={feature.key}
              className="border-b"
            >
              <td className="p-4 font-medium">
                {feature.label}
              </td>

              {products.map((product) => (
                <td
                  key={`${product.id}-${feature.key}`}
                  className="text-center p-4"
                >
                  {product.supports?.[
                    feature.key
                  ] ? (
                    "✔"
                  ) : (
                    "✖"
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}