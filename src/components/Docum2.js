

import React from 'react';
import { Document, Page, View } from 'react-pdf';
import { pdfjs } from 'pdfjs-dist';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class MyDocument extends React.Component {
  render() {
    return (
      <Document>
        {/* Код страницы */}
      </Document>
    );
  }
}
export default MyDocument;