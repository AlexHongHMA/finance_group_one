import IncomeTable from "@/components/IncomeStatement/IncomeTable";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

async function getData() {
  const res = await fetch(`${process.env.APP_URL}/api/income-statement/`);

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  return res.json();
}

const IncomeStatement = async () => {
  const stockData = await getData();

  return (
    <MaxWidthWrapper>
      <IncomeTable oriData={stockData?.data?.recordset || []} />
    </MaxWidthWrapper>
  );
};

export default IncomeStatement;
