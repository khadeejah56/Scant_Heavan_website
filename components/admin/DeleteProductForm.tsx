"use client";

import { deleteProduct } from "@/app/actions/products";

export default function DeleteProductForm({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  return (
    <form
      action={deleteProduct}
      onSubmit={(e) => {
        if (!confirm(`Delete "${productName}"? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
      className="shrink-0"
    >
      <input type="hidden" name="productId" value={productId} />
      <button
        type="submit"
        className="text-xs uppercase tracking-luxe opacity-60 hover:text-red-400 hover:opacity-100"
      >
        Delete
      </button>
    </form>
  );
}
