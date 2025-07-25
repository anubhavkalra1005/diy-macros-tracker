-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodUOM" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "FoodUOM_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MacrosChartMaster" (
    "id" SERIAL NOT NULL,
    "food_name" TEXT NOT NULL,
    "uom_id" INTEGER NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "calories" DECIMAL(65,30) NOT NULL,
    "protein" DECIMAL(65,30) NOT NULL,
    "carbohydrates" DECIMAL(65,30) NOT NULL,
    "fats" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "MacrosChartMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MacrosTracker" (
    "id" SERIAL NOT NULL,
    "food_macros_id" INTEGER NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "calories" DECIMAL(65,30) NOT NULL,
    "protein" DECIMAL(65,30) NOT NULL,
    "carbohydrates" DECIMAL(65,30) NOT NULL,
    "fats" DECIMAL(65,30) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MacrosTracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Total_Macros" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "total_calories" DECIMAL(65,30) NOT NULL,
    "total_protein" DECIMAL(65,30) NOT NULL,
    "total_carbohydrates" DECIMAL(65,30) NOT NULL,
    "total_fats" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Total_Macros_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FoodUOM_unit_key" ON "FoodUOM"("unit");

-- CreateIndex
CREATE INDEX "MacrosChartMaster_user_id_idx" ON "MacrosChartMaster"("user_id");

-- AddForeignKey
ALTER TABLE "MacrosChartMaster" ADD CONSTRAINT "MacrosChartMaster_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MacrosChartMaster" ADD CONSTRAINT "MacrosChartMaster_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "FoodUOM"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MacrosTracker" ADD CONSTRAINT "MacrosTracker_food_macros_id_fkey" FOREIGN KEY ("food_macros_id") REFERENCES "MacrosChartMaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
