"use client"

import { Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PrintInvoiceButton() {
  return (
    <Button variant="outline" size="sm" className="gap-1.5 print:hidden" onClick={() => window.print()}>
      <Printer className="size-3.5" /> Print Invoice
    </Button>
  )
}
