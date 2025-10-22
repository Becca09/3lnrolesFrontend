'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Mail } from 'lucide-react';

export function ConnectedEmail() {
  const [value, setValue] = useState<'account' | 'alt'>('alt');

  return (
        <div className="grid gap-4 lg:grid-cols-3 py-6">
          <div className=''>
            <p className="text-sm font-medium">Connected email</p>
            <p className="text-xs text-muted-foreground">Select role account</p>
          </div>

          <div className="lg:col-span-2">
            <RadioGroup value={value} onValueChange={(v) => setValue(v as 'account' | 'alt')} className="space-y-4">
              <div className="flex items-start gap-3">
                <RadioGroupItem id="account" value="account" />
                <div>
                  <Label htmlFor="account" className="text-sm font-medium">My account email</Label>
                  <p className="text-xs text-muted-foreground">olivia@untitledui.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <RadioGroupItem id="alt" value="alt" />
                <div className="flex-1 space-y-2">
                  <Label htmlFor="alt" className="text-sm font-medium">An alternative email</Label>
                  <div className="relative w-full">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="email"
                      className="pl-9 bg-white"
                      disabled={value !== 'alt'}
                    />
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>
  );
}
