/*
  Warnings:

  - A unique constraint covering the columns `[food_name]` on the table `Macros_Chart_Master` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Macros_Chart_Master_food_name_key" ON "Macros_Chart_Master"("food_name");
