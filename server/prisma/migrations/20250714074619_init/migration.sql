-- CreateTable
CREATE TABLE "Macros_Chart_Master" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "food_name" TEXT NOT NULL,
    "uom_id" INTEGER NOT NULL,
    "quantity" DECIMAL NOT NULL,
    "calories" DECIMAL NOT NULL,
    "protein" DECIMAL NOT NULL,
    "carbohydrates" DECIMAL NOT NULL,
    "fats" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "Macros_Chart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "macros_chart_master_id" BIGINT NOT NULL,
    "calories" DECIMAL NOT NULL,
    "protein" DECIMAL NOT NULL,
    "carbohydrates" DECIMAL NOT NULL,
    "fats" DECIMAL NOT NULL,
    "user_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Macros_Tracker" (
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

-- CreateTable
CREATE TABLE "Total_Macros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "total_calories" DECIMAL NOT NULL,
    "total_protein" DECIMAL NOT NULL,
    "total_carbohydrates" DECIMAL NOT NULL,
    "total_fats" DECIMAL NOT NULL
);
