/*
  Warnings:

  - You are about to drop the `Food_UOM` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Macros_Chart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Macros_Chart_Master` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Macros_Tracker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Food_UOM";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Macros_Chart";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Macros_Chart_Master";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Macros_Tracker";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "FoodUOM" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MacrosChartMaster" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "food_name" TEXT NOT NULL,
    "uom_id" INTEGER NOT NULL,
    "quantity" DECIMAL NOT NULL,
    "calories" DECIMAL NOT NULL,
    "protein" DECIMAL NOT NULL,
    "carbohydrates" DECIMAL NOT NULL,
    "fats" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "user_id" INTEGER,
    CONSTRAINT "MacrosChartMaster_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "MacrosChartMaster_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "FoodUOM" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MacrosTracker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "macros_chart_id" BIGINT NOT NULL,
    "quantity" DECIMAL NOT NULL,
    "calories" DECIMAL NOT NULL,
    "protein" DECIMAL NOT NULL,
    "carbohydrates" DECIMAL NOT NULL,
    "fats" DECIMAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "date" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FoodUOM_unit_key" ON "FoodUOM"("unit");

-- CreateIndex
CREATE INDEX "MacrosChartMaster_user_id_idx" ON "MacrosChartMaster"("user_id");
