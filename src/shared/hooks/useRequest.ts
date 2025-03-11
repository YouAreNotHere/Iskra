import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {ajaxUrl} from "../url/url.tsx";

interface PostOrderData {
  action: string;
  name?: string;
  surname?: string;
  phone?: string;
  email?: string;
  address?: string;
  comment?: string;
  paymentMethod?: string;
  deliveryMethod?: string;
}

interface IUseRequestProps {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: PostOrderData;
  params?: any;
  onSuccess?: (data: any) => void;
  url?: string;
}

const useRequest = (props: IUseRequestProps) => {
  const { method, body: bodyData, url, params, onSuccess } = props;
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);


  const body= new URLSearchParams({
    ...bodyData
  }).toString()



  const makeRequest = async () => {
    setIsLoading(true);
    try {
      let response;
      if (method === 'POST') {
        response = await fetch(ajaxUrl, {
          method,
          body,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
      } else {
        response = await fetch(url, {
          method,
          ...params,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
      }

      if (response.ok) {
        const data = await response.json();
        await setData(data);
        console.dir(data)
        setErrorMessage(null);
        if (onSuccess) {
          onSuccess(data);
        }
      } else {
        const error = await response.json();
        console.dir(data)
        if (response.status === 401) {
          navigate('/auth');
        }
        setErrorMessage(error.message ?? 'Ошибка');
        setData(null);
      }
    } catch (e) {
      setErrorMessage(JSON.stringify(e));
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    data,
    isLoading,
    errorMessage,
    makeRequest,
  };
};

export { useRequest };
