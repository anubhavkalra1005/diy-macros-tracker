-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Macros_Chart_Master" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "food_name" TEXT NOT NULL,
    "uom_id" INTEGER NOT NULL,
    "quantity" DECIMAL NOT NULL,
    "calories" DECIMAL NOT NULL,
    "protein" DECIMAL NOT NULL,
    "carbohydrates" DECIMAL NOT NULL,
    "fats" DECIMAL NOT NULL,
    CONSTRAINT "Macros_Chart_Master_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "Food_UOM" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Macros_Chart_Master" ("calories", "carbohydrates", "fats", "food_name", "id", "protein", "quantity", "uom_id") SELECT "calories", "carbohydrates", "fats", "food_name", "id", "protein", "quantity", "uom_id" FROM "Macros_Chart_Master";
DROP TABLE "Macros_Chart_Master";
ALTER TABLE "new_Macros_Chart_Master" RENAME TO "Macros_Chart_Master";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
