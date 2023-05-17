import { Icon, Stack, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { GiFlowerPot } from 'react-icons/gi';

import { BackgroundImage } from '../common/BackgroundImage';
import { usePrefetchTreatments } from '../treatments/hooks/useTreatments';

export function Home(): ReactElement {
  /**
   * Home 에서 usePrefetchTreatments 를 실행해도 괜찮은가?
   *  -> 일단, Home은 정적 페이지라 괜찮을텐데. 그래도 불안하면
   *  -> useEffect안에 넣어서 쓸까? => 훅 안에서 훅 사용 불가
   *  -> usePrefetchTreatments를 훅이 아니게 만들까? => 훅이 아니면 훅 내에서 useQueryClient 실행 할 수 없음
   *  -> staleTime, cacheTime을 옵션에 넣어서 관리하기
   */
  usePrefetchTreatments();

  return (
    <Stack align="center" justify="center" height="84vh">
      <BackgroundImage />
      <Text textAlign="center" fontFamily="Forum, sans-serif" fontSize="6em">
        <Icon m={4} verticalAlign="top" as={GiFlowerPot} />
        Lazy Days Spa
      </Text>
      <Text>Hours: limited</Text>
      <Text>Address: nearby</Text>
    </Stack>
  );
}
