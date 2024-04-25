import React from 'react';

const PDFViewer = () => {


  return (
    <div className="text-center">
     <object data="sundaybooks.pdf" onLoadStartCapture={(percentages)=>console.log("percentages",percentages)} type="application/pdf" width="100%" height="950px">
    <p>Unable to display PDF file. <a href="sundaybooks.pdf">Download</a> instead.</p>
</object>
    </div>
  );
};

export default PDFViewer;
