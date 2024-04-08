"use client";
import { Invoice } from "@/app/types";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import AlterModal from "../AlterModal";

type Props = {
  invoices: Invoice[];
};

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}}`,
  };
}

export default function InvoiceList({ invoices }: Props) {
  const [open, setOpen] = React.useState(false);
  const [selectedInvoice, setSelectedInvoice] = React.useState<Invoice>();
  const handleClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <List sx={{ width: "80%" }}>
        {invoices.map((invoice) => {
          return (
            <ListItem
              key={invoice.Id}
              onClick={() => handleClick(invoice)}
              sx={{ cursor: "pointer" }}
            >
              <ListItemAvatar>
                <Avatar {...stringAvatar(invoice.CustomerName)} />
              </ListItemAvatar>
              <ListItemText
                primary={invoice.Id}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline", mr: 1 }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {invoice.CustomerName} -
                    </Typography>

                    {invoice.Items.map((item, ind) => {
                      return (
                        <span key={item.itemName}>
                          {item.itemName}
                          {ind == invoice.Items.length - 1 ? null : ", "}
                        </span>
                      );
                    })}
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        })}
      </List>
      <AlterModal
        open={open}
        setOpen={setOpen}
        type={"EDIT"}
        selectedInvoice={selectedInvoice}
      />
    </React.Fragment>
  );
}
