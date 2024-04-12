import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import React, { useEffect, useState } from 'react';
import { ScrollMode, SpecialZoomLevel, Viewer, Worker } from '@react-pdf-viewer/core';

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { scrollModePlugin } from '@react-pdf-viewer/scroll-mode';

const PDFViewer = () => {
  const [viewPdf, setViewPdf] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(viewPdf);

  useEffect(() => {
    // Fetch the PDF file as a Blob or a File
    fetch('/sundaybook.pdf')
      .then(response => response.blob())
      .then(blob => {
        console.log(blob);
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
  return (
    <div className="text-center">
      {/* this viewer only show in desktop mode */}
      <Worker workerUrl="../assets/pdf.worker.min.js">
        <div className={` w-full mx-auto h-screen hidden md:block`}>
          {viewPdf && (
            <>
              <Viewer
                renderLoader={per => {
                  if (per < 100) {
                    return <div className='text-white'>loading the file</div>
                  } 
                }}
                fileUrl={viewPdf}
                plugins={[newPlugin]}
                theme="dark"
                defaultScale={1}
              />
            </>
          )}
        </div>
        {/* this viewer only show in mobile mode */}
        <div className={`w-full mx-auto h-screen md:hidden`}>
          {viewPdf && (
            <>
              <Viewer
                fileUrl={viewPdf}
                plugins={[newPlugin]}
                theme="dark"
                defaultScale={0.4}
              />
            </>
          )}
        </div>
      </Worker>
    </div>
  );
};

export default PDFViewer;
