// 'use client'

// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Loader2 } from "lucide-react";
// import {
//   getFormSubmissions,
//   updateSubmissionStatus,
//   deleteSubmissions,
//   CombinedSubmission,
// } from "@/utils/form-utils";
// import { toast } from "sonner";
// import { exportToCSV } from "@/utils/csv-export";
// import { DebugInfoPanel } from "@/components/admin/dashboard/DebugInfoPanel";
// import { SubmissionsFilters } from "@/components/admin/dashboard/SubmissionsFilters";
// import { SubmissionsActions } from "@/components/admin/dashboard/SubmissionsActions";
// import { SubmissionsTable } from "@/components/admin/dashboard/SubmissionsTable";
// import { EmptyState } from "@/components/admin/dashboard/EmptyState";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { Button } from "@/components/ui/button";

// export default function Dashboard() {
//   const [submissions, setSubmissions] = useState<CombinedSubmission[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([]);
//   const [filter, setFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [debugInfo, setDebugInfo] = useState<string>("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);

//   useEffect(() => {
//     fetchSubmissions();
//   }, []);

//   // Filter and search logic
//   const filteredSubmissions = submissions.filter((submission) => {
//     const matchesFilter =
//       filter === "all" ||
//       (filter === "pending" && submission.status === "pending") ||
//       (filter === "approved" && submission.status === "approved") ||
//       (filter === "rejected" && submission.status === "rejected");

//     const matchesSearch =
//       searchTerm === "" ||
//       submission.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       submission.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       submission.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       submission.message?.toLowerCase().includes(searchTerm.toLowerCase());

//     return matchesFilter && matchesSearch;
//   });

//   // Pagination logic
//   const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedSubmissions = filteredSubmissions.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const fetchSubmissions = async () => {
//     setIsLoading(true);
//     try {
//       const data = await getFormSubmissions();
//       setSubmissions(data);
//       setDebugInfo(`Loaded ${data.length} submissions successfully`);
//     } catch (error) {
//       console.error("Error fetching submissions:", error);
//       toast.error("Failed to load submissions");
//       setDebugInfo(`Error loading submissions: ${error}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (id: string, status: string) => {
//     try {
//       await updateSubmissionStatus(id, status);
//       setSubmissions((prev) =>
//         prev.map((sub) =>
//           sub.id === id ? { ...sub, status: status as any } : sub
//         )
//       );
//       toast.success(`Submission ${status}`);
//     } catch (error) {
//       console.error("Error updating submission:", error);
//       toast.error("Failed to update submission");
//     }
//   };

//   const handleBulkStatusUpdate = async (status: string) => {
//     if (selectedSubmissions.length === 0) {
//       toast.warning("No submissions selected");
//       return;
//     }

//     try {
//       await Promise.all(
//         selectedSubmissions.map((id) => updateSubmissionStatus(id, status))
//       );
//       setSubmissions((prev) =>
//         prev.map((sub) =>
//           selectedSubmissions.includes(sub.id)
//             ? { ...sub, status: status as any }
//             : sub
//         )
//       );
//       setSelectedSubmissions([]);
//       toast.success(`${selectedSubmissions.length} submissions ${status}`);
//     } catch (error) {
//       console.error("Error updating submissions:", error);
//       toast.error("Failed to update submissions");
//     }
//   };

//   const handleDelete = async (ids: string[]) => {
//     setIsDeleting(true);
//     try {
//       await deleteSubmissions(ids);
//       setSubmissions((prev) => prev.filter((sub) => !ids.includes(sub.id)));
//       setSelectedSubmissions((prev) =>
//         prev.filter((id) => !ids.includes(id))
//       );
//       toast.success(`${ids.length} submission(s) deleted`);
//     } catch (error) {
//       console.error("Error deleting submissions:", error);
//       toast.error("Failed to delete submissions");
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     await fetchSubmissions();
//     setIsRefreshing(false);
//     toast.success("Data refreshed");
//   };

//   const handleExport = () => {
//     try {
//       exportToCSV(filteredSubmissions, "submissions_export");
//       toast.success("Data exported successfully");
//     } catch (error) {
//       console.error("Error exporting data:", error);
//       toast.error("Failed to export data");
//     }
//   };

//   const getPaginationItems = () => {
//     const items = [];
//     const maxVisiblePages = 5;
//     const halfVisible = Math.floor(maxVisiblePages / 2);

//     let startPage = Math.max(1, currentPage - halfVisible);
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }

//     // Add first page and ellipsis if needed
//     if (startPage > 1) {
//       items.push(
//         <PaginationItem key={1}>
//           <PaginationLink
//             onClick={() => setCurrentPage(1)}
//             isActive={currentPage === 1}
//           >
//             1
//           </PaginationLink>
//         </PaginationItem>
//       );
//       if (startPage > 2) {
//         items.push(
//           <PaginationItem key="start-ellipsis">
//             <PaginationEllipsis />
//           </PaginationItem>
//         );
//       }
//     }

//     // Add visible pages
//     for (let i = startPage; i <= endPage; i++) {
//       items.push(
//         <PaginationItem key={i}>
//           <PaginationLink
//             onClick={() => setCurrentPage(i)}
//             isActive={currentPage === i}
//           >
//             {i}
//           </PaginationLink>
//         </PaginationItem>
//       );
//     }

//     // Add last page and ellipsis if needed
//     if (endPage < totalPages) {
//       if (endPage < totalPages - 1) {
//         items.push(
//           <PaginationItem key="end-ellipsis">
//             <PaginationEllipsis />
//           </PaginationItem>
//         );
//       }
//       items.push(
//         <PaginationItem key={totalPages}>
//           <PaginationLink
//             onClick={() => setCurrentPage(totalPages)}
//             isActive={currentPage === totalPages}
//           >
//             {totalPages}
//           </PaginationLink>
//         </PaginationItem>
//       );
//     }

//     return items;
//   };

//   if (isLoading) {
//     return (
//       <Card className="w-full">
//         <CardContent className="flex items-center justify-center h-96">
//           <div className="flex flex-col items-center gap-4">
//             <Loader2 className="h-8 w-8 animate-spin text-primary" />
//             <p className="text-muted-foreground">Loading submissions...</p>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">Submissions Dashboard</CardTitle>
//           <CardDescription>
//             Manage and review all form submissions from your website
//           </CardDescription>
//         </CardHeader>
//       </Card>

//       {/* Filters and Actions */}
//       <SubmissionsFilters
//         filter={filter}
//         onFilterChange={setFilter}
//         searchTerm={searchTerm}
//         onSearchChange={setSearchTerm}
//       />

//       <SubmissionsActions
//         selectedCount={selectedSubmissions.length}
//         onBulkApprove={() => handleBulkStatusUpdate("approved")}
//         onBulkReject={() => handleBulkStatusUpdate("rejected")}
//         onBulkDelete={() => handleDelete(selectedSubmissions)}
//         onRefresh={handleRefresh}
//         onExport={handleExport}
//         isDeleting={isDeleting}
//         isRefreshing={isRefreshing}
//       />

//       {/* Submissions Table */}
//       {paginatedSubmissions.length > 0 ? (
//         <>
//           <SubmissionsTable
//             submissions={paginatedSubmissions}
//             selectedSubmissions={selectedSubmissions}
//             onToggleSelection={(id) => {
//               setSelectedSubmissions(prev =>
//                 prev.includes(id)
//                   ? prev.filter(selectedId => selectedId !== id)
//                   : [...prev, id]
//               );
//             }}
//             onToggleSelectAll={() => {
//               if (selectedSubmissions.length === paginatedSubmissions.length) {
//                 setSelectedSubmissions([]);
//               } else {
//                 setSelectedSubmissions(paginatedSubmissions.map(sub => sub.id));
//               }
//             }}
//             onStatusChange={handleStatusUpdate}
//           />

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <Card>
//               <CardContent className="pt-6">
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm text-muted-foreground">
//                     Showing {startIndex + 1} to{" "}
//                     {Math.min(startIndex + itemsPerPage, filteredSubmissions.length)} of{" "}
//                     {filteredSubmissions.length} submissions
//                   </p>
//                   <Pagination>
//                     <PaginationContent>
//                       <PaginationItem>
//                         <PaginationPrevious
//                           onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                           className={
//                             currentPage === 1 ? "pointer-events-none opacity-50" : ""
//                           }
//                         />
//                       </PaginationItem>
//                       {getPaginationItems()}
//                       <PaginationItem>
//                         <PaginationNext
//                           onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                           className={
//                             currentPage === totalPages ? "pointer-events-none opacity-50" : ""
//                           }
//                         />
//                       </PaginationItem>
//                     </PaginationContent>
//                   </Pagination>
//                 </div>
//               </CardContent>
//             </Card>
//           )}
//         </>
//       ) : (
//         <EmptyState
//           totalSubmissions={submissions.length}
//           searchTerm={searchTerm}
//           filter={filter}
//           onClearFilters={() => {
//             setSearchTerm("");
//             setFilter("all");
//           }}
//           onRefresh={handleRefresh}
//         />
//       )}

//       {/* Debug Info */}
//       <DebugInfoPanel debugInfo={debugInfo} />
//     </div>
//   );
// }
