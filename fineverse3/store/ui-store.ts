import { create } from "zustand";

interface UiState {
  cartOpen: boolean;
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  toggleSearch: () => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>()((set) => ({
  cartOpen: false,
  searchOpen: false,
  mobileMenuOpen: false,
  setCartOpen: (open) => set({ cartOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}));