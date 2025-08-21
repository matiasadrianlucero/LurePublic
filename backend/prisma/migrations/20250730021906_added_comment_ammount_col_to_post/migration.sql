/*
  Warnings:

  - Made the column `likes` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "commentAmmount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "likes" SET NOT NULL;
