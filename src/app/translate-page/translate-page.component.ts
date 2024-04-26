import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Word } from '../shared/model/word-properties'
import { WordDetailsComponent } from '../word-details/word-details.component';
import * as iso6391 from 'iso-639-1';
import { TranslationService } from '../shared/service/translation.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-translate-page',
  standalone: true,
  imports: [
    FormsModule
    , MatInputModule
    , MatSelectModule
    , MatButtonModule
    , MatFormFieldModule
    , CommonModule
    , WordDetailsComponent
  ],
  templateUrl: './translate-page.component.html',
  styleUrl: './translate-page.component.scss'
})
/**
 * Component to translate a word
 */
export class TranslatePageComponent {
  // Map with source language as key and list of destination languages as value
  fromToMap: Map<string, string[]> = new Map<string, string[]>();

  // List of keys of the map (frontend does not support iterating over maps every time)
  listOfKeys: string[] = [];

  selectedSourceLang: string | undefined;
  selectedDestinationLang: string | undefined;
  wordToTranslate: string | undefined;

  translationResult: Word | undefined = undefined;

  constructor(
    private translationService: TranslationService,
    private _snackBar: MatSnackBar) {
  }

  /**
   * Get the languages from the translation service and set the map to fill the dropdown menus.
   */
  ngOnInit() {
    this.translationService.getLangs().subscribe(
      (data) => {
        this.setLanguageMapping(data);
        this.listOfKeys = Array.from(this.fromToMap.keys());
      },
      (error) => {
        console.error('Error fetching synonyms:', error);
        this._snackBar.open('Error fetching synonyms', 'Close', {
          duration: 5000,
        });
      }
    );
  }

  /**
   * Translate the list of strings into a map with the source language as key and a list of destination languages as value.
   * @param data List of strings in the format 'sourceLang-destinationLang1'
   */
  setLanguageMapping(data: string[]) {
    var map = new Map<string, string[]>();
    for (var i = 0; i < data.length; i++) {
      var entry = data[i].split('-');
      var sourceLang = entry[0];
      var values = map.get(sourceLang) || [];
      for (var j = 1; j < entry.length; j++) {
        values?.push(entry[j]);
      }
      map.set(sourceLang, values);
    }
    this.fromToMap = map;
  }

  /**
   * Disable the destination language dropdown if no source language is selected. Also reset the word to be translated.
   */
  onSourceLanguageChange() {
    this.selectedDestinationLang = undefined; // Reset destination language
    this.wordToTranslate = undefined; // Reset text to translate
  }

  /**
   * Reset the word to be translated when the destination language is changed.
   */
  onDestinationLanguageChange() {
    this.wordToTranslate = undefined; // Reset text to translate
  }

  /**
   * Get the translation of the word to translate from the translation service and set the translation result.
   */
  onTranslate() {
    if (this.selectedSourceLang && this.selectedDestinationLang && this.wordToTranslate) {
      this.translationService.getTranslations(this.wordToTranslate, this.selectedSourceLang, this.selectedDestinationLang).subscribe(
        (data) => {
          this.translationResult = data;
        },
        (error) => {
          console.error('Error fetching translation:', error);
          this._snackBar.open('Error fetching translation', 'Close', {
            duration: 5000,
          });
        });
    }
  }

  /**
   * Translate the language code to the language name in English.
   * @param code Two letter language code
   * @returns Language name in English
   */
  shortNameToLanguage(code: string): string {
    var longName = iso6391.default.getName(code) || code;
    return longName;
  }
}
