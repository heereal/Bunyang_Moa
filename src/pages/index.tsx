import Head from 'next/head';
import { useSubscription } from '@/hooks';
import { useEffect, useState } from 'react';
import HomeList from '@/components/MainPage/HomeList';
import HeadTitle from '@/components/GlobalComponents/HeadTitle/HeadTitle';

// 1. 전체리스트 및 상세리스트 불러오기
// 2. 전체리스트 + 상세리스트 합치기
// 3. 카테고리별 분류 - 지역
// 4. 카테고리별 분류 -

const MainPage = () => {
  const { homeListHandler, homeList } = useSubscription();
  const [todayHome, setTodayHome] = useState<any>([]);
  const [comingHome, setComingHome] = useState<any>([]);

  console.log(homeList);

  useEffect(() => {
    homeListHandler();
  }, []);

  // 오늘 날짜 구하기
  const postTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  };
  const today = postTime();

  const todayList = homeList.filter((item: any) => item.RCEPT_BGNDE <= today);

  // 오늘 청약 Tab - 청약일이 오늘 날짜보다 작은 분양 리스트 가져오기
  const todayListHandler = () => {
    // TODO: item.RCEPT_BGNDE <= today && item.RCEPT_ENDDE >= today 로 해야 하는데
    // 현재 결과가 없음
    setTodayHome(todayList);
  };

  console.log(todayHome);

  // 청약 임박 Tab(곧 청약이 시작돼요!)
  const comingListHandler = () => {
    const comingList = homeList.filter((item: any) => item.RCEPT_BGNDE > today);
    setComingHome(comingList);
  };

  console.log(comingHome);

  return (
    <>
      <Head>
        <HeadTitle title="" />
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {/* TODO: 청약 가능? */}
        <div>오늘 청약</div>
        <div>청약 임박</div>
        <div>무순위</div>
      </div>

      <div>
        <button onClick={todayListHandler}>오늘 청약</button>
        <button onClick={comingListHandler}>청약 임박</button>
        <button>무순위</button>
      </div>
      {/* TODO: props로 넘겨주지 않고 각 컴포넌트에서 실행하기? */}

      {comingHome.length !== 0 ? (
        <div>
          {comingHome?.map((item: any) => (
            <HomeList key={item.PBLANC_NO} home={item} />
          ))}
        </div>
      ) : todayHome.length !== 0 ? (
        <div>
          {todayHome?.map((item: any) => (
            <HomeList key={item.PBLANC_NO} home={item} />
          ))}
        </div>
      ) : (
        <div>
          {todayList?.map((item: any) => (
            <HomeList key={item.PBLANC_NO} home={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default MainPage;
