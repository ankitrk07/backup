"use client";

import { useId } from "react";
import type { ColorId, ProductColor } from "@/types/product";

interface ColorSelectorProps {
  colors: ProductColor[];
  value: ColorId;
  onChange: (id: ColorId) => void;
}

export function ColorSelector({ colors, value, onChange }: ColorSelectorProps) {
  const groupName = useId();
  const labelId = `${groupName}-label`;
  const selected = colors.find((color) => color.id === value);

  return (
    <div>
      <p id={labelId} className="text-sm font-semibold text-fg">
        Colour: <span className="font-normal text-muted">{selected?.name}</span>
      </p>
      <div role="radiogroup" aria-labelledby={labelId} className="mt-3 flex flex-wrap gap-3">
        {colors.map((color) => (
          <label key={color.id} className="relative cursor-pointer">
            <input
              type="radio"
              name={groupName}
              value={color.id}
              checked={value === color.id}
              onChange={() => onChange(color.id)}
              className="peer sr-only"
            />
            <span className="flex size-11 items-center justify-center rounded-full border-2 border-line p-1 transition-colors hover:border-subtle peer-checked:border-accent peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
              <span
                aria-hidden="true"
                className="block size-full rounded-full border border-subtle"
                style={{ backgroundColor: color.hex }}
              />
            </span>
            <span className="sr-only">{color.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}