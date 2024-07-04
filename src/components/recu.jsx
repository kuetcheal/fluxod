import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Créer les styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  }
});

// Créer le document PDF
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Rapport PDF</Text>
      </View>
      <View style={styles.section}>
        <Text>Ceci est un exemple de document PDF généré avec react-pdf.</Text>
      </View>
    </Page>
  </Document>
);

// Composant pour télécharger le PDF
const Recu = () => (
  <div>
    <PDFDownloadLink document={<MyDocument />} fileName="exemple.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Chargement du document...' : 'Télécharger le PDF'
      }
    </PDFDownloadLink>
  </div>
);

export default Recu;
