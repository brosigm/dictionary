import { Component } from '@angular/core';
import { DataService } from '../shared/service/data.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Word, DefEntity, TrEntity, SynEntity, MeanEntity } from '../shared/dtos/word-properties'
import { WordDetailsComponent } from '../word-details/word-details.component';


@Component({
  selector: 'app-main-page',
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
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent{
  fromToMap: Map<string, string[]> = new Map<string, string[]>();
  listOfKeys: string[] = [];

  selectedSourceLang: string | undefined;
  selectedDestinationLang: string | undefined;
  wordToTranslate: string | undefined;

  translationResult: Word | null = null;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.get_langs().then((data) => {
      this.setLanguageMapping(data);
      this.listOfKeys = Array.from(this.fromToMap.keys());
    });
  }

  //fill up the map with source langueages as keys and the second languages as values, there can be multiple values for one key
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

  onSourceLanguageChange() {
    this.selectedDestinationLang = undefined; // Reset destination language
    this.wordToTranslate = undefined; // Reset text to translate
  }

  onDestinationLanguageChange() {
    this.wordToTranslate = undefined; // Reset text to translate
  }

  onTranslate() {
    if (this.selectedSourceLang && this.selectedDestinationLang && this.wordToTranslate) {
      this.dataService.get_translation(this.wordToTranslate, this.selectedSourceLang, this.selectedDestinationLang).then((data) => {
        console.log(data as Word);
        this.translationResult = data as Word;
      });
    }
  }
}