import { Injectable } from '@angular/core';
import { ResetPasswordModel } from '../../models/resetPassword';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) {
  }

  resetPassword(resetBody: ResetPasswordModel): any {
    let url = URL_SERVICIOS + '/resetPassword/';
    return this.http.put(url, resetBody).pipe(
      map(
        (resp: any) => {
          return resp;
        }
      )
    );
  }
}
