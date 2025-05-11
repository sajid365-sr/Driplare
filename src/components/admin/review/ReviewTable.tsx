import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Archive } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteReview, Testimonial } from "@/utils/review.utils";
import { formatDate } from "@/lib/utils";

interface BlogTableProps {
  reviews: Testimonial[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: () => void;
}

export default function ReviewTable({
  reviews,
  isLoading,
  onEdit,
  onDelete,
}: BlogTableProps) {
  const handleDeleteReview = async (id: string) => {
    const success = await deleteReview(id);
    if (success) {
      onDelete();
    }
  };

  if (isLoading) {
    return <div className="py-10 text-center">Loading reviews...</div>;
  }

  if (reviews.length === 0) {
    return <div className="py-10 text-center">No reviews found</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Designation</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Review At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reviews.map((review) => (
          <TableRow key={review.id}>
            <TableCell className="font-medium">{review.name}</TableCell>
            <TableCell className="font-medium">{review.designation}</TableCell>
            <TableCell className="font-medium">{review.company}</TableCell>
            <TableCell className="font-medium">
              {review.testimonialTitle}
            </TableCell>
            <TableCell className="font-medium">
              {formatDate(review.created_at)}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(review.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the review "{review.testimonialTitle}" from the
                        database.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
