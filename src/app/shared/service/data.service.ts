import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Word, DefEntity, TrEntity, SynEntity, MeanEntity } from '../dtos/word-properties';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  apiUrl = 'https://dictionary.yandex.net/api/';
  apiVersion = 'v1';
  apiKey = "dict.1.1.20240411T204819Z.4aa2d9189b636b73.ee12b7885ac0450d1c29841003149bc680902c18"; //should be added to query string
  httpOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  }


  async get_langs(): Promise<any>{
    return fetch(this.apiUrl + this.apiVersion + '/dicservice.json/getLangs?key=' + this.apiKey)
    .then(
      (response) => {
        if(response.ok){
          return response.json();
        }
        return this.handleError(response);
      }).catch((error) => {
        return this.handleError(error);
      });
  }

  async get_translation(word: string, sourceLang: string, destinationLang: string): Promise<any>{
    console.log(this.apiUrl + this.apiVersion + '/dicservice.json/lookup?key=' + this.apiKey + '&lang=' + sourceLang + '-' + destinationLang + '&text=' + word);
    return fetch(this.apiUrl + this.apiVersion + '/dicservice.json/lookup?key=' + this.apiKey + '&lang=' + sourceLang + '-' + destinationLang + '&text=' + word)
    .then(
      (response) => {
        if(response.ok){
          return response.json();
        }
        return this.handleError(response);
      }).catch((error) => {
        return this.handleError(error);
      });
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }


  
}