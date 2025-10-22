'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Logomark from '@/assets/Logomark.jpg';
import { navigation } from '@/components/settings/sidebar';
import { cn } from '@/lib/utils';
import { LogOut, Play } from 'lucide-react';
import FeatureImg from '@/assets/Image.jpg';
import ryhe from '@/assets/rhyaAvater.jpg';
import { SearchBar } from './search-bar';

export function MobileDrawerSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col h-full w-full bg-card">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
          <Image src={Logomark} alt="Logo" width={32} height={32} className="object-cover" />
        </div>
        <span className="font-semibold text-md">Untitled UI</span>
      </div>

      <div className="px-3 py-4">
        <SearchBar placeholder="" />
      </div>

      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                'flex items-center justify-between gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-white shadow-sm text-accent-foreground border border-border'
                  : 'text-muted-foreground hover:bg-accent/40 hover:text-accent-foreground hover:shadow-sm'
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                {item.name}
              </div>
              {item.badge && (
                <span className="flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-muted text-xs font-medium text-foreground">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      

      <div className="bg-muted rounded-lg p-4 m-5">
        <p className="text-sm font-semibold mb-1">New features available!</p>
        <p className="text-xs text-muted-foreground mb-3">
          Check out the new dashboard view. Pages now load faster.
        </p>
        <div className="relative mb-3 rounded-lg  overflow-hidden">
          <Image
            src={FeatureImg}
            alt="New features preview"
            className="object-cover"
            width={480}
            height={270}
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center shadow">
              <Play className="h-4 w-4 text-foreground opacity-10" />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="text-xs text-muted-foreground hover:text-foreground">
            Dismiss
          </button>
          <button className="text-xs text-[var(--purple-text)] hover:text-[var(--purple-text)] font-medium hover:underline">
            What&apos;s new?
          </button>
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mt-2">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            <Image
              src={ryhe}
              alt="Logo"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Olivia Rhye</p>
            <p className="text-xs text-muted-foreground truncate">olivia@untitledui.com</p>
          </div>
          <div>
            <LogOut className="w-5 h-5 text-[#667085]" />
          </div>
        </div>
      </div>
    </aside>
  );
}
