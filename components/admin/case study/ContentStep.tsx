"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface ContentStepProps {
  form: UseFormReturn<any>;
  lang: "en" | "bn";
  title: string;
}

export default function ContentStep({ form, lang, title }: ContentStepProps) {
  return (
    <Card className="animate-in slide-in-from-right-5 duration-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText size={18} /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name={`${lang}.title`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Case Title</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name={`${lang}.context`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Context</FormLabel>
                <Textarea className="h-24" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`${lang}.problem`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Problem</FormLabel>
                <Textarea className="h-24" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name={`${lang}.solution`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Solution</FormLabel>
                <Textarea className="h-24" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`${lang}.result`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Result</FormLabel>
                <Textarea className="h-24" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name={`${lang}.metric`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Highlight Metric</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`${lang}.testimonial`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Quote</FormLabel>
                <Input {...field} />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
