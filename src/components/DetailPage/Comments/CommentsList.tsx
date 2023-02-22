import { getComments, getProfile } from '@/common/api';
import { postTime } from '@/common/utils';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import AddComment from './AddComment';
import EditComment from './EditComment';
import * as S from './style';

const CommentsList = ({ postId }: DetailPagePropsP) => {
  const [comments, setComments] = useState<[]>();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>();
  // 유저의 세션 정보 받아오기
  const { data: session } = useSession();

  const { data: profile, refetch: refetchProfile } = useQuery(
    'profile',
    () => {
      if (typeof session?.user?.email === 'string') {
        return getProfile(session?.user?.email);
      }
    },
    {
      onSuccess(profile) {
        setUser(profile);
      },
    },
  );

  const { data, refetch } = useQuery('comments', () => {
    if (typeof postId === 'string') {
      return getComments(postId);
    }
  });

  useEffect(() => {
    setComments(data?.list.sort((a: any, b: any) => b.date - a.date));
    refetchProfile();
  }, [data, session]);

  return (
    <S.Container>
      <div style={{ display: 'flex' }}>
        <S.CommentHeader>댓글</S.CommentHeader>
        <S.CommentCount>{comments?.length}</S.CommentCount>
      </div>
      <AddComment
        user={user}
        postId={postId}
        queryClient={queryClient}
        refetch={refetch}
      />
      <div style={{ borderBottom: '2px solid #b9b9b9' }}>
        {comments?.map((comment: CommentP, index: number) => {
          return (
            <EditComment
              comment={comment}
              index={index}
              key={index}
              postId={postId}
              user={user}
              queryClient={queryClient}
              comments={comments}
              refetch={refetch}
            />
          );
        })}
      </div>
    </S.Container>
  );
};

export default CommentsList;
