/*
  Warnings:

  - You are about to alter the column `login` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- DropIndex
DROP INDEX "User_login_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "login" SET DATA TYPE VARCHAR(255);
