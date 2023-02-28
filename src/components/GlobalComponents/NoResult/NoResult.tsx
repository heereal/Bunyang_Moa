import Image from 'next/image';
import NoResultImage from '../../../../public/assets/NoResult.png';
import * as S from './style';

const NoResult = ({ keyword, text }: keywordPropsJ) => {
  return (
    <>
      <Image
        src={NoResultImage}
        alt="NoResultImage"
        width={100}
        height={100}
        quality={100}
        priority={true}
      />
      <S.NoResultTitle>
        {keyword ? (
          <>
            <span style={{ color: '#3d7eee' }}>{keyword}</span> 검색 결과를 찾을
            수 없습니다.
          </>
        ) : (
          '현재 설정하신 필터에 해당되는 분양정보가 없습니다.'
        )}
      </S.NoResultTitle>
      <S.NoResultText>{text}</S.NoResultText>
    </>
  );
};

export default NoResult;
