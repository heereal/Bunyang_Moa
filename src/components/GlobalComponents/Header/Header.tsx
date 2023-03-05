import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import logo from '../../../../public/assets/logo.png';
import LoginModal from '../LoginModal/LoginModal';
import SearchInput from '../SearchInput/SearchInput';
import * as S from './style';
import { AiOutlineSearch } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // user 로그인 여부에 따라 header Nav 변경
  const { data: session } = useSession();

  return (
    <>
      {isOpen && <LoginModal setIsOpen={setIsOpen} />}
      <S.Header>
        <S.LogoBox onClick={() => router.push('/')}>
          <Image
            onClick={() => router.push('/')}
            src={logo}
            alt="logoImg"
            height={28}
            quality={100}
            //quelity 의 기본값은 75 입니다.
            priority={true}
          />

          <S.LogoText onClick={() => router.push('/')}>분양모음집</S.LogoText>
        </S.LogoBox>
        {/* 검색창 */}
        <S.SearchContainer>
          <SearchInput />
        </S.SearchContainer>
        <S.NavBar>
          <S.NavContent
            onClick={() => router.push('/calendar')}
            color={router.asPath === '/calendar' ? '#356EFF' : 'black'}
          >
            청약캘린더
          </S.NavContent>

          {session ? (
            <>
              <S.NavContent
                onClick={() => {
                  router.push('/my');
                }}
                color={router.asPath === '/my' ? '#356EFF' : 'black'}
              >
                마이페이지
              </S.NavContent>
            </>
          ) : (
            <S.NavContent onClick={() => setIsOpen(true)} color={'black'}>
              로그인
            </S.NavContent>
          )}
        </S.NavBar>
        <S.NavBarMobile>
          <S.NavContent color={'black'}>
            <AiOutlineSearch style={{ fontSize: 20 }} />
          </S.NavContent>
          <S.NavContent color={'black'}>
            <GiHamburgerMenu style={{ fontSize: 20 }} />
          </S.NavContent>
        </S.NavBarMobile>
      </S.Header>
    </>
  );
};

export default Header;
