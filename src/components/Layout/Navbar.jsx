"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

async function Navbar() {
  const path = usePathname();

  const navbars = [
    {
      id: 0,
      name: "General Journal",
      link: "/general-journal",
    },
    {
      id: 1,
      name: "General Ledger",
      link: "/general-ledger",
    },
    {
      id: 2,
      name: "Monthly Income Statement",
      link: "/income-statement",
    },
    {
      id: 3,
      name: "Inventory Stock Card",
      link: "/inventory-stock",
    },
    {
      id: 4,
      name: "Purchasing Order",
      link: "/pruchasing-order",
    },
    {
      id: 5,
      name: "Paid Sale Invoice",
      link: "/paid-sale-invoice",
    },
  ];
  return (
    <div className="relative w-full z-10">
      <div className="w-full bg-primary h-2.5" />
      <div className="antialiased bg-gray-100 border-b border-gray-200 navbar">
        <div className="w-full text-gray-700 bg-white">
          <div className="flex items-center justify-between h-[70px] max-w-full pl-5 pr-6 mx-auto md:px-6">
            <div className="flex flex-row items-center justify-between py-4">
              <Link
                href="/"
                className="text-lg smmx:text-sm font-semibold tracking-widest text-gray-900 uppercase rounded-lg focus:outline-none focus:shadow-outline"
              >
                Logo
              </Link>
            </div>
            <nav className="flex justify-end items-end">
              {navbars.map((item) => (
                <Link
                  key={item.id}
                  className={cn(
                    path === item.link ? "bg-gray-200" : "bg-transparent",
                    "px-3 py-2 text-sm font-semibold rounded-lg md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  )}
                  href={item.link}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
