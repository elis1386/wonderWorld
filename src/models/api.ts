export interface ApiResponseWrapper<T> {
    status: string;
    data: T
}

export interface JWTTokenPair {
    accessToken: string;
}


  
  