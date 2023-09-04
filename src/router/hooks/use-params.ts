import { useMemo } from 'react';
import { useParams as _useParams } from 'react-router-dom';

export function useParams() {
  const params = _useParams();

  return useMemo(() => params, [params]);
}
