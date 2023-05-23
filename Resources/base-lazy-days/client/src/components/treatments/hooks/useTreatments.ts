import { useQuery, useQueryClient } from 'react-query';

import type { Treatment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get('/treatments');
  // throw 'error';
  return data;
}

export function useTreatments(): Treatment[] {
  const fallback = [];
  const { data = fallback } = useQuery(queryKeys.treatments, getTreatments, {
    staleTime: 600000, // 10 minutes
    cacheTime: 900000, // 15 minutes (기본값은 5분. 근데 캐시된 데이터 없으면 데이터 만료되었을때 임시로 보여줄 데이터가 없음. 그래서 늘려줌)
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  return data;
}

export function usePrefetchTreatments(): void {
  // 프리페칭하여 캐시에 넣을거임.
  // -> treatments 불러와야 하기 전에. home 화면에서 미리 불러와서 캐싱하기
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.treatments, getTreatments, {
    staleTime: 600000,
    cacheTime: 900000,
  });
}
