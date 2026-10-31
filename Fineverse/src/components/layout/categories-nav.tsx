import Link from "next/link"
import type { Route } from "next"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { navCategories } from "@/lib/constants"

export function CategoriesNav() {
  return (
    <NavigationMenu viewport={false} className="max-w-none justify-start">
      <NavigationMenuList className="gap-0.5">
        {navCategories.map((cat) => (
          <NavigationMenuItem key={cat.href}>
            <NavigationMenuTrigger className="bg-transparent">{cat.label}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[320px] p-2">
                <Link
                  href={cat.href as Route}
                  className="mb-1 block rounded-lg px-2 py-2 text-sm font-semibold text-foreground hover:bg-muted"
                >
                  All {cat.label}
                  <span className="text-muted-foreground mt-0.5 block text-xs font-normal">
                    {cat.description}
                  </span>
                </Link>
                <div className="grid grid-cols-2 gap-0.5 border-t border-border pt-1.5">
                  {cat.subcategories.map((sub) => (
                    <NavigationMenuLink key={sub.href} asChild>
                      <Link href={sub.href as Route}>{sub.label}</Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
