"use client";

import Link from "next/link";
import { CountdownTimer } from "@/components/home/countdown-timer";
import { DropStatusBadge } from "@/components/home/drop-status-badge";
import { DropStockMeter } from "@/components/home/drop-stock-meter";
import { Accordion, type AccordionItemData } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { StarRating } from "@/components/ui/star-rating";
import { pluralize } from "@/lib/format";
import type { SizeChart } from "@/types/content";
import type { Drop, DropStatus } from "@/types/drop";
import type { ColorId, Product, SizeId } from "@/types/product";
import { ColorSelector } from "./color-selector";
import { DeliveryChecker } from "./delivery-checker";
import { DeliveryReturnsInfo } from "./delivery-returns-info";
import { FabricSpecs } from "./fabric-specs";
import { ProductBadges } from "./product-badges";
import { SizeGuideTrigger } from "./size-guide-trigger";
import { SizeSelector } from "./size-selector";
import { StockIndicator } from "./stock-indicator";
import { WishlistButton } from "./wishlist-button";

/** The sticky mobile bar watches this element. */
export const MAIN_CTA_ID = "main-cta";

interface DropNoticeProps {
  drop: Drop;
  status: DropStatus;
  serverNow: number;
}

function DropNotice({ drop, status, serverNow }: DropNoticeProps) {
  return (
    <div className="rounded-lg border border-line bg-surface p-4">
      <div className="flex flex-wrap items-center gap-2">
        <DropStatusBadge drop={drop} serverNow={serverNow} />
        <Link
          href={drop.collectionSlug ? `/collections/${drop.collectionSlug}` : "/shop"}
          className="text-sm text-muted underline underline-offset-4 hover:text-accent"
        >
          {drop.tagline}: {drop.name}
        </Link>
      </div>
      {status === "upcoming" ? (
        <>
          <p className="mt-3 text-sm text-muted">This product goes on sale when the drop starts.</p>
          <CountdownTimer targetIso={drop.startsAt} serverNow={serverNow} className="mt-3" />
        </>
      ) : (
        <DropStockMeter drop={drop} serverNow={serverNow} className="mt-3" />
      )}
    </div>
  );
}

interface PurchasePanelProps {
  product: Product;
  colorId: ColorId;
  onColorChange: (id: ColorId) => void;
  size: SizeId | null;
  onSizeChange: (size: SizeId) => void;
  sizeError: string | null;
  quantity: number;
  maxQuantity: number;
  onQuantityChange: (quantity: number) => void;
  sizeChart: SizeChart | null;
  drop: Drop | null;
  dropStatus: DropStatus | null;
  serverNow: number;
  cta: { label: string; disabled: boolean };
  onAdd: () => void;
}

export function PurchasePanel({
  product,
  colorId,
  onColorChange,
  size,
  onSizeChange,
  sizeError,
  quantity,
  maxQuantity,
  onQuantityChange,
  sizeChart,
  drop,
  dropStatus,
  serverNow,
  cta,
  onAdd,
}: PurchasePanelProps) {
  const { rating } = product;

  const infoItems: AccordionItemData[] = [
    { id: "specs", title: "Fabric & specs", content: <FabricSpecs product={product} /> },
    { id: "delivery", title: "Delivery & returns", content: <DeliveryReturnsInfo /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-start justify-between gap-3">
          <ProductBadges product={product} />
          <WishlistButton
            slug={product.slug}
            name={product.name}
            className="-mr-1 -mt-1 shrink-0 border border-line"
          />
        </div>
        <h1 className="mt-2 text-balance font-display text-display-md uppercase text-fg">
          {product.name}
        </h1>

        {rating.count > 0 ? (
          <a href="#reviews" className="mt-3 inline-flex min-h-tap items-center gap-2">
            <StarRating rating={rating.average} size={18} />
            <span className="text-sm text-muted underline underline-offset-4">
              {rating.average.toFixed(1)} · {rating.count} {rating.isMock ? "sample " : ""}
              {pluralize(rating.count, "review")}
            </span>
          </a>
        ) : null}

        <Price price={product.price} compareAtPrice={product.compareAtPrice} size="lg" className="mt-3" />
        <p className="mt-4 text-lg leading-7 text-muted">{product.description}</p>
      </div>

      {drop && dropStatus ? <DropNotice drop={drop} status={dropStatus} serverNow={serverNow} /> : null}

      <ColorSelector colors={product.colors} value={colorId} onChange={onColorChange} />

      <SizeSelector
        sizes={product.sizes}
        value={size}
        onChange={onSizeChange}
        error={sizeError}
        action={sizeChart ? <SizeGuideTrigger chart={sizeChart} /> : undefined}
      />

      <StockIndicator product={product} size={size} />

      <div id={MAIN_CTA_ID} className="flex flex-wrap items-center gap-3">
        <QuantityStepper
          value={quantity}
          max={maxQuantity}
          label={product.name}
          onChange={onQuantityChange}
        />
        <Button size="lg" onClick={onAdd} disabled={cta.disabled} className="min-w-[12rem] flex-1">
          {cta.label}
        </Button>
      </div>

      <DeliveryChecker />

      <Accordion items={infoItems} type="multiple" defaultOpenIds={["specs"]} headingLevel={2} />
    </div>
  );
}