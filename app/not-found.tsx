import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-xl text-center">
        <div className="text-7xl font-black text-slate-900">404</div>
        <h1 className="mt-3 text-2xl font-semibold text-slate-800">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="outline">
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild>
            <Link href="/marketplace">Browse Marketplace</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
