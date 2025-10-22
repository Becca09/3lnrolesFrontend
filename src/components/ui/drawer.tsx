"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right";
  widthClass?: string;
  children: ReactNode;
};

export function Drawer({ open, onClose, side = "left", widthClass = "w-72", children }: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const translateFrom = side === "left" ? "-translate-x-full" : "translate-x-full";
  const sidePos = side === "left" ? "left-0" : "right-0";

  return createPortal(
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className={[
          "absolute top-0 h-full bg-card border-border shadow-xl border",
          sidePos,
          widthClass,
          "transition-transform duration-200 ease-out",
          open ? "translate-x-0" : translateFrom,
        ].join(" ")}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
