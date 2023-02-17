import { useState } from 'react';
import HomeList from '../HomeList/HomeList';
import * as S from './style';

const CountTabs = ({ homeList }: any) => {
  const [currentTab, SetCurrentTab] = useState(0);

  // 오늘 날짜 구하기
  const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const today = year + '-' + month + '-' + day;

    return today;
  };
  const today = getToday();

  // 청약 예정일 산정 기간 - 현재 날짜 + 4주
  const getAddMonth = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);

    return date
      .toLocaleString()
      .slice(0, 11)
      .split('.')
      .join('')
      .replace(/( )/g, '-');
  };
  const todayAddMonth = getAddMonth();

  // 청약 가능 리스트
  const todayList = homeList?.filter(
    (item: any) => item.RCEPT_BGNDE <= today && item.RCEPT_ENDDE >= today,
  );
  // 청약 예정 리스트
  const comingList = homeList?.filter(
    (item: any) =>
      item.RCEPT_BGNDE > today && item.RCEPT_BGNDE <= todayAddMonth,
  );
  // TODO: 무순위 리스트 - 이름 변경? -선착순..?
  const randomList = homeList.filter((item: any) => item.HOUSE_SECD === '04');

  // Count Tabs
  const tabList = [
    { name: '청약 가능', content: todayList, count: todayList?.length },
    { name: '청약 예정', content: comingList, count: comingList?.length },
    { name: '무순위', content: randomList, count: randomList?.length },
  ];

  // 함수가 실행되면 선택된 tab 내용으로 변경
  const clickTabHandler = (index: number) => {
    SetCurrentTab(index);
  };
  return (
    <>
      <S.CountSection>
        <S.CountTabList>
          {tabList.map((el, index) => (
            <S.CountTab
              key={el.name}
              className={index === currentTab ? 'baseTab focused' : 'baseTab'}
              onClick={() => clickTabHandler(index)}
            >
              <h4>{el.name}</h4>
              <S.CountTabNum>{el.count}</S.CountTabNum>
            </S.CountTab>
          ))}
        </S.CountTabList>
      </S.CountSection>

      {/* 분양 리스트 */}
      <S.ListSection>
        {/* 현재 선택된 tab의 list를 map돌려서 HomeList 컴포넌트에 전달 */}
        {tabList[currentTab].content?.map((item: any) => {
          return <HomeList key={item.PBLANC_NO} home={item} />;
        })}
      </S.ListSection>
    </>
  );
};

export default CountTabs;
