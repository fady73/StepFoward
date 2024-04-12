import { Layout } from 'layouts/Layout';
import PDFViewer from 'components/PDFViewer';
import { useState } from 'react';

export default function Index(props) {
  const [loading, setLoading] = useState(true);

  return (
    <Layout title={'كتاب 500 لعبه'} description={'summary'} ogUrl={`/book`}>
      <div className=" bg-gray-100">
        <div style={{ paddingTop: '20px' }}>
          <h2 className="text-lg pr-6">
            {' '}
            ده كتاب فى 500 لعبه مناسبه للحفلات والايام الروحيه الخاصه بمدارس الاحد الكتاب
            اعداد الاخت ساميه برتى ربنا يبارك تعبها ويثمر فى خدمه مدارس الاحد{' '}
            <a href="/sundaybook.pdf" className="underline  underline-offset-1	text-sky-500	" target="_blank" rel="noopener noreferrer" download>
              تقدر تحمله من هنا
            </a>
          </h2>
         {loading && <h2 className="text-lg pr-6">
            {' '}
           انتظر قليلا حتى يتم تحميل الكتاب 
          </h2>}
        </div>
        <div style={{ marginTop: '20px' }}>
          <PDFViewer setLoading={setLoading} />
        </div>
      </div>
    </Layout>
  );
}
