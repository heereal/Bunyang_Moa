import { db } from '@/common/firebase';
import { pathState } from '@/store/selectors';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { doc, getDoc } from 'firebase/firestore';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import * as S from '../../styles/claendar.style';

const Calender = ({ homeList }: any) => {
  const router = useRouter();
  const [path, setPath] = useRecoilState(pathState);

  const pathHandler = (e: any) => {
    setTimeout(() => {
      router.push(`/detail/${e.event.id}`);
      setPath(e.event.id);
    }, 500);
  };

  // 캘린더에 이벤트를 보여주기 위해 기존 분양 데이터를 재가공함
  const array: any = [];
  homeList.allHomeData.map((item: any) =>
    array.push({
      title: item.HOUSE_NM,
      date: item.RCEPT_ENDDE,
      id: item.PBLANC_NO,
    }),
  );

  return (
    <S.CalendarContainer>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next',
        }}
        initialView="dayGridMonth"
        nowIndicator={true}
        selectable={true}
        locale={'ko'} // 한글 표기
        // aspectRatio={1} // 종횡비-너비가 높이의 두 배
        // height={"800"}
        events={array}
        // eventDisplay={'list-item'}
        eventColor="#6096B4"
        // eventMouseEnter={(e)=>e.target.style={}}
        eventClick={(e) => pathHandler(e)}
      />
    </S.CalendarContainer>
  );
};

export default Calender;

export const getStaticProps: GetStaticProps = async () => {
  const docRef = doc(db, 'HomeList', 'homeData');
  const docSnap = await getDoc(docRef);
  const homeList = docSnap.data();

  return {
    props: { homeList },
    // ISR - 12시간 마다 데이터 업데이트
    revalidate: 43200,
  };
};
