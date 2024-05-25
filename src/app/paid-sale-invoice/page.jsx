import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SaleInvoiceTable from "@/components/SaleInvoice/SaleInvoiceTable";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

async function getData() {
  const res = await fetch(`${process.env.APP_URL}/api/sale-invoice/`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  return res.json();
}

const SaleInvoice = async () => {
  const stockData = await getData();
  return (
    <MaxWidthWrapper>
      <SaleInvoiceTable oriData={stockData?.data?.recordset || []} />
    </MaxWidthWrapper>
  );
};

export default SaleInvoice;
