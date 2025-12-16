// Source - https://stackoverflow.com/a/78307805
// Posted by ybmeng
// Retrieved 2025-12-16, License - CC BY-SA 4.0

import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
