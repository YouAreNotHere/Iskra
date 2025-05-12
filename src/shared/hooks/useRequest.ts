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
  product_id?:  string;
  quantity?: string;
  size?: string;
  cart_item_key?: string;
  slug? : string;
  page?: string;
  per_page?: string;
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

  const makeRequest = async () => {
    setIsLoading(true);
    try {
      let response;
      if (method === 'POST') {

        const body= new URLSearchParams({
          ...bodyData
        }).toString()

        response = await fetch(ajaxUrl, {
          method,
          body,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
      } else {

        if (!url) {
          throw new Error("URL is required for GET request");
        }

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
        console.log(data)
        await setData(data);
        setErrorMessage(null);
        if (onSuccess) {
          onSuccess(data);
        }
      } else {
        const error = await response.json();
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
