import JournalTable from "@/components/GeneralJournal/JournalTable";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";

const GeneralJournal = async () => {
  return (
    <MaxWidthWrapper>
      <JournalTable />
    </MaxWidthWrapper>
  );
};

export default GeneralJournal;
