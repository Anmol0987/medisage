export type Medicine = {
  id: number;
  name: string;
  genericName: string;
  brandNames: string[];
  manufacturer: string;
  price: string;
  description: string;
  usage: string;
  sideEffects: string;
  idealTiming: string;
  warnings: string;
  scheduleType: string | null;
  prescriptionRequired: boolean;
  ayushApproved: boolean;
  language: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};
