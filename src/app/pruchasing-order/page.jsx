import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import OrderRecord from "@/components/PurchasingOrder/OrderRecord";
import React from "react";

const PurchasingOrder = async () => {
  return (
    <MaxWidthWrapper>
      <OrderRecord />
    </MaxWidthWrapper>
  );
};

export default PurchasingOrder;
