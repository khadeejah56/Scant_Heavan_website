"use client";

import { useActionState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import type { ProductFormState } from "@/app/actions/products";
import type { Product } from "@/types";

const CATEGORIES = [
  { value: "mens", label: "Men's" },
  { value: "womens", label: "Women's" },
  { value: "unisex", label: "Unisex" },
  { value: "luxury", label: "Luxury" },
  { value: "gift-sets", label: "Gift Sets" },
];

const CONCENTRATIONS = ["Eau de Toilette", "Eau de Parfum", "Parfum"];

const initialState: ProductFormState = {};

export default function ProductForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (state: ProductFormState, formData: FormData) => Promise<ProductFormState>;
  defaultValues?: Product;
  submitLabel: string;
}) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-10 max-w-3xl">
      {state.error && <p className="text-sm text-red-400">{state.error}</p>}

      <section className="grid sm:grid-cols-2 gap-6">
        <Input
          label="Name"
          name="name"
          defaultValue={defaultValues?.name}
          required
          error={state.fieldErrors?.name?.[0]}
        />
        <Input
          label="URL Slug"
          name="slug"
          placeholder="noir-de-velours"
          defaultValue={defaultValues?.slug}
          required
          error={state.fieldErrors?.slug?.[0]}
        />
        <Input
          label="Brand Line"
          name="brandLine"
          defaultValue={defaultValues?.brandLine ?? "HUSSAIN"}
          required
          error={state.fieldErrors?.brandLine?.[0]}
        />
        <Input
          label="Size"
          name="size"
          placeholder="100ml"
          defaultValue={defaultValues?.size}
          required
          error={state.fieldErrors?.size?.[0]}
        />

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-luxe opacity-70">
            Category
          </label>
          <select
            name="category"
            defaultValue={defaultValues?.category ?? CATEGORIES[0].value}
            className="w-full bg-transparent border-b border-current/20 py-2.5 text-sm outline-none focus:border-champagne"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value} className="text-obsidian">
                {c.label}
              </option>
            ))}
          </select>
          {state.fieldErrors?.category && (
            <p className="text-xs text-red-400">{state.fieldErrors.category[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-luxe opacity-70">
            Concentration
          </label>
          <select
            name="concentration"
            defaultValue={defaultValues?.concentration ?? CONCENTRATIONS[0]}
            className="w-full bg-transparent border-b border-current/20 py-2.5 text-sm outline-none focus:border-champagne"
          >
            {CONCENTRATIONS.map((c) => (
              <option key={c} value={c} className="text-obsidian">
                {c}
              </option>
            ))}
          </select>
          {state.fieldErrors?.concentration && (
            <p className="text-xs text-red-400">
              {state.fieldErrors.concentration[0]}
            </p>
          )}
        </div>
      </section>

      <section className="grid sm:grid-cols-3 gap-6">
        <Input
          label="Price (PKR)"
          name="price"
          type="number"
          min={0}
          step="1"
          defaultValue={defaultValues?.price}
          required
          error={state.fieldErrors?.price?.[0]}
        />
        <Input
          label="Compare-at Price (PKR)"
          name="compareAtPrice"
          type="number"
          min={0}
          step="1"
          defaultValue={defaultValues?.compareAtPrice}
          error={state.fieldErrors?.compareAtPrice?.[0]}
        />
        <Input
          label="Stock"
          name="stock"
          type="number"
          min={0}
          step="1"
          defaultValue={defaultValues?.stock ?? 0}
          required
          error={state.fieldErrors?.stock?.[0]}
        />
      </section>

      <section className="grid sm:grid-cols-3 gap-6">
        <Input
          label="Rating (0-5)"
          name="rating"
          type="number"
          min={0}
          max={5}
          step="0.1"
          defaultValue={defaultValues?.rating ?? 0}
          error={state.fieldErrors?.rating?.[0]}
        />
        <Input
          label="Review Count"
          name="reviewCount"
          type="number"
          min={0}
          step="1"
          defaultValue={defaultValues?.reviewCount ?? 0}
          error={state.fieldErrors?.reviewCount?.[0]}
        />
      </section>

      <section className="flex flex-wrap gap-6 text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="bestSeller"
            defaultChecked={defaultValues?.bestSeller}
            className="accent-champagne size-4"
          />
          Best Seller
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={defaultValues?.featured}
            className="accent-champagne size-4"
          />
          Featured
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="newArrival"
            defaultChecked={defaultValues?.newArrival}
            className="accent-champagne size-4"
          />
          New Arrival
        </label>
      </section>

      <section className="space-y-2">
        <label className="text-xs uppercase tracking-luxe opacity-70">
          Images (one per line)
        </label>
        <p className="text-xs opacity-50">
          Either a full https:// URL, or a local path like{" "}
          <code>/images/products/mens/men1.png</code> for a file you&apos;ve
          placed in <code>public/images/...</code>.
        </p>
        <textarea
          name="images"
          rows={3}
          defaultValue={defaultValues?.images.join("\n")}
          placeholder="https://example.com/image1.jpg&#10;/images/products/mens/men1.png"
          className="w-full bg-transparent border border-current/20 p-3 text-sm outline-none focus:border-champagne"
        />
        {state.fieldErrors?.images && (
          <p className="text-xs text-red-400">{state.fieldErrors.images[0]}</p>
        )}
      </section>

      <section className="space-y-2">
        <label className="text-xs uppercase tracking-luxe opacity-70">
          Short Description
        </label>
        <textarea
          name="shortDescription"
          rows={2}
          defaultValue={defaultValues?.shortDescription}
          required
          className="w-full bg-transparent border border-current/20 p-3 text-sm outline-none focus:border-champagne"
        />
        {state.fieldErrors?.shortDescription && (
          <p className="text-xs text-red-400">
            {state.fieldErrors.shortDescription[0]}
          </p>
        )}
      </section>

      <section className="space-y-2">
        <label className="text-xs uppercase tracking-luxe opacity-70">
          Description
        </label>
        <textarea
          name="description"
          rows={4}
          defaultValue={defaultValues?.description}
          required
          className="w-full bg-transparent border border-current/20 p-3 text-sm outline-none focus:border-champagne"
        />
        {state.fieldErrors?.description && (
          <p className="text-xs text-red-400">{state.fieldErrors.description[0]}</p>
        )}
      </section>

      <section className="grid sm:grid-cols-3 gap-6">
        <Input
          label="Top Notes (comma-separated)"
          name="notesTop"
          defaultValue={defaultValues?.notes.top.join(", ")}
          required
          error={state.fieldErrors?.notesTop?.[0]}
        />
        <Input
          label="Heart Notes (comma-separated)"
          name="notesHeart"
          defaultValue={defaultValues?.notes.heart.join(", ")}
          required
          error={state.fieldErrors?.notesHeart?.[0]}
        />
        <Input
          label="Base Notes (comma-separated)"
          name="notesBase"
          defaultValue={defaultValues?.notes.base.join(", ")}
          required
          error={state.fieldErrors?.notesBase?.[0]}
        />
      </section>

      <Button type="submit" isLoading={isPending}>
        {submitLabel}
      </Button>
    </form>
  );
}
