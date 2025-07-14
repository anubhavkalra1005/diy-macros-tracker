-- CreateTable
CREATE TABLE "Food_UOM" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Food_UOM_unit_key" ON "Food_UOM"("unit");
