-- CreateTable
CREATE TABLE "stock_ticker" (
    "slug" TEXT NOT NULL,

    CONSTRAINT "stock_ticker_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "tracks" (
    "id" TEXT NOT NULL,
    "stockTikerSlug" TEXT NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "lastUpdate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tracks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stock_ticker_slug_key" ON "stock_ticker"("slug");

-- AddForeignKey
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_stockTikerSlug_fkey" FOREIGN KEY ("stockTikerSlug") REFERENCES "stock_ticker"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
