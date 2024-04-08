import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Invoice } from "@/app/types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Accordion, AccordionSummary, Button, TextField } from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const initialValues: Invoice = {
  Id: "",
  Date: "",
  InvoiceNumber: 0,
  CustomerName: "",
  BillingAddress: "",
  ShippingAddress: "",
  GSTIN: "",
  Items: [],
  BillSundrys: [],
  TotalAmount: 0,
};

export default function AlterModal({
  open,
  setOpen,
  selectedInvoice,
  type = "CREATE",
  addInvoice,
  deleteInvoice,
}: any) {
  const handleClose = () => setOpen(false);
  const [invoice, setInvoice] = React.useState<Invoice>();
  const [invoiceItemComponentCount, setInvoiceItemComponentCount] = useState(0);

  const validationSchema = Yup.object({
    Id: Yup.string().required("Required"),
    Date: Yup.string().required("Required"),
    InvoiceNumber: Yup.string().required("Required"),
    CustomerName: Yup.string().required("Required"),
    BillingAddress: Yup.string().required("Required"),
    ShippingAddress: Yup.string().required("Required"),
    GSTIN: Yup.string().required("Required"),
    Items: Yup.array().required("Required"),
    BillSundrys: Yup.array().required("Required"),
    TotalAmount: Yup.number().required("Required"),
  });

  const onSubmit = (values: any) => {
    console.log(values);
  };

  const handleChange = (e: any) => {
    console.log(e);
    setInvoice({
      ...invoice,
      [e.target.name]: e.target.value,
    });
  };

  React.useEffect(() => {
    if (selectedInvoice) {
      setInvoice(selectedInvoice);
    } else {
      setInvoice(initialValues);
    }
  }, [selectedInvoice]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          fontWeight="bold"
        >
          {type == "EDIT"
            ? "Edit the invoice details -"
            : "Create a new invoice"}
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div>
              <TextField
                fullWidth
                sx={{ mt: 1 }}
                label="Invoice Number"
                variant="standard"
                name="InvoiceNumber"
                value={invoice?.InvoiceNumber}
                onChange={handleChange}
              />
              <ErrorMessage name="InvoiceNumber" component="div" />
            </div>
            <div>
              <TextField
                fullWidth
                sx={{ mt: 1 }}
                label="Customer Name"
                variant="standard"
                name="CustomerName"
                value={invoice?.CustomerName}
                onChange={handleChange}
              />
              <ErrorMessage name="CustomerName" component="div" />
            </div>
            <div>
              <TextField
                fullWidth
                sx={{ mt: 1 }}
                label="BillingAddress"
                variant="standard"
                name="Billing Address"
                value={invoice?.BillingAddress}
                onChange={handleChange}
              />
              <ErrorMessage name="BillingAddress" component="div" />
            </div>
            <div>
              <TextField
                fullWidth
                sx={{ mt: 1 }}
                label="Shipping Address"
                variant="standard"
                name="ShippingAddress"
                value={invoice?.ShippingAddress}
                onChange={handleChange}
              />
              <ErrorMessage name="ShippingAddress" component="div" />
            </div>
            <div>
              <TextField
                fullWidth
                sx={{ mt: 1 }}
                label="GSTIN"
                variant="standard"
                name="GSTIN"
                value={invoice?.GSTIN}
                onChange={handleChange}
              />
              <ErrorMessage name="GSTIN" component="div" />
            </div>
            {/* Add item accordion */}
            <Box sx={{ py: 3 }}>
              <Typography>Invoice Item</Typography>

              <AddCircleOutlineIcon
                sx={{ color: "red" }}
                onClick={() => {
                  setInvoiceItemComponentCount(invoiceItemComponentCount + 1);
                }}
              />

              {invoiceItemComponentCount > 0 ? (
                <Box>
                  {[...Array(invoiceItemComponentCount)].map((_, index) => (
                    <div key={index}>Order Item Component</div>
                  ))}
                </Box>
              ) : null}
            </Box>
            {/* Add item accordion */}
            <Box sx={{ py: 3 }}>
              <Typography>Invoice Bill Sundry</Typography>

              <AddCircleOutlineIcon
                sx={{ color: "red" }}
                onClick={() => {
                  setInvoiceItemComponentCount(invoiceItemComponentCount + 1);
                }}
              />

              {invoiceItemComponentCount > 0 ? (
                <Box>
                  {[...Array(invoiceItemComponentCount)].map((_, index) => (
                    <div key={index}>Invoice Bill Sundry</div>
                  ))}
                </Box>
              ) : null}
            </Box>
            <div>
              <TextField
                fullWidth
                sx={{ mt: 1 }}
                label="Total Amount"
                variant="standard"
                name="TotalAmount"
                value={invoice?.TotalAmount}
                onChange={handleChange}
              />
              <ErrorMessage name="TotalAmount" component="div" />
            </div>
            <Box
              sx={{
                mt: 3,
                display: "flex",
                columnGap: "8px",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
              {type == "EDIT" ? (
                <Button variant="contained" color="error">
                  Delete
                </Button>
              ) : null}
              <Button type="submit" variant="contained" color="success">
                Save
              </Button>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
}
