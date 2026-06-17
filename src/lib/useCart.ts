"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { products } from "@/lib/products";

type StoredCartItem = {
  productId: string;
  quantity: number;
};

export type CartLineItem = StoredCartItem & {
  product: (typeof products)[number];
};

const storageKey = "vye-cart";
const emptyCartSnapshot = "[]";
const cartChangeEvent = "vye-cart-change";

function normalizeQuantity(quantity: number) {
  if (!Number.isFinite(quantity)) return 1;

  return Math.max(1, Math.min(99, Math.round(quantity)));
}

function parseCart(snapshot: string): StoredCartItem[] {
  try {
    const parsed = JSON.parse(snapshot) as StoredCartItem[];

    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item) =>
        products.some((product) => product.id === item.productId),
      )
      .map((item) => ({
        productId: item.productId,
        quantity: normalizeQuantity(item.quantity),
      }));
  } catch {
    return [];
  }
}

function getCartSnapshot() {
  if (typeof window === "undefined") return emptyCartSnapshot;

  return window.localStorage.getItem(storageKey) ?? emptyCartSnapshot;
}

function getServerCartSnapshot() {
  return emptyCartSnapshot;
}

function subscribeToCartUpdates(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener(cartChangeEvent, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(cartChangeEvent, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function writeCart(items: StoredCartItem[]) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(storageKey, JSON.stringify(items));
  window.dispatchEvent(new Event(cartChangeEvent));
}

function readCart() {
  return parseCart(getCartSnapshot());
}

export function useCart() {
  const snapshot = useSyncExternalStore(
    subscribeToCartUpdates,
    getCartSnapshot,
    getServerCartSnapshot,
  );

  const items = useMemo(() => parseCart(snapshot), [snapshot]);
  const lineItems = useMemo<CartLineItem[]>(
    () =>
      items
        .map((item) => {
          const product = products.find(
            (productItem) => productItem.id === item.productId,
          );

          return product ? { ...item, product } : null;
        })
        .filter((item): item is CartLineItem => Boolean(item)),
    [items],
  );

  const totalQuantity = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const addItem = useCallback((productId: string, quantity = 1) => {
    const currentItems = readCart();
    const currentItem = currentItems.find((item) => item.productId === productId);

    if (currentItem) {
      writeCart(
        currentItems.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: normalizeQuantity(item.quantity + quantity),
              }
            : item,
        ),
      );
      return;
    }

    writeCart([
      ...currentItems,
      { productId, quantity: normalizeQuantity(quantity) },
    ]);
  }, []);

  const updateItemQuantity = useCallback((productId: string, quantity: number) => {
    writeCart(
      readCart().map((item) =>
        item.productId === productId
          ? { ...item, quantity: normalizeQuantity(quantity) }
          : item,
      ),
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    writeCart(readCart().filter((item) => item.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    writeCart([]);
  }, []);

  const getItemQuantity = useCallback(
    (productId: string) =>
      items.find((item) => item.productId === productId)?.quantity ?? 0,
    [items],
  );

  return {
    addItem,
    clearCart,
    getItemQuantity,
    items: lineItems,
    removeItem,
    totalQuantity,
    updateItemQuantity,
  };
}
