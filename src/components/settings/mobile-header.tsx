'use client';

import { Menu } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Logomark from '@/assets/Logomark.jpg';
import { useState } from 'react';
import { Drawer } from '@/components/ui/drawer';
import { MobileDrawerSidebar } from '@/components/settings/mobile-drawer-sidebar';


export function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
            <Image
              src={Logomark}
              alt="Logo"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <span className="font-semibold text-md">Untitled UI</span>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          aria-controls="mobile-drawer"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </Button>
      </header>

      <Drawer open={open} onClose={() => setOpen(false)} widthClass="w-64" side="left">
        <MobileDrawerSidebar onNavigate={() => setOpen(false)} />
      </Drawer>
    </>
  );
}
