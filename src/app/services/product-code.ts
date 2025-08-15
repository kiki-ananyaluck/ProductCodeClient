import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ProductCode {
  id: string;
  codeDisplay: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class ProductCodeService {
  private baseUrl = 'https://productcodeapi.onrender.com';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProductCode[]> {
    return this.http.get<ProductCode[]>(this.baseUrl);
  }

  create(code: string): Observable<any> {
    return this.http.post(this.baseUrl, { code });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getQr(id: number, options?: any) {
    return this.http.get(`${this.baseUrl}/${id}/qrcode`, options);
  }

}
