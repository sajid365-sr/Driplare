
import { CombinedSubmission } from "./form-utils";

export function exportToCSV(data: CombinedSubmission[], filename: string = 'submissions') {
  if (data.length === 0) {
    return;
  }

  // Define CSV headers
  const headers = [
    'ID',
    'Type',
    'Name',
    'Email',
    'Phone',
    'Company', 
    'Subject',
    'Message',
    'Service Type',
    'Budget',
    'Timeline',
    'Additional Info',
    'Status',
    'Created At'
  ];

  // Convert data to CSV rows
  const csvRows = [
    headers.join(','), // Header row
    ...data.map(submission => [
      `"${submission.id || ''}"`,
      `"${submission.form_type || ''}"`,
      `"${submission.name || ''}"`,
      `"${submission.email || ''}"`,
      `"${submission.phone || ''}"`,
      `"${submission.company || ''}"`,
      `"${submission.subject || ''}"`,
      `"${(submission.message || '').replace(/"/g, '""')}"`, // Escape quotes in message
      `"${submission.service_type || ''}"`,
      `"${submission.budget || ''}"`,
      `"${submission.timeline || ''}"`,
      `"${(submission.additional_info || '').replace(/"/g, '""')}"`, // Escape quotes
      `"${submission.status || ''}"`,
      `"${submission.created_at || ''}"`
    ].join(','))
  ];

  // Create CSV content
  const csvContent = csvRows.join('\n');

  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
