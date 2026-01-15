import { SignIn } from "@clerk/nextjs";
import { ShieldCheck } from "lucide-react";

export default function SignInPage() {
  return (
    // আমরা flex-col ব্যবহার করছি যাতে মোবাইল এবং ডেক্সটপ উভয় জায়গায় কন্টোল করা যায়
    <div className="min-h-screen w-full bg-background flex flex-col">
      {/* নেভিগেশন বারের জন্য একটি সেফটি স্পেস (nav-height যদি ৮০ পিক্সেল হয়) */}
      <div className="h-20 w-full" />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* LEFT SIDE: Branding */}
        <div className="hidden lg:flex flex-col justify-center p-12 relative bg-primary/5 border-r border-border/50">
          <div className="relative z-10 space-y-6 max-w-lg">
            <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
              <ShieldCheck size={32} className="text-primary" />
            </div>
            <h1 className="text-5xl font-black tracking-tighter leading-tight text-foreground">
              Welcome Back to <br />
              <span className="text-primary">Driplare Portal</span>
            </h1>
            <p className="text-muted-foreground text-lg font-medium">
              Securely access your AI agents and manage workflows.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Auth Form */}
        <div className="flex items-start lg:items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md mt-10 lg:mt-0">
            <SignIn appearance={clerkTheme} />
          </div>
        </div>
      </div>
    </div>
  );
}

const clerkTheme = {
  elements: {
    // কার্ডে হালকা ব্যাকগ্রাউন্ড এবং বর্ডার দিলে এটি নেভিগেশন থেকে আলাদা মনে হবে
    card: "shadow-none border-0 bg-transparent",
    rootBox: "w-full",
    formButtonPrimary:
      "bg-primary hover:bg-primary/90 text-sm font-bold uppercase tracking-widest rounded-xl h-11",
    headerTitle: "text-3xl font-black tracking-tight text-foreground",
    headerSubtitle: "text-muted-foreground font-medium mb-4",
    socialButtonsBlockButton: "border-border hover:bg-accent rounded-xl h-11",
    formFieldInput:
      "bg-accent/30 border-border focus:border-primary rounded-xl h-11",
    footerActionLink: "text-primary font-bold",
  },
} as const;
