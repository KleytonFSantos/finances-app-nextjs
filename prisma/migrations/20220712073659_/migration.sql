/*
  Warnings:

  - You are about to alter the column `expenses` on the `expenses` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `incomes` on the `incomes` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `expenses` MODIFY `expenses` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `incomes` MODIFY `incomes` DOUBLE NOT NULL;
