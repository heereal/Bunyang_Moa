import { getUsersList } from '@/common/api';
import { db } from '@/common/firebase';
import { customUIAlert } from '@/common/utils';
import SelectMyRegion from '@/components/GlobalComponents/SelectMyRegion/SelectMyRegion';
import SelectMyTypes from '@/components/GlobalComponents/SelectMyTypes/SelectMyTypes';
import {
  myRegionArrayState,
  myTypeArrayState,
  usersListState,
} from '@/store/selectors';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import * as S from '../../styles/signup.style';
import { regionArray, typesArray } from '@/common/categoryList';

const SignUp = () => {
  const router = useRouter();

  // 유저의 세션 정보 받아오기
  const { data: session }: any = useSession();
  // 로그인 시 쿼리 파라미터로 전달 받은 유저 ID
  const userId = Array.isArray(router?.query.id)
    ? router.query.id[0]
    : router?.query.id ?? '';

  const [users, setUsers] = useRecoilState(usersListState);

  // 유저가 선택한 카테고리 필터링 리스트
  const myTypeArray = useRecoilValue<any>(myTypeArrayState);
  const myRegionArray = useRecoilValue<any>(myRegionArrayState);

  // 닉네임 중복 검사 시 사용
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [nickname, setNickname] = useState<string>('');

  // [닉네임 중복 확인] 버튼 클릭 시 작동
  const checkNicknameHandler = () => {
    const checkNickname = users.find(
      (user: userProps) => user.userName === nickname,
    );

    //닉네임을 입력하지 않았을 때
    if (!nickname) {
      customUIAlert('닉네임을 입력해주세요.');
      setIsValidNickname(false);
      return;
    }

    if (!checkNickname) {
      customUIAlert('사용 가능한 닉네임입니다.');
      setIsValidNickname(true);
      return;
    }

    if (checkNickname) {
      customUIAlert('이미 존재하는 닉네임입니다. 다시 입력해주세요.');
      setIsValidNickname(false);
      return;
    }
  };

  // [회원가입 완료] 버튼 클릭 시 작동
  const signupHandler = async () => {
    if (!nickname) {
      customUIAlert('닉네임을 입력해주세요.');
      return;
    }

    if (!isValidNickname) {
      customUIAlert('닉네임 중복 검사를 완료해주세요.');
      return;
    }

    try {
      if (userId) {
        // 임시로 저장된 유저 데이터
        const docSnap = await getDoc(doc(db, 'TemporaryUsers', userId));
        const usetData = docSnap.data();

        // 관심 카테고리 선택하지 않으면 전체 리스트를 선택한 것으로 간주함
        const newUser = {
          userEmail: usetData?.email,
          userName: nickname,
          userImage: usetData?.image,
          provider: usetData?.provider,
          bookmarkList: [],
          regions: myRegionArray.length === 0 ? regionArray : myRegionArray,
          types: myTypeArray.length === 0 ? typesArray : myTypeArray,
        };

        // 회원 정보 저장
        await setDoc(doc(db, 'Users', userId), newUser);

        // 임시 회원 정보 삭제
        await deleteDoc(doc(db, 'TemporaryUsers', userId));

        customUIAlert('회원가입이 완료되었습니다.');
        router.push('/');
      } else {
        customUIAlert('회원가입에 실패했습니다.');
      }
    } catch (e) {
      customUIAlert('회원가입에 실패했습니다.');
    }
  };

  // Users 데이터 불러오기
  useQuery('users', getUsersList, {
    enabled: userId !== '', // userId가 있는 경우에만 useQuery를 실행함
    onSuccess: (usersData) => {
      setUsers(usersData);
    },
  });

  useEffect(() => {
    // 비로그인 유저일 경우 접근 제한
    if (session) router.push('/', undefined, { shallow: true });

    // eslint-disable-next-line
  }, [session]);

  return (
    <S.Wrapper>
      <NextSeo
        title="회원가입 -"
        description="전국 분양정보를 한눈에 확인할 수 있는 플랫폼입니다."
        canonical="https://www.by-zip.com/signup"
        openGraph={{
          url: 'https://www.by-zip.com/signup',
        }}
      />

      <S.SignUpContainer>
        <S.SignUpDesc>
          <h1>회원가입</h1>
          <div>분양정보 추천을 위한 추가정보를 입력해주세요.</div>
        </S.SignUpDesc>

        {/* 닉네임 제출 */}
        <S.SubmitNicknameContainer>
          <S.NicknameTitle>
            닉네임<span>*</span>
          </S.NicknameTitle>
          <S.InputBtnContainer>
            <S.NicknameInput
              value={nickname || ''}
              onChange={(e) => setNickname(e.target.value)}
            />
            <S.CheckNicknameBtn onClick={checkNicknameHandler}>
              중복확인
            </S.CheckNicknameBtn>
          </S.InputBtnContainer>
        </S.SubmitNicknameContainer>

        {/* 관심 지역 카테고리 선택 */}
        <S.CategoryTitle>관심 지역</S.CategoryTitle>
        <SelectMyRegion path={'/signup'} />

        {/* 관심 분양 형태 카테고리 선택 */}
        <S.CategoryTitle>관심 분양형태</S.CategoryTitle>
        <SelectMyTypes path={'/signup'} />

        <S.SignUpBtnContainer>
          <S.SignUpBtn onClick={signupHandler}>가입완료</S.SignUpBtn>
        </S.SignUpBtnContainer>
      </S.SignUpContainer>
    </S.Wrapper>
  );
};

export default SignUp;
