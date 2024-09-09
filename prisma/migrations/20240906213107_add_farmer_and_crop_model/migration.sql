-- CreateEnum
CREATE TYPE "CropType" AS ENUM ('Soja', 'Milho', 'Algodao', 'Cafe', 'CanaDeAcucar');

-- CreateTable
CREATE TABLE "Farmer" (
    "id" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "farmName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "totalArea" DOUBLE PRECISION NOT NULL,
    "arableArea" DOUBLE PRECISION NOT NULL,
    "vegetationArea" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Farmer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crop" (
    "id" TEXT NOT NULL,
    "name" "CropType" NOT NULL,

    CONSTRAINT "Crop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FarmerCrops" (
    "farmerId" TEXT NOT NULL,
    "cropId" TEXT NOT NULL,

    CONSTRAINT "FarmerCrops_pkey" PRIMARY KEY ("farmerId","cropId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Farmer_cpfCnpj_key" ON "Farmer"("cpfCnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Crop_name_key" ON "Crop"("name");

-- AddForeignKey
ALTER TABLE "FarmerCrops" ADD CONSTRAINT "FarmerCrops_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmerCrops" ADD CONSTRAINT "FarmerCrops_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "Crop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
