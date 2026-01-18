// hooks/useApi.ts
import {
  useState, useEffect, useCallback,
  useRef,
} from 'react'
import api from '../api/api'

type ApiState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
}

type UseApiResult<T> = ApiState<T> & {
  refetch: () => Promise<void>;
}

export function useApi<T>(
  url: string,
  options: {
    method?: 'get' | 'post' | 'put' | 'delete';
    data?: any;
    params?: any;
    enabled?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
  } = {},
): UseApiResult<T> {
  const {
    method = 'get',
    data: requestData,
    params,
    enabled = true,
    onSuccess,
    onError,
  } = options

  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const isFetching = useRef(false)

  const fetchData = useCallback(
    async () => {
      if (isFetching.current) return
      isFetching.current = true

      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }))

      try {
        const response = await api({
          method,
          url,
          data: requestData,
          params,
        })

        const {
          data,
        } = response
        setState({
          data,
          loading: false,
          error: null,
        })
        onSuccess?.(data)
      } catch (err: any) {
        const errorMsg = err.response?.data?.message || err.message || 'Unknown error'
        setState({
          data: null,
          loading: false,
          error: errorMsg,
        })
        onError?.(errorMsg)
      } finally {
        isFetching.current = false
      }
    },

    [url, method, requestData, params, onSuccess, onError],
  )

  const refetch = useCallback(async () => {
    await fetchData()
  }, [fetchData])

  useEffect(() => {
    if (enabled) {
      fetchData()
    } else {
      setState({
        data: null,
        loading: false,
        error: null,
      })
    }
  }, [enabled, fetchData])

  return {
    ...state,
    refetch,
  }
}
