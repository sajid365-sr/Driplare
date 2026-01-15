"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Badge,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Edit,
  ExternalLink,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { deleteCaseStudy, getAllCaseStudies } from "@/lib/case-study-action";
import { useEffect, useState } from "react";

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    setIsLoading(true);
    try {
      const res = await getAllCaseStudies();
      if (res.success) {
        setCaseStudies(res.data);
      } else {
        toast.error("Failed to load case studies");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this case study?")) {
      try {
        const res = await deleteCaseStudy(id);
        if (res.success) {
          toast.success("Deleted successfully");
          fetchCaseStudies(); // রিফ্রেশ ডাটা
        } else {
          toast.error("Delete failed");
        }
      } catch (error) {
        toast.error("Error deleting case study");
      }
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = caseStudies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(caseStudies.length / itemsPerPage);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading Case Studies...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Case Studies</h2>
        <Link href="/admin/case-studies/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Case Study
          </Button>
        </Link>
      </div>

      {/* এখানে আপনার টেবিল কম্পোনেন্ট বসবে */}
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        {/* Case Studies Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Case Studies ({caseStudies.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Title</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((study) => (
                    <TableRow key={study.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                            <Briefcase className="w-4 h-4 text-orange-600" />
                          </div>
                          <div className="font-medium max-w-[200px] truncate">
                            {study.en.title}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{study.clientName}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{study.category}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {study.industry}
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(study.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            title="View Live"
                          >
                            <Link
                              href={`/case-studies/${study.slug}`}
                              target="_blank"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            title="Edit"
                          >
                            <Link href={`/admin/case-studies/edit/${study.id}`}>
                              <Edit className="h-4 w-4 text-blue-600" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(study.id)}
                            className="text-red-600 hover:text-red-700"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center h-24 text-muted-foreground"
                    >
                      No case studies found. Start by adding one!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-muted-foreground">
                  Showing {indexOfFirstItem + 1} to{" "}
                  {Math.min(indexOfLastItem, caseStudies.length)} of{" "}
                  {caseStudies.length}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                  </Button>
                  <div className="flex items-center gap-1 mx-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        size="sm"
                        className="w-8 h-8 p-0"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
