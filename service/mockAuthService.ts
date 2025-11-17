import { Product } from "@/types/Product";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  phone: string;
  email: string;
  password: string;
}
export interface LoginResponse {
  data: {
    user: string;
    token: string;
  };
}


const mockUsers: any[] = [
  { username: "admin", password: "admin", userId: "1234" }
];

export const loginUserMock = async (payload: LoginPayload): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const u = mockUsers.find(
        user =>
          user.username === payload.email &&
          user.password === payload.password
      );
console.log(u)
      if (!u) {
        return reject({
          message: "USER_NOT_FOUND"
        });
      }

      resolve({
        data: {
          user: u.userId,
          token: "mock-token-xyz"
        }
      });
    }, 800);
  });
};

export const registerUserMock = async (payload: RegisterPayload) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exists = mockUsers.find((u) => u.username === payload.email);
      if (exists) return reject({ message: "USER_ALREADY_EXISTS" });

      const newUser = {
        username: payload.email,
        password: payload.password,
        userId: String(mockUsers.length + 1)
      };

      mockUsers.push(newUser);

      resolve({
        success: true
      });
    }, 800);
  });
};

// service/mockProductsService.ts
export async function createProductMock(product: Product) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, product }), 800);
  });
}

// service/mockMovementsService.ts
export async function registerMovementMock(movement:string) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, movement }), 500);
  });
}
