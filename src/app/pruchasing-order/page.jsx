import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import OrderRecord from "@/components/PurchasingOrder/OrderRecord";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

async function getData() {
  const res = await fetch(`${process.env.APP_URL}/api/purchasing-order/`);

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  return res.json();
}

const PurchasingOrder = async () => {
  const stockData = await getData();
  return (
    <MaxWidthWrapper>
      <OrderRecord oriData={stockData?.data?.recordset || []} />
    </MaxWidthWrapper>
  );
};

export default PurchasingOrder;
