"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Plus } from "lucide-react";
import { ReviewTable } from "@/components/admin/review/ReviewTable";
import { CreateClientReview } from "@/components/admin/review/CreateClientReview";
import { getReviews, type Testimonial } from "@/lib/review-action";

// ডেমো ডাটা - যদি ডাটাবেজ খালি থাকে
const FALLBACK_REVIEWS = [
  {
    id: "demo-1",
    name: "John Smith",
    company: "TechCorp Inc.",
    designation: "CTO",
    testimonialTitle: "Amazing Service",
    complement: "Excellent work on our AI implementation.",
    imageUrl: "https://github.com/shadcn.png",
    status: "approved",
    createdAt: new Date(),
  },
];

export default function ClientReviewPage() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("list");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      // server action থেকে ডাটা ফেচ করা হচ্ছে
      const response = await getReviews(1, 50); // ১ নম্বর পেজ থেকে ৫০টি ডাটা

      if (response && response.data && response.data.length > 0) {
        setReviews(response.data);
      } else {
        setReviews(FALLBACK_REVIEWS as any); // ডাটা না থাকলে ডেমো ডাটা
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-[#FF6B00]" />
            <p className="text-muted-foreground">
              Loading client reviews from database...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">
                Client Reviews Management
              </CardTitle>
              <CardDescription>
                Manage, approve, or create new client testimonials for your
                website.
              </CardDescription>
            </div>
            <Button
              onClick={() => setActiveTab("create")}
              className="bg-[#FF6B00] hover:bg-[#e66000]"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Review
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="list">All Reviews ({reviews.length})</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <ReviewTable reviews={reviews} onRefresh={fetchReviews} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="mt-6">
          <CreateClientReview
            onSave={() => {
              fetchReviews();
              setActiveTab("list");
            }}
            onCancel={() => setActiveTab("list")}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
