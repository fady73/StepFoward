import { Layout } from 'layouts/Layout';
import PDFViewer from 'components/PDFViewer';
import { useState } from 'react';

export default function Index(props) {
  const [loading, setLoading] = useState(true);
  const [loadnumber, setLoadnumber] = useState(0);

  return (
    <Layout title={'كتاب 500 لعبه'} description={'summary'} ogUrl={`/book`}>
      <div className=" bg-gray-100">
        <div style={{ paddingTop: '20px' }}>
          <h2 className="text-lg pr-6 px-2">
            {' '}
            ده كتاب فى 500 لعبه مناسبه للحفلات والايام الروحيه الخاصه بمدارس الاحد الكتاب
            اعداد الاخت ساميه برتى ربنا يبارك تعبها ويثمر فى خدمه مدارس الاحد{' '}
            <a href="/sundaybooks.pdf" className="underline  underline-offset-1	text-sky-500	" target="_blank" rel="noopener noreferrer" download>
              تقدر تحمله من هنا
            </a>
          </h2>
         {loading && <h2 className="text-lg pr-6 px-2">
            {' '}
           انتظر قليلا حتى يتم تحميل الكتاب 
          </h2>}
        
          {
             loading && <div className="bg-white rounded-xl shadow-sm overflow-hidden p-1">
              <div className="relative h-6 flex items-center justify-center">
                <div style={{width:`${loadnumber}%`}} className={`absolute top-0 bottom-0 left-0 rounded-lg  bg-blue-200`}></div>
                <div className="relative text-blue-900 font-medium text-sm">{loadnumber}%</div>
              </div>
            </div>
          }
        </div>
        <div style={{ marginTop: '20px' }}>
          <PDFViewer setLoading={setLoading} setLoadnumber={setLoadnumber} />
        </div>

      </div>
    </Layout>
  );
  
}
export const getServerSideProps = async ({ params: { slug } }) => {
  return {
    revalidate:3600 };

};
