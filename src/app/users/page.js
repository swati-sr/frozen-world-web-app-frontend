import AdminTabs from "@/components/AdminTabs";
import Header from "@/components/Header";
import React from "react";

const page = () => {
  return (
    <>
      <Header />
      <AdminTabs isAdmin={true} />
    </>
  );
};

export default page;
