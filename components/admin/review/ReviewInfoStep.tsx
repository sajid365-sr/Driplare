"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Star } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

interface ReviewInfoStepProps<TFormValues> {
  form: UseFormReturn<TFormValues>;
}

/**
 * ReviewInfoStep Component
 * Step 1: Client Information & Rating
 * Collects basic client details and star rating
 */
export default function ReviewInfoStep<TFormValues extends Record<string, any>>({
  form,
}: ReviewInfoStepProps<TFormValues>) {

  const reviewTextLength = form.watch("reviewText")?.length || 0;
  return (
    <Card className="block w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User size={18} /> Client Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-row gap-5">
        <div className="flex flex-1 flex-col gap-4">
          {/* Client Name */}
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Client Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Designation */}
          <FormField
            control={form.control}
            name="clientRole"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Designation <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="CEO" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company */}
          {/* <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Company <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Tech Corp Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* Rating */}
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Rating <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <SelectItem key={rating} value={String(rating)}>
                        <div className="flex items-center gap-2">
                          {rating}{" "}
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />


        </div>

        <div className="flex-1">

          {/* Client review */}
          <FormField
            control={form.control}
            name="reviewText"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  Review Content *
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write the client's detailed testimonial here..."
                    className="min-h-[200px] text-base resize-none"
                    {...field}
                  />
                </FormControl>
                <div className="flex justify-between items-center">
                  <FormMessage />
                  <p className="text-sm text-muted-foreground">
                    {reviewTextLength}/500 characters (min 20)
                  </p>
                </div>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
