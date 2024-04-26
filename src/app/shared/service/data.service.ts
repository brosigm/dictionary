import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  yandexApiUrl = 'https://dictionary.yandex.net/api/';
  yandexApiVersion = 'v1';
  yandexApiKey = "dict.1.1.20240411T204819Z.4aa2d9189b636b73.ee12b7885ac0450d1c29841003149bc680902c18"; //should be added to query string
  
  thesaurusApiUrl = 'http://thesaurus.altervista.org/thesaurus/';
  thesaurusApiVersion = 'v1';
  thesaurusApiKey = "sDNVshR7Rkt3AQopJbdI";
  
  async get_langs(): Promise<any>{
    return fetch(this.yandexApiUrl + this.yandexApiVersion + '/dicservice.json/getLangs?key=' + this.yandexApiKey)
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
    return fetch(this.yandexApiUrl + this.yandexApiVersion + '/dicservice.json/lookup?key=' + this.yandexApiKey + '&lang=' + sourceLang + '-' + destinationLang + '&text=' + word)
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

  async get_synonyms(word: string, lang: string): Promise<any>{
    return fetch(this.thesaurusApiUrl + this.thesaurusApiVersion +'?word=' + word + '&language=' + lang + '&key=' + this.thesaurusApiKey + '&output=json')
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