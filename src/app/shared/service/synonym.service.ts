
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Synonym } from "../model/synonyms";
import { Observable, catchError, retry } from "rxjs";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
    providedIn: 'root'
})
/**
*  Service to get synonyms of a word
*/
export class SynonymService {
    thesaurusApiUrl = 'http://thesaurus.altervista.org/thesaurus/';
    thesaurusApiVersion = 'v1';
    thesaurusApiKey = "sDNVshR7Rkt3AQopJbdI";
    retryNumber = 1;

    constructor(
        private http: HttpClient,
        private errorHandlerService: ErrorHandlerService
    ) { }

    /**
     * Get synonyms of a word
     * @param word word to get synonyms of
     * @param lang language of the word
     * 
     * @returns synonyms of the word
     * 
     * @throws error if an error occurs
     */
    getSynonyms(word: string, lang: string): Observable<Synonym> {
        const url = `${this.thesaurusApiUrl}${this.thesaurusApiVersion}?word=${word}&language=${lang}&key=${this.thesaurusApiKey}&output=json`;
        return this.http.get<Synonym>(url).pipe(
            retry(this.retryNumber), // Retry the request if it fails
            catchError(this.errorHandlerService.handleError)
        );
    }
}