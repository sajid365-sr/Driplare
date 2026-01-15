import { SignUp } from "@clerk/nextjs";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function SignUpPage() {
  return (
    // মেইন কন্টেইনারে flex-col ব্যবহার করা হয়েছে যাতে নেভিগেশন বারের পর থেকে কন্টেন্ট শুরু হয়
    <div className="min-h-screen w-full py-20 bg-background flex flex-col">
      {/* SPACER: আপনার নেভিগেশন বার যদি Fixed হয়, তবে এই Div টি তাকে জায়গা করে দেবে।
          আপনার নেভিগেশন বার অনেক বড় হলে h-20 কে h-28 বা তার বেশি করতে পারেন।
      */}
      <div className="h-16   lg:h-10 w-full shrink-0" />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden px-4 sm:px-8">
        {/* LEFT SIDE: Branding & Features (Desktop Only) */}
        <div className="hidden lg:flex flex-col justify-center p-12 relative bg-primary/5 border border-border/50 rounded-3xl mb-8">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>

          <div className="relative z-10 space-y-8 max-w-lg">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
              <Sparkles size={14} /> Join the Intelligence Revolution
            </div>

            <h1 className="text-5xl font-black tracking-tighter leading-none">
              Scale Faster with <br />
              <span className="text-primary italic underline decoration-primary/20 text-6xl">
                AI Agents
              </span>
            </h1>

            <div className="space-y-4 pt-4">
              <FeatureItem text="Deploy pre-trained agents in minutes" />
              <FeatureItem text="Secure API integration with your CRM" />
              <FeatureItem text="24/7 autonomous workflow management" />
            </div>

            <div className="pt-8 border-t border-border/50">
              <p className="text-sm font-mono text-muted-foreground uppercase tracking-[0.3em]">
                [ DRIPLARE_ACCESS_PROTOCOL_V2 ]
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: SignUp Form */}
        <div className="flex flex-col items-center justify-start lg:justify-center py-8 lg:py-0">
          <div className="w-full max-w-md">
            {/* Clerk-এর SignUp কম্পোনেন্ট। 
                এটির উপরে mt-10 দেওয়া হয়েছে যাতে মোবাইল স্ক্রিনে এটি নেভিগেশন থেকে দূরে থাকে।
            */}
            <div className="mt-4 lg:mt-0">
              <SignUp appearance={clerkTheme} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-muted-foreground font-medium">
      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
        <CheckCircle2 size={14} className="text-primary" />
      </div>
      <span>{text}</span>
    </div>
  );
}

const clerkTheme = {
  elements: {
    rootBox: "w-full",
    card: "shadow-none border-0 bg-transparent",
    formButtonPrimary:
      "bg-primary hover:bg-primary/90 text-sm font-bold uppercase tracking-widest rounded-xl transition-all h-12 shadow-lg shadow-primary/20",
    headerTitle: "text-3xl font-black tracking-tight text-foreground",
    headerSubtitle: "text-muted-foreground font-medium mb-6",
    socialButtonsBlockButton:
      "border-border hover:bg-accent transition-all rounded-xl h-11",
    formFieldInput:
      "bg-accent/30 border-border focus:border-primary transition-all rounded-xl h-11",
    footerActionLink: "text-primary hover:text-primary/80 font-bold",
    identityPreviewText: "text-foreground font-bold",
  },
} as const;
