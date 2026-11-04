/*
  Warnings:

  - You are about to drop the column `role` on the `Resource` table. All the data in the column will be lost.
  - Added the required column `domain` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "role",
ADD COLUMN     "domain" TEXT NOT NULL;
