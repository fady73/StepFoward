import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { ProgressBar, ScrollMode, SpecialZoomLevel, Viewer, Worker } from '@react-pdf-viewer/core';
import React, { useEffect, useState } from 'react';

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { scrollModePlugin } from '@react-pdf-viewer/scroll-mode';

const PDFViewer = ({setLoading,setLoadnumber}) => {
  const [viewPdf, setViewPdf] = useState(null);

  useEffect(() => {
    // Fetch the PDF file as a Blob or a File
    fetch('/sundaybooks.pdf')
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = e => {
          console.log(e.target.result);
          setViewPdf(e.target.result);
        };
      })
      .catch(error => {
        console.error('Error fetching PDF:', error);
      });
  }, []);

  const scrollModePluginInstance = scrollModePlugin();

  scrollModePluginInstance.switchScrollMode(ScrollMode.Wrapped);
  const newPlugin = defaultLayoutPlugin({
    toolbarPlugin: {
      fullScreenPlugin: {
        onEnterFullScreen: zoom => {
          zoom(SpecialZoomLevel.PageFit);
          newPlugin.toolbarPluginInstance.scrollModePluginInstance.switchScrollMode(
            ScrollMode.Wrapped
          );
        },
        onExitFullScreen: zoom => {
          zoom(SpecialZoomLevel.PageWidth);
          newPlugin.toolbarPluginInstance.scrollModePluginInstance.switchScrollMode(
            ScrollMode.Vertical
          );
        }
      }
    }
  });
//  if(loading)  return "loading"
const renderLoading=(percentages: number) => {
  if(percentages<100){
    setLoadnumber
    setLoading(true)
  }else{setLoading(false)}
  setLoadnumber(Math.round(percentages))
return  (
  <div style={{ width: '240px' }}>
      <ProgressBar progress={Math.round(percentages)} />
  </div>
)};
  return (
    <div className="text-center">
      {/* this viewer only show in desktop mode */}
      <Worker workerUrl="../assets/pdf.worker.min.js">
        <div className={` w-full mx-auto h-screen `}>
          {viewPdf && (
            <>
              <Viewer
                   renderLoader={renderLoading}
            
                fileUrl={viewPdf}
                plugins={[newPlugin]}
                theme="dark"
                defaultScale={0.5}
              />
            </>
          )}
        </div>
       
      </Worker>
    </div>
  );
};

export default PDFViewer;