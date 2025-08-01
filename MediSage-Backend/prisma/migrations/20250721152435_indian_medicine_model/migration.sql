-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "ayushApproved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "brandNames" TEXT[],
ADD COLUMN     "genericName" TEXT,
ADD COLUMN     "manufacturer" TEXT,
ADD COLUMN     "prescriptionRequired" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "price" DOUBLE PRECISION,
ADD COLUMN     "scheduleType" TEXT;
