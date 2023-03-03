import Image from 'next/image';
import fillStar from 'public/assets/fillStar.png';
import outlineStar from 'public/assets/outlineStar.png';
import * as S from './style';
interface DetailHeaderProps {
  bookmarksList: any;
  editBookmark: any;
  home: HomeP | undefined;
  email: string | null | undefined;
}

const DetailHeader = ({
  bookmarksList,
  editBookmark,
  home,
  email,
}: DetailHeaderProps) => {
  return (
    <S.PageHeader>
      <S.BmrkBox>
        <S.BmrBtn
          onClick={() => editBookmark.mutate()}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            backgroundColor:
              typeof email === 'string' &&
              bookmarksList?.usersList.includes(email)
                ? 'rgba(255, 255, 255, 0.2)'
                : '',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
            }}
          >
            {typeof email === 'string' &&
            bookmarksList?.usersList.includes(email) ? (
              <>
                <div>
                  <Image
                    src={fillStar}
                    alt="fillStar"
                    height={13}
                    loading="lazy"
                    quality={100}
                  />
                </div>
                <p
                  style={{
                    color: '#ffffff',
                    fontSize: 11,
                  }}
                >
                  북마크 추가 완료
                </p>
              </>
            ) : (
              <>
                <div>
                  <Image
                    src={outlineStar}
                    alt="outlineStar"
                    height={13}
                    loading="lazy"
                    quality={100}
                  />
                </div>

                <p
                  style={{
                    color: '#ffffff',
                    fontSize: 11,
                  }}
                >
                  북마크 추가하기
                </p>
              </>
            )}
          </div>
        </S.BmrBtn>
      </S.BmrkBox>
      <S.HeaderBox>
        <S.HeaderTagBox>
          {home?.HOUSE_DTL_SECD_NM ? (
            <S.HeaderTag>{home?.HOUSE_DTL_SECD_NM} |</S.HeaderTag>
          ) : (
            ''
          )}
          {home?.HOUSE_SECD_NM ? (
            <S.HeaderTag>{home?.HOUSE_SECD_NM} |</S.HeaderTag>
          ) : (
            ''
          )}
          {home?.SUBSCRPT_AREA_CODE_NM ? (
            <S.HeaderTag>{home?.SUBSCRPT_AREA_CODE_NM}</S.HeaderTag>
          ) : (
            ''
          )}
        </S.HeaderTagBox>
        <S.HeaderTitle>{home?.HOUSE_NM}</S.HeaderTitle>
        <S.HeaderAdres>{home?.FOR_COORDINATES_ADRES}</S.HeaderAdres>
        {typeof email === 'string' &&
        bookmarksList?.usersList.includes(email) ? (
          <S.HeaderBmrk>
            <Image
              src={fillStar}
              alt="fillStar"
              height={15}
              loading="lazy"
              quality={100}
            />
            {bookmarksList?.usersList ? bookmarksList?.usersList?.length : '0'}
            명이 관심을 갖고 있어요
          </S.HeaderBmrk>
        ) : (
          <S.HeaderBmrk>
            <Image
              src={fillStar}
              alt="fillStar"
              height={15}
              loading="lazy"
              quality={100}
            />
            {bookmarksList?.usersList ? bookmarksList?.usersList?.length : '0'}
            명이 관심을 갖고 있어요
          </S.HeaderBmrk>
        )}
      </S.HeaderBox>
    </S.PageHeader>
  );
};

export default DetailHeader;
