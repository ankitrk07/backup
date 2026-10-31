"use client"

import { Ruler } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const sizeChart = [
  { size: "XS / 28-30", chest: "34-35", waist: "27-28", hip: "35-36" },
  { size: "S / 30-32", chest: "36-37", waist: "29-30", hip: "37-38" },
  { size: "M / 32-34", chest: "38-40", waist: "31-33", hip: "39-41" },
  { size: "L / 34-36", chest: "41-43", waist: "34-36", hip: "42-44" },
  { size: "XL / 36-38", chest: "44-46", waist: "37-39", hip: "45-47" },
]

export function SizeGuideDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-brand inline-flex items-center gap-1 text-xs font-medium hover:underline"
        >
          <Ruler className="size-3.5" /> Size Guide
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Size Guide</DialogTitle>
          <DialogDescription>All measurements in inches. For the best fit, measure a similar garment you own.</DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Size</TableHead>
              <TableHead>Chest</TableHead>
              <TableHead>Waist</TableHead>
              <TableHead>Hip</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sizeChart.map((row) => (
              <TableRow key={row.size}>
                <TableCell className="font-medium">{row.size}</TableCell>
                <TableCell>{row.chest}</TableCell>
                <TableCell>{row.waist}</TableCell>
                <TableCell>{row.hip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}
