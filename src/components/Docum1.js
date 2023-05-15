
import React from 'react';
import { Document, Page, View } from 'react-pdf';

class MyDocument extends React.Component {
  render() {
    return (
      <Document>
        <Page>
          <View>
            <Text>My PDF Document</Text>
          </View>
        </Page>
      </Document>
    );
  }
}
export default MyDocument;