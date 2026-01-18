"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Calculator } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface MetadataStepProps {
  form: UseFormReturn<any>;
}

export default function MetadataStep({ form }: MetadataStepProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2 block">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe size={18} /> Project Info
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Name</FormLabel>
                  <Input placeholder="Company Name" {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Input placeholder="Automation" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="techTags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tech Stack (Comma Separated)</FormLabel>
                <Input placeholder="Next.js, n8n" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <Input placeholder="SaaS" {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clientLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Input placeholder="USA" {...field} />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="block">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator size={18} /> ROI Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="beforeMetricValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Before Value</FormLabel>
                <Input type="number" {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="afterMetricValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>After Value</FormLabel>
                <Input type="number" {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="metricUnit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit (e.g. %)</FormLabel>
                <Input {...field} />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
