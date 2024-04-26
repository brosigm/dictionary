
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, retry } from "rxjs";
import { Word } from "../dtos/word-properties";

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    yandexApiUrl = 'https://dictionary.yandex.net/api/';
    yandexApiVersion = 'v1';
    yandexApiKey = "dict.1.1.20240411T204819Z.4aa2d9189b636b73.ee12b7885ac0450d1c29841003149bc680902c18"; //should be added to query string  
    retryNumber = 1;

    constructor(private http: HttpClient) { }

    get_langs(): Observable<string[]> {
        return this.http
            .get<string[]>(this.yandexApiUrl + this.yandexApiVersion + '/dicservice.json/getLangs?key=' + this.yandexApiKey)
            .pipe(
                retry(this.retryNumber),
            );
    }

    get_translation(word: string, sourceLang: string, destinationLang: string): Observable<Word> {
        return this.http
            .get<Word>(this.yandexApiUrl + this.yandexApiVersion + '/dicservice.json/lookup?key=' + this.yandexApiKey + '&lang=' + sourceLang + '-' + destinationLang + '&text=' + word)
            .pipe(
                retry(this.retryNumber)
            );
    }


    
}