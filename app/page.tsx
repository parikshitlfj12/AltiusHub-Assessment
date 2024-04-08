"use client";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import styles from "./page.module.css";
import { Invoice } from "./types";
import InvoiceList from "./components/InvoiceList";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AlterModal from "./components/AlterModal";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      Id: "#811-2341-1231",
      Date: "2021-01-01",
      InvoiceNumber: 1,
      CustomerName: "Parikshit SIngh",
      BillingAddress: "123 Main St",
      ShippingAddress: "123 Main St",
      GSTIN: "quygwhjbsnd",
      Items: [
        {
          Id: "#811-2341-2",
          itemName: "Uncle Chips",
          quantity: 1,
          price: 20,
          amount: 20,
        },
        {
          Id: "#811-2341-214",
          itemName: "Creamy Lays",
          quantity: 1,
          price: 20,
          amount: 20,
        },
      ],
      BillSundrys: [],
      TotalAmount: 765,
    },
    {
      Id: "#561-241-5531",
      Date: "2022-12-03",
      InvoiceNumber: 2,
      CustomerName: "Sourav Singh",
      BillingAddress: "123 Main St",
      ShippingAddress: "123 Main St",
      GSTIN: "quygwhjbsnd",
      Items: [],
      BillSundrys: [],
      TotalAmount: 3459,
    },
  ]);

  const addInvoice = (newInv: Invoice) => {
    setInvoices([...invoices, newInv]);
    setOpen(false);
  };

  const deleteInvoice = (invoice: Invoice) => {
    setInvoices(invoices.filter((i) => i.Id !== invoice.Id));
  };

  const handleAddInvoice = () => {
    setOpen(!open);
  };

  return (
    <main className={styles.main}>
      <Sidebar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "8%",
          px: 5,
        }}
      >
        <Button
          variant="contained"
          color={"success"}
          startIcon={<AddIcon />}
          onClick={handleAddInvoice}
        >
          Add
        </Button>
      </Box>

      <Box sx={{ mt: 1 }}>
        <InvoiceList invoices={invoices} />
      </Box>
      <AlterModal
        open={open}
        setOpen={setOpen}
        type={"CREATE"}
        addInvoice={addInvoice}
        deleteInvoice={deleteInvoice}
      />
    </main>
  );
}
