import React, { Fragment } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

import { Transition, Dialog } from "@headlessui/react";
import { TbFileInvoice, TbDownload } from "react-icons/tb";
import { Link } from "react-router-dom";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: "1cm",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "table",
    width: "auto",
    margin: "auto",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCellHeader: {
    backgroundColor: "#eeeeee",
    fontWeight: "bold",
    padding: 5,
    width: "25%",
    fontSize: 12,
    textAlign: "center",
    border: "1px solid #000",
  },
  tableCell: {
    padding: 5,
    width: "25%",
    fontSize: 12,
    textAlign: "center",
    border: "1px solid #000",
  },
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>
          <h1>SUMMARY</h1>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Mythic</Text>
              <Text style={styles.tableCellHeader}>Price</Text>
              <Text style={styles.tableCellHeader}>Quantity</Text>
              <Text style={styles.tableCellHeader}>Subtotal</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Mythic Item</Text>
              <Text style={styles.tableCell}>Rp 150.000</Text>
              <Text style={styles.tableCell}>1 pc</Text>
              <Text style={styles.tableCell}>Rp 150.000</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Legend Item</Text>
              <Text style={styles.tableCell}>Rp 100.000</Text>
              <Text style={styles.tableCell}>2 pcs</Text>
              <Text style={styles.tableCell}>Rp 200.000</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}>Total</Text>
              <Text style={styles.tableCell}>Rp 350.000</Text>
            </View>
          </View>
        </Text>
      </View>
    </Page>
  </Document>
);

const MyPdf = () => {
  return (
    <>
      <PDFViewer className="w-full h-screen">
        <MyDocument />
      </PDFViewer>
      <PDFDownloadLink document={<MyDocument />} fileName="example.pdf">
        {({ loading }) => (loading ? "Loading document..." : "Download now!")}
      </PDFDownloadLink>
    </>
  );
};

export default MyPdf;
