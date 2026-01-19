export interface Review {
  id: string;
  name: string;
  designation: string;
  company: string;
  testimonialTitle: string;
  imageUrl: string;
  videoUrl?: string;
  complement: string;
  timeSaved?: string;
  efficiencyGain?: string;
  rating: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
