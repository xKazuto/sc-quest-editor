
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "next-themes";
import { DarkModeToggle } from "./components/DarkModeToggle";
import Index from "./pages/Index";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

// Move ProtectedRoute and AppRoutes inside a new component that's rendered within AuthProvider
const AppContent = () => {
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return <>{children}</>;
  };

  return (
    <>
      <div className="fixed top-4 left-4 z-50">
        <DarkModeToggle />
      </div>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
