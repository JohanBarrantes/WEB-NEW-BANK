export interface LoginResponse {
  data: {
    user: string;
    token: string;
  };
}

export interface LoginPayload {
  username: string;
  password: string;
}

/**
 * Llama al servicio de login y devuelve el usuario y token
 */
export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const res = await fetch('https://new-bank.com/v1/customer/uathDispacher', {
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
