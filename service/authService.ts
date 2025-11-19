import { Product } from '@/types/Product';

export interface LoginResponse {
  data: {
    user: string;
    token: string;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name:string;
  phone:string
  email: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const res = await fetch('https://csrgjeyljf.execute-api.us-east-1.amazonaws.com/sessionUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Invalid credentials');
  }

  const result: LoginResponse = await res.json();
  return result;
};

export const registerUser = async (payload: RegisterPayload) => {
  const res = await fetch('https://csrgjeyljf.execute-api.us-east-1.amazonaws.com/registrationUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Invalid credentials');
  }

  const result: LoginResponse = await res.json();
  return result;
};


export const getListProduct = async () => {
  const res = await fetch(
    'https://csrgjeyljf.execute-api.us-east-1.amazonaws.com/product',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Error retrieving products');
  }

 return await res.json();

};

export const createProduct = async (product: Product) => {
  const res = await fetch('https://csrgjeyljf.execute-api.us-east-1.amazonaws.com/createProduct', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Invalid credentials');
  }

  const result: LoginResponse = await res.json();
  return result;
};
export const getListProductByClient = async (customer:string) => {

  const res = await fetch(
    'https://csrgjeyljf.execute-api.us-east-1.amazonaws.com/getProductbyClient',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId: customer }),    }
  );

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Error retrieving products');
  }

 return await res.json();

};