
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map, of, retry } from "rxjs";
import { Word } from "../model/word-properties";

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
        const cachedLangs = localStorage.getItem('cachedLangs');

        if (cachedLangs) {
            console.log('Cached languages:', JSON.parse(cachedLangs));
            // If cached data exists, return it as an observable
            return of(JSON.parse(cachedLangs));
        } else {
            console.log('No cached languages found');
            // If no cached data, make HTTP request to fetch languages
            return this.http.get<string[]>(
                `${this.yandexApiUrl}${this.yandexApiVersion}/dicservice.json/getLangs?key=${this.yandexApiKey}`
            ).pipe(
                map((langs: string[]) => {
                    // Store fetched data in local storage for caching
                    localStorage.setItem('cachedLangs', JSON.stringify(langs));
                    return langs; // Return fetched data
                }),
                catchError(error => {
                    console.error('Error fetching languages:', error);
                    throw error; // Propagate error to subscriber
                })
            );
        }
    }

    get_translation(word: string, sourceLang: string, destinationLang: string): Observable<Word> {
        return this.http
            .get<Word>(this.yandexApiUrl + this.yandexApiVersion + '/dicservice.json/lookup?key=' + this.yandexApiKey + '&lang=' + sourceLang + '-' + destinationLang + '&text=' + word)
            .pipe(
                retry(this.retryNumber)
            );
    }



}