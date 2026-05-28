import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { router } from "@/routes";
import { ThemeProvider } from "@/context/ThemeContext";
import { BillingProvider } from "@/context/BillingContext";

function App() {
  return (
    <ThemeProvider>
      <BillingProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "var(--toast-bg, #fff)",
              color: "var(--toast-color, #363636)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              borderRadius: "8px",
              padding: "12px 16px",
            },
            success: {
              iconTheme: { primary: "#10b981", secondary: "#fff" },
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#fff" },
            },
          }}
        />
        <RouterProvider router={router} />
      </BillingProvider>
    </ThemeProvider>
  );
}

export default App;
