'use client'
import '@rainbow-me/rainbowkit/styles.css';
import * as React from 'react';
import "../styles/globals.css";

import { Providers } from '@/app/providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}