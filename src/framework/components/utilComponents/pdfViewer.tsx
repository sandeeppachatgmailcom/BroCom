import   { useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import * as pdfjs from 'pdfjs-dist/build/pdf';

const PdfPreview = ({ fileUrl }:any) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    console.log(fileUrl, 'fileUrlfileUrlfileUrlfileUrl');
  }, [fileUrl]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`}>
        <Viewer fileUrl={`/api${fileUrl}`} plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </div>
  );
};

export default PdfPreview;