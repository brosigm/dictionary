
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map, of, retry } from "rxjs";
import { Word } from "../model/word-properties";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
    providedIn: 'root'
})
/**
 * Service to get translations of a word
 */
export class TranslationService {
    yandexApiUrl = 'https://dictionary.yandex.net/api/';
    yandexApiVersion = 'v1';
    yandexApiKey = "dict.1.1.20240411T204819Z.4aa2d9189b636b73.ee12b7885ac0450d1c29841003149bc680902c18"; //should be added to query string  
    retryNumber = 1;

    constructor(
        private http: HttpClient,
        private errorHandlerService: ErrorHandlerService
    ) { }

    /**
     * Get languages supported by Yandex API / cached languages
     * @returns languages supported by Yandex API
     * 
     * @throws error if an error occurs
     */
    getLangs(): Observable<string[]> {
        const cachedLangs = localStorage.getItem('cachedLangs');

        if (cachedLangs) {
            console.log('Cached languages:', JSON.parse(cachedLangs));
            // If cached data exists, return it as an observable
            return of(JSON.parse(cachedLangs));
        } else {
            console.log('No cached languages found');
            // If no cached data, make HTTP request to fetch languages
            var url = `${this.yandexApiUrl}${this.yandexApiVersion}/dicservice.json/getLangs?key=${this.yandexApiKey}`;
            return this.http.get<string[]>(url).pipe(
                map((langs: string[]) => {
                    // Store fetched data in local storage for caching
                    localStorage.setItem('cachedLangs', JSON.stringify(langs));
                    return langs; // Return fetched data
                }),
                catchError(this.errorHandlerService.handleError)
            );
        }
    }

    /**
     * Get translation of a word
     * @param word word to get translation of
     * @param sourceLang source language of the word
     * @param destinationLang destination language of the word
     * 
     * @returns translation of the word
     * 
     * @throws error if an error occurs
     */
    getTranslations(word: string, sourceLang: string, destinationLang: string): Observable<Word> {
        var url = `${this.yandexApiUrl}${this.yandexApiVersion}/dicservice.json/lookup?key=${this.yandexApiKey}&lang=${sourceLang}-${destinationLang}&text=${word}`;
        return this.http.get<Word>(url).pipe(
            retry(this.retryNumber),
            catchError(this.errorHandlerService.handleError)
        );
    }
}