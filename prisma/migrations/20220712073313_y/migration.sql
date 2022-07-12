/*
  Warnings:

  - You are about to alter the column `expenses` on the `expenses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `incomes` on the `incomes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `expenses` MODIFY `expenses` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `incomes` MODIFY `incomes` INTEGER NOT NULL;
