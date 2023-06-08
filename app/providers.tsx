'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, cookieStorageManager } from '@chakra-ui/react';

export function Providers({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <CacheProvider>
      <ChakraProvider colorModeManager={cookieStorageManager}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}