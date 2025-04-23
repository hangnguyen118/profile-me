export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  startDate: Date;
  endDate?: Date;
  isCompleted: boolean;
  teamSize: number;
  images: string[];
  repoUrl?: string;
}
