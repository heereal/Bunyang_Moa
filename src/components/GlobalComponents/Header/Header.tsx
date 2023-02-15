import { signOut } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import candy from '../../../assets/candy.jpg';
import { auth } from '../../../common/firebase';
import LoginModal from '../LoginModal/LoginModal';
import Search from '../Search/Search';
import * as S from './style';

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 로그인 여부 확인 - TODO: 로그인 기능 완성 후 수정
  const isLoggedIn = false;

  // 로그아웃하기
  const logOutHandler = async () => {
    await signOut(auth)
      .then(() => {
        router.push('/');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <S.Wrapper>
        <LoginModal isOpen={isOpen} setIsOpen={setIsOpen}/>
        <Image
          onClick={() => router.push('/')}
          src={candy}
          alt="logoImg"
          width={50}
          height={50}
          quality={100}
          //quelity 의 기본값은 75 입니다.
          style={{ cursor: 'pointer' }}
          priority={true}
        />
        <S.HeaderNav onClick={() => router.push('/')}>청약정보</S.HeaderNav>
        <S.HeaderNav onClick={() => router.push('/')}>청약캘린더</S.HeaderNav>
        {/* 검색창 */}
        <Search />
        {isLoggedIn ? (
          <>
            <S.Mynav
              onClick={() => {
                router.push('/my');
              }}
            >
              마이페이지
            </S.Mynav>
            <S.LogintNav onClick={logOutHandler}>로그아웃</S.LogintNav>
          </>
        ) : (
          <S.LogintNav onClick={() => setIsOpen(true)}>로그인</S.LogintNav>
        )}
        {/* TODO: 로그인 모달 추가 */}
      </S.Wrapper>
    </>
  );
};

export default Header;
