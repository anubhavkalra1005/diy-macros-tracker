/*
  Warnings:

  - You are about to drop the column `macros_chart_id` on the `MacrosTracker` table. All the data in the column will be lost.
  - Added the required column `food_macros_id` to the `MacrosTracker` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MacrosTracker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "food_macros_id" INTEGER NOT NULL,
    "quantity" DECIMAL NOT NULL,
    "calories" DECIMAL NOT NULL,
    "protein" DECIMAL NOT NULL,
    "carbohydrates" DECIMAL NOT NULL,
    "fats" DECIMAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "MacrosTracker_food_macros_id_fkey" FOREIGN KEY ("food_macros_id") REFERENCES "MacrosChartMaster" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MacrosTracker" ("calories", "carbohydrates", "date", "fats", "id", "protein", "quantity", "user_id") SELECT "calories", "carbohydrates", "date", "fats", "id", "protein", "quantity", "user_id" FROM "MacrosTracker";
DROP TABLE "MacrosTracker";
ALTER TABLE "new_MacrosTracker" RENAME TO "MacrosTracker";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
