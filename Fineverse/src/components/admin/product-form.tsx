"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useFieldArray, useForm, type Path } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { productSchema, type ProductInput } from "@/lib/validations/admin"
import { slugify } from "@/lib/utils"

type CategoryOption = { id: string; name: string; parentId: string | null }
type BrandOption = { id: string; name: string }

// react-hook-form's useFieldArray expects an array of objects (it spreads
// each item to attach an internal `id`, which silently mangles primitive
// strings). `images` and `highlights` are plain string[] in the schema, so
// they're managed as local { key, value }[] state instead and pushed into
// the form via setValue — simpler and correct for primitive arrays.
function useStringListField(form: ReturnType<typeof useForm<ProductInput>>, name: "images" | "highlights", initial: string[]) {
  const [rows, setRows] = useState(() => initial.map((value) => ({ key: crypto.randomUUID(), value })))

  const sync = (next: { key: string; value: string }[]) => {
    setRows(next)
    form.setValue(name as Path<ProductInput>, next.map((r) => r.value) as never, { shouldValidate: false })
  }

  return {
    rows,
    add: () => sync([...rows, { key: crypto.randomUUID(), value: "" }]),
    remove: (index: number) => sync(rows.filter((_, i) => i !== index)),
    update: (index: number, value: string) => sync(rows.map((r, i) => (i === index ? { ...r, value } : r))),
  }
}

export function ProductForm({
  productId,
  defaultValues,
  categories,
  brands,
}: {
  productId?: string
  defaultValues: ProductInput
  categories: CategoryOption[]
  brands: BrandOption[]
}) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues,
  })

  const highlights = useStringListField(form, "highlights", defaultValues.highlights)
  const images = useStringListField(form, "images", defaultValues.images)
  const variants = useFieldArray({ control: form.control, name: "variants" })
  const specifications = useFieldArray({ control: form.control, name: "specifications" })

  const onSubmit = async (values: ProductInput) => {
    setSubmitting(true)
    const url = productId ? `/api/admin/products/${productId}` : "/api/admin/products"
    const res = await fetch(url, {
      method: productId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    setSubmitting(false)

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      toast.error(data.error ?? "Failed to save product")
      return
    }
    toast.success(productId ? "Product updated" : "Product created")
    router.push("/admin/products")
    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        if (!productId) form.setValue("slug", slugify(e.target.value))
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condition</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="NEW">New</SelectItem>
                      <SelectItem value="REFURBISHED">Refurbished</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category & Brand</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.parentId ? `— ${c.name}` : c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brandId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select value={field.value ?? "none"} onValueChange={(v) => field.onChange(v === "none" ? null : v)}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="No brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">No brand</SelectItem>
                      {brands.map((b) => (
                        <SelectItem key={b.id} value={b.id}>
                          {b.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField
              control={form.control}
              name="basePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Price (₹)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      name={field.name}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="compareAtPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compare-at Price (₹)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      name={field.name}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value === "" ? null : Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="costPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost Price (₹)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      name={field.name}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value === "" ? null : Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {images.rows.map((row, index) => (
              <div key={row.key} className="flex items-center gap-2">
                <Input
                  name={`images.${index}`}
                  placeholder="https://..."
                  value={row.value}
                  onChange={(e) => images.update(index, e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Remove image ${index + 1}`}
                  onClick={() => images.remove(index)}
                >
                  <Trash2 className="text-sale size-4" />
                </Button>
              </div>
            ))}
            {typeof form.formState.errors.images?.message === "string" && (
              <p className="text-sale text-sm">{form.formState.errors.images.message}</p>
            )}
            <Button type="button" variant="outline" size="sm" className="w-fit gap-1.5" onClick={images.add}>
              <Plus className="size-3.5" /> Add Image
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Highlights</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {highlights.rows.map((row, index) => (
              <div key={row.key} className="flex items-center gap-2">
                <Input
                  name={`highlights.${index}`}
                  placeholder="e.g. Water resistant up to 50m"
                  value={row.value}
                  onChange={(e) => highlights.update(index, e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Remove highlight ${index + 1}`}
                  onClick={() => highlights.remove(index)}
                >
                  <Trash2 className="text-sale size-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" className="w-fit gap-1.5" onClick={highlights.add}>
              <Plus className="size-3.5" /> Add Highlight
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Variants</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {variants.fields.map((field, index) => (
              <div key={field.id} className="border-border grid grid-cols-2 gap-3 rounded-lg border p-3 sm:grid-cols-4">
                <FormField
                  control={form.control}
                  name={`variants.${index}.sku`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`variants.${index}.size`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Size</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`variants.${index}.color`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`variants.${index}.colorHex`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color Hex</FormLabel>
                      <FormControl>
                        <Input placeholder="#000000" {...field} value={field.value ?? ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`variants.${index}.stock`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          name={field.name}
                          value={field.value ?? 0}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`variants.${index}.lowStockThreshold`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Low Stock At</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          name={field.name}
                          value={field.value ?? 5}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`variants.${index}.priceOverride`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price Override</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          name={field.name}
                          value={field.value ?? ""}
                          onChange={(e) => field.onChange(e.target.value === "" ? null : Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex items-end justify-between gap-2">
                  <FormField
                    control={form.control}
                    name={`variants.${index}.isDefault`}
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2">
                        <FormLabel className="text-xs">Default</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                variants.fields.forEach((_, i) => form.setValue(`variants.${i}.isDefault`, i === index))
                              } else {
                                field.onChange(false)
                              }
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {variants.fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Remove variant ${index + 1}`}
                      onClick={() => variants.remove(index)}
                    >
                      <Trash2 className="text-sale size-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {typeof form.formState.errors.variants?.message === "string" && (
              <p className="text-sale text-sm">{form.formState.errors.variants.message}</p>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-fit gap-1.5"
              onClick={() =>
                variants.append({
                  sku: "",
                  size: "",
                  color: "",
                  colorHex: "",
                  priceOverride: null,
                  stock: 0,
                  lowStockThreshold: 5,
                  isDefault: variants.fields.length === 0,
                })
              }
            >
              <Plus className="size-3.5" /> Add Variant
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Specifications</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {specifications.fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-3 gap-2">
                <FormField
                  control={form.control}
                  name={`specifications.${index}.group`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Group (e.g. Display)" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`specifications.${index}.label`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Label (e.g. Screen Size)" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`specifications.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="Value (e.g. 6.1 inch)" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Remove specification ${index + 1}`}
                    onClick={() => specifications.remove(index)}
                  >
                    <Trash2 className="text-sale size-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-fit gap-1.5"
              onClick={() => specifications.append({ group: "General", label: "", value: "" })}
            >
              <Plus className="size-3.5" /> Add Specification
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category-Specific Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="material"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material (apparel)</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="warrantyMonths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warranty (months, electronics)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      name={field.name}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value === "" ? null : Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minAgeMonths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Age (months, toys)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      name={field.name}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value === "" ? null : Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxAgeMonths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Age (months, toys)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      name={field.name}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value === "" ? null : Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="safetyInfo"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Safety Info (toys)</FormLabel>
                  <FormControl>
                    <Textarea rows={2} {...field} value={field.value ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visibility</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {(["isActive", "isFeatured", "isBestseller", "isNew"] as const).map((name) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="capitalize">{name.replace("is", "")}</FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="metaTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Textarea rows={2} {...field} value={field.value ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="sticky bottom-0 flex justify-end gap-3 border-t border-border bg-background py-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting && <Loader2 className="size-4 animate-spin" />}
            {productId ? "Save Changes" : "Create Product"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
