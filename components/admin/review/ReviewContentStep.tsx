"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface ReviewContentStepProps<TFormValues> {
  form: UseFormReturn<TFormValues>;
}

/**
 * ReviewContentStep Component
 * Step 2: Review Content
 * Collects testimonial title and main review text
 */
export default function ReviewContentStep<
  TFormValues extends Record<string, any>
>({ form }: ReviewContentStepProps<TFormValues>) {
  return (
    <Card className="block w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText size={18} /> Review Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Testimonial Title */}
        <FormField
          control={form.control}
          name="testimonialTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Review Title <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Excellent Service & Support" {...field} />
              </FormControl>
              <FormDescription>
                A catchy headline for the testimonial (5-100 characters)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Review Complement */}
        <FormField
          control={form.control}
          name="complement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Review Content <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share the client's detailed feedback about your service, the impact you created, and their overall experience..."
                  className="min-h-[200px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The main testimonial text (20-1000 characters) -{" "}
                {field.value?.length || 0}/1000
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
