import StockTable from "@/components/InventoryStock/StockTable";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

async function getData() {
  const res = await fetch(`${process.env.APP_URL}/api/inventory-stock/`);

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  return res.json();
}

const InventoryStock = async () => {
  const stockData = await getData();

  return (
    <MaxWidthWrapper>
      <StockTable oriData={stockData?.data?.recordset || []} />
    </MaxWidthWrapper>
  );
};

export default InventoryStock;
