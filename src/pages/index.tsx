import HeadTitle from '@/components/GlobalComponents/HeadTitle/HeadTitle';
import CountTabs from '@/components/MainPage/CountTabs/CountTabs';
import axios from 'axios';
<<<<<<< HEAD
import MapSection from '@/components/GlobalComponents/MapSection/MapSection';

// 1. 전체리스트 및 상세리스트 불러오기
// 2. 전체리스트 + 상세리스트 합치기
// 3. Tab 분류 - 분양 리스트가 없을 때 보여줄 것 추가
// 4. Tab 별 수 count - Tabs랑 연결하기
// 5. 카테고리별 분류 - 지역 및 분양 형태
=======
import { GetStaticProps } from 'next';
import Head from 'next/head';
import * as S from '../styles/main.style';
>>>>>>> 641a536c85c2d2d8af3a9a998e565b5aa6db1d05

const MainPage = ({ homeList }: any) => {
  return (
    <>
      <Head>
        <HeadTitle title="" />
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <S.MainSection>
        {/* CountTabs(+HomeList 컴포넌트) */}
        <CountTabs homeList={homeList} />

<<<<<<< HEAD
            {tabList[currentTab].content.map((item: any) => {
              // 분양 리스트
              return <HomeList key={item.PBLANC_NO} home={item} />;
            })}
          </S.TabsSection>

          {/* TODO: 리모콘 기능 추가 */}
          <S.RemoteAside>
            <MapSection />
          </S.RemoteAside>
        </S.TabRemoteBox>
=======
        {/* TODO: 지도 추가 */}
>>>>>>> 641a536c85c2d2d8af3a9a998e565b5aa6db1d05
      </S.MainSection>
    </>
  );
};

export default MainPage;

// API 통합 데이터 사전 렌더링
export const getStaticProps: GetStaticProps = async () => {
  const BASE_URL = 'https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1';
  const METHOD_APT_ALL = 'getAPTLttotPblancDetail';
  const METHOD_APT_DETAIL = 'getAPTLttotPblancMdl';
  const SERVICE_KEY = process.env.NEXT_PUBLIC_HOME_API_KEY;

  // 공고문 리스트 가져오기
  const defaultList = await axios
    .get(
      `${BASE_URL}/${METHOD_APT_ALL}?page=1&perPage=1500&&cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=2023-01-01&serviceKey=${SERVICE_KEY}`,
    )
    .then((res) => res.data.data);

  // 공고문 상세정보 전체 리스트 가져오기
  const detailList = await axios
    .get(
      `${BASE_URL}/${METHOD_APT_DETAIL}?page=1&perPage=10000&serviceKey=${SERVICE_KEY}`,
    )
    .then((res) =>
      res.data.data.filter((item: any) => item.PBLANC_NO >= 2023000000),
    );

  // Default + Detail List 합치기
  const combineHomeList = await Promise.all(
    defaultList.map(async (item: any) => {
      return {
        ...item,
        detail: detailList.filter((i: any) => i.PBLANC_NO === item.PBLANC_NO),
      };
    }),
  );

  return {
    props: { homeList: combineHomeList },
    // ISR - 12시간 마다 데이터 업데이트
    revalidate: 43200,
  };
};
