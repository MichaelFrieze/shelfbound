/* eslint-disable @typescript-eslint/no-explicit-any */
import { HydrateClient, prefetch } from "@/trpc/server";
import { type TRPCQueryOptions } from "@trpc/tanstack-react-query";
import { unstable_noStore } from "next/cache";
import { type ReactNode } from "react";

type TRPCPrefetchProps = {
  queryOptionsToPrefetch: ReturnType<TRPCQueryOptions<any>>[];
  children: ReactNode;
};

// Only use this to wrap a single client component
export function TRPCPrefetch({
  queryOptionsToPrefetch,
  children,
}: TRPCPrefetchProps) {
  return (
    <PrefetchAndHydrate queryOptionsToPrefetch={queryOptionsToPrefetch}>
      {children}
    </PrefetchAndHydrate>
  );
}

type PrefetchAndHydrateProps = {
  queryOptionsToPrefetch: ReturnType<TRPCQueryOptions<any>>[];
  children: ReactNode;
};

function PrefetchAndHydrate({
  queryOptionsToPrefetch,
  children,
}: PrefetchAndHydrateProps) {
  unstable_noStore(); // opt out of pre-rendering
  queryOptionsToPrefetch.map((p) => {
    prefetch(p);
  });
  return <HydrateClient>{children}</HydrateClient>;
}
