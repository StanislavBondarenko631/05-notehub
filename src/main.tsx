import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./components/App/App";

const queryClient = new QueryClient();

createRoot(document.getElementById("root") as HTMLDivElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" reverseOrder={false} />
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);
