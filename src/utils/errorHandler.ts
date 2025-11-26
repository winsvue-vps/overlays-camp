/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';

export function errorHandler(error: unknown | any) {
  if (error instanceof AxiosError) {
    throw new Error(error.response?.data);
  } else {
    throw new Error(error);
  }
}
