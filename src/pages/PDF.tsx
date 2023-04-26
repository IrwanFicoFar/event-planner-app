import React, { Fragment } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
// import { css } from "@react-pdf/renderer";

import { Transition, Dialog } from "@headlessui/react";
import { TbFileInvoice, TbDownload } from "react-icons/tb";
import { Link } from "react-router-dom";

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    borderBottom: 1,
  },
  noInvoice: {
    fontSize: 20,
    fontWeight: "normal",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  paragraph: { fontSize: 12, lineHeight: 1.5 },
});

const MyDocument = () => (
  <Document>
    <Page>
      <View style={styles.page}>
        <Text style={styles.title}>INVOICE</Text>
        <Text style={styles.noInvoice}>INVOICE</Text>
        <Text style={styles.subtitle}>Subtitle</Text>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec dolor
          id nisi volutpat semper. Praesent nec risus velit. Aliquam vitae mi
          nulla. Morbi non elit ut lorem bibendum faucibus. Sed ut ullamcorper
          elit. Nullam quis tellus id tellus faucibus commodo non vel dolor.
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
