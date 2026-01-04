'use client'

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
import { Loader2, Plus, Star } from "lucide-react";
import { ReviewTable } from "@/components/admin/review/ReviewTable";
import { CreateClientReview } from "@/components/admin/review/CreateClientReview";

interface ClientReview {
  id: string;
  clientName: string;
  company: string;
  rating: number;
  review: string;
  project: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
}

export default function ClientReview() {
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("list");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      // Mock data - replace with real API call
      const mockReviews: ClientReview[] = [
        {
          id: "1",
          clientName: "John Smith",
          company: "TechCorp Inc.",
          rating: 5,
          review: "Excellent work on our AI implementation. The team delivered beyond our expectations.",
          project: "AI Agent Development",
          status: "approved",
          createdAt: new Date("2024-01-15"),
        },
        {
          id: "2",
          clientName: "Sarah Johnson",
          company: "StartupXYZ",
          rating: 4,
          review: "Great workflow automation solution. Very responsive team.",
          project: "Workflow Automation",
          status: "pending",
          createdAt: new Date("2024-01-20"),
        },
      ];
      setReviews(mockReviews);
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
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading client reviews...</p>
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
              <CardTitle className="text-2xl font-bold">Client Reviews</CardTitle>
              <CardDescription>
                Manage client testimonials and reviews
              </CardDescription>
            </div>
            <Button onClick={() => setActiveTab("create")}>
              <Plus className="h-4 w-4 mr-2" />
              Add Review
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list">All Reviews</TabsTrigger>
          <TabsTrigger value="create">Add New</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          <ReviewTable
            reviews={reviews}
            onRefresh={fetchReviews}
          />
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
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
