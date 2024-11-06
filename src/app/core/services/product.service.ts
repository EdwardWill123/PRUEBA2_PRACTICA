// src/app/core/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductResponse } from '../interfaces/product.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly API_URL = 'https://dummyjson.com/auth/products';
  private readonly LIMIT = 30;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getProducts(skip: number = 0): Observable<ProductResponse> {
    const headers = new HttpHeaders()
      .set('Authorization', this.authService.getAuthorizationHeader());
    
    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', this.LIMIT.toString());

    return this.http.get<ProductResponse>(this.API_URL, { headers, params });
  }
}