"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserList from "./user/user";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserList />
    </QueryClientProvider>
  );
}
