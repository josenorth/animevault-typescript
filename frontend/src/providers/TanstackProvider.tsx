// 'use client';

// import { ReactNode, useState } from "react";
// import { QueryClient } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { QueryClientProvider } from "@tanstack/react-query";

// export default function TanstackProvider({ children }: { children: ReactNode }) {
//   const [queryClient] = useState(() =>
//     new QueryClient({
//       defaultOptions: {
//         queries: {
//           staleTime: 43200 * 1000, // 12 horas
//           cacheTime: 43200 * 1000,
//           refetchOnWindowFocus: false,
//         },
//       },
//     })
//   );

//   return (
//     <QueryClientProvider client={queryClient}>
//       <ReactQueryDevtools initialIsOpen={false} />
//       {children}
//     </QueryClientProvider>
//   );
// }
