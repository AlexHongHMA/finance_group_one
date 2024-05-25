import LedgerTable from "@/components/GeneralLedger/LedgerTable";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

async function getData() {
  const res = await fetch(`${process.env.APP_URL}/api/test/`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  return res.json();
}

const GeneralLeger = async () => {
  const stockData = await getData();
  return (
    <MaxWidthWrapper>
      <LedgerTable oriData={stockData?.data?.recordset || []} />
    </MaxWidthWrapper>
  );
};

export default GeneralLeger;
