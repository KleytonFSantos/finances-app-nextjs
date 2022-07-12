/*
  Warnings:

  - Made the column `expenses` on table `expenses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `incomes` on table `incomes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `expenses` MODIFY `expenses` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `incomes` MODIFY `incomes` VARCHAR(191) NOT NULL;
