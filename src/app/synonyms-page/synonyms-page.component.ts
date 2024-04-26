import { Component } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as iso6391 from 'iso-639-1';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Synonym } from '../shared/model/synonyms';
import { SynonymsDetailsComponent } from '../synonyms-details/synonyms-details.component';
import { SynonymService } from '../shared/service/synonym.service';

@Component({
  selector: 'app-synonyms-page',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    FormsModule,
    MatOption,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    SynonymsDetailsComponent
    ],
  templateUrl: './synonyms-page.component.html',
  styleUrl: './synonyms-page.component.scss'
})
export class SynonymsPageComponent {
  selectedLanguage: string = '';
  languages: string[] = ["cs_CZ", "da_DK", "de_CH", "de_DE", "en_US", "el_GR", "es_ES", "fr_FR", "hu_HU", "it_IT", "no_NO", "pl_PL", "pt_PT", "ro_RO", "ru_RU", "sk_SK"];
  inputWord: string = '';

  result: Synonym | undefined = undefined;

  constructor(private synonymService: SynonymService) {
  }

  onSelectLanguageChange() {
    console.log(this.selectedLanguage);
  }

  getDisplayName(lang: string) {
    var shortName = lang.split('_')[0];
    var secondPart = lang.split('_')[1];
    return iso6391.default.getName(shortName) + " (" + secondPart + ")";
  }

  getSynonyms() {
    this.synonymService.get_synonyms(this.inputWord, this.selectedLanguage).subscribe((data) => {
      this.result = data;
    });
  }
}
