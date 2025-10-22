import Link from 'next/link';
import { Frown } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <Frown className="h-20 w-20 text-[var(--purple-text)] animate-bounce" />
      <h1 className="text-xl font-semibold text-[var(--purple-text)]">oops! this page isn&apos;t ready.....</h1>
      <Link href="/" className="mt-2 text-sm text-[var(--purple-text)] underline">
        Go back home
      </Link>
    </div>
  );
}
