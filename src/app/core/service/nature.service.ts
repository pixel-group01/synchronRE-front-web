import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class NatureService {

  constructor(private restClient:RestClientService) { }

  getAll = () => {
    return this.restClient.get('natures/liste');
  }

}
