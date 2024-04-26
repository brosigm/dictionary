
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Synonym } from "../model/synonyms";
import { Observable, catchError, retry } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SynonymService {
    thesaurusApiUrl = 'http://thesaurus.altervista.org/thesaurus/';
    thesaurusApiVersion = 'v1';
    thesaurusApiKey = "sDNVshR7Rkt3AQopJbdI";
    retryNumber = 1;

    constructor(private http: HttpClient) { }

    get_synonyms(word: string, lang: string): Observable<Synonym> {
        return this.http
            .get<Synonym>(this.thesaurusApiUrl + 
                this.thesaurusApiVersion +
                '?word=' + word + 
                '&language=' + lang + 
                '&key=' + this.thesaurusApiKey + 
                '&output=json')
            .pipe(
                retry(this.retryNumber)
            );
    }
}