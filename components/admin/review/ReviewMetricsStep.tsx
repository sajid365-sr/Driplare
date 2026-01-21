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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, CheckCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface ReviewMetricsStepProps<TFormValues> {
  form: UseFormReturn<TFormValues>;
}

/**
 * ReviewMetricsStep Component
 * Step 4: Impact Metrics & Status
 * Collects optional performance metrics and publication status
 */
export default function ReviewMetricsStep<
  TFormValues extends Record<string, any>
>({ form }: ReviewMetricsStepProps<TFormValues>) {
  return (
    <div className="space-y-6">
      {/* Impact Metrics Card */}
      <Card className="block w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp size={18} /> Impact Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Time Saved */}
            <FormField
              control={form.control}
              name="timeSaved"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Saved</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 20 hours/week" {...field} />
                  </FormControl>
                  <FormDescription>
                    Quantify the time savings achieved
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Efficiency Gain */}
            <FormField
              control={form.control}
              name="efficiencyGain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Efficiency Gain</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 80% faster" {...field} />
                  </FormControl>
                  <FormDescription>
                    Percentage or metric improvement
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Publication Status Card */}
      <Card className="block w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle size={18} /> Publication Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="approved">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Approved - Visible on website
                      </div>
                    </SelectItem>
                    <SelectItem value="pending">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        Pending - Awaiting review
                      </div>
                    </SelectItem>
                    <SelectItem value="rejected">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        Rejected - Not visible
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Control review visibility on the website
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
