/*
  Warnings:

  - You are about to drop the column `backgroudPic` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "backgroudPic",
ADD COLUMN     "backgroundPic" VARCHAR(255) DEFAULT '';
