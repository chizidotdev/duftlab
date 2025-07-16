import { ChevronDown, ChevronUp } from "lucide-react";

export function QuantitySelect({
  onChange,
  quantity,
}: {
  onChange: (qty: number) => void;
  quantity: number;
}) {
  return (
    <div className="flex h-9 items-center gap-4 rounded-md border px-2 py-2 [&_svg]:size-4">
      <button onClick={() => onChange(quantity - 1)}>
        <ChevronDown />
      </button>
      {quantity}
      <button onClick={() => onChange(quantity + 1)}>
        <ChevronUp />
      </button>
    </div>
  );
}
