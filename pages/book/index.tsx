import { Layout } from 'layouts/Layout';
import PDFViewer from 'components/PDFViewer';

export default function Index(props) {
  return (
    <Layout title={'كتاب 500 لعبه'} description={'summary'} ogUrl={`/book`}>
      <div class=" bg-gray-100">
        <div style={{ paddingTop: '20px' }}>
          <h2 class="text-lg pr-6">
            {' '}
            ده كتاب فى 500 لعبه مناسبه للحفلات والايام الروحيه الخاصه بمدارس الاحد الكتاب
            اعداد الاخت ساميه برتى ربنا يبارك تعبها ويثمر فى خدمه مدارس الاحد{' '}
            <a href="/sundaybook.pdf" class="underline  underline-offset-1	text-sky-500	" target="_blank" rel="noopener noreferrer" download>
              تقدر تحمله من هنا
            </a>
          </h2>
        </div>
        <div style={{ marginTop: '20px' }}>
          <PDFViewer />
        </div>
      </div>
    </Layout>
  );
}
