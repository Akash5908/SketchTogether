/*
  Warnings:

  - The `radius` column on the `Element` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Element" DROP COLUMN "radius",
ADD COLUMN     "radius" DOUBLE PRECISION;
