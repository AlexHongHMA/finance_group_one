import JournalTable from "@/components/GeneralJournal/JournalTable";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";

async function getData() {
  const res = await fetch(`${process.env.APP_URL}/api/general-journal/`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  return res.json();
}

const GeneralJournal = async () => {
  const stockData = await getData();
  return (
    <MaxWidthWrapper>
      <JournalTable oriData={stockData?.data?.recordset || []} />
    </MaxWidthWrapper>
  );
};

export default GeneralJournal;