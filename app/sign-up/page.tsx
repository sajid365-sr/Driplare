import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Background Blueprint Decorative Element */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none dark:opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="relative mt-32 mb-10 z-10 w-full max-w-md px-4">
        <SignUp
          appearance={clerkTheme}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
        />
      </div>

      <p className="mt-8 text-sm text-muted-foreground font-mono uppercase tracking-tighter">
        [ DRIPLARE_SECURE_ACCESS_PROTOCOL ]
      </p>
    </div>
  );
}

// Clerk Appearance Customization (The "Secret Sauce")
const clerkTheme = {
  elements: {
    formButtonPrimary:
      "bg-primary hover:bg-primary/90 text-sm font-bold uppercase tracking-widest rounded-lg transition-all",
    card: "shadow-2xl border border-border/50 bg-background/50 backdrop-blur-xl rounded-2xl",
    headerTitle: "text-2xl font-extrabold tracking-tight text-foreground",
    headerSubtitle: "text-muted-foreground font-medium",
    socialButtonsBlockButton:
      "border-border hover:bg-accent transition-all rounded-lg",
    formFieldInput:
      "bg-accent/50 border-border focus:border-primary transition-all rounded-lg",
    footerActionLink: "text-primary hover:text-primary/80 font-bold",
  },
  layout: {
    socialButtonsPlacement: "bottom" as const,
    shimmer: true,
  },
} as const;
