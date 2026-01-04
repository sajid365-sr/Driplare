'use client'

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Star, Loader2 } from "lucide-react";

interface CreateClientReviewProps {
  onSave: () => void;
  onCancel: () => void;
}

export function CreateClientReview({ onSave, onCancel }: CreateClientReviewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({
    clientName: "",
    company: "",
    review: "",
    project: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock review creation - replace with real API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Review added successfully");
      onSave();
    } catch (error) {
      toast.error("Failed to add review");
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-6 w-6 cursor-pointer ${
          i < rating
            ? "text-yellow-400 fill-current"
            : "text-gray-300 hover:text-yellow-400"
        }`}
        onClick={() => setRating(i + 1)}
      />
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Client Review</CardTitle>
        <CardDescription>
          Add a new client testimonial or review
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => updateField("clientName", e.target.value)}
                placeholder="John Smith"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => updateField("company", e.target.value)}
                placeholder="TechCorp Inc."
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex items-center gap-2">
              {renderStars()}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating} out of 5 stars
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project">Project</Label>
            <Select
              value={formData.project}
              onValueChange={(value) => updateField("project", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AI Agent Development">AI Agent Development</SelectItem>
                <SelectItem value="Workflow Automation">Workflow Automation</SelectItem>
                <SelectItem value="Web Development">Web Development</SelectItem>
                <SelectItem value="Data Scraping">Data Scraping</SelectItem>
                <SelectItem value="MERN Stack Development">MERN Stack Development</SelectItem>
                <SelectItem value="Consulting">Consulting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="review">Review</Label>
            <Textarea
              id="review"
              value={formData.review}
              onChange={(e) => updateField("review", e.target.value)}
              placeholder="Write the client review here..."
              rows={4}
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                "Add Review"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
