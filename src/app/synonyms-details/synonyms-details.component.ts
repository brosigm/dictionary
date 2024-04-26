import { Component, Input } from '@angular/core';
import { Synonym } from '../shared/dtos/synonyms';
import { Word } from '../shared/dtos/word-properties';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-synonyms-details',
  standalone: true,
  imports: [
      CommonModule
  ],
  templateUrl: './synonyms-details.component.html',
  styleUrl: './synonyms-details.component.scss'
})
export class SynonymsDetailsComponent {

  @Input() synonymsResult: Synonym | undefined = undefined;

  constructor() {
  }

  splitSynonyms(synonyms: string): string[] {
    return synonyms.split('|');
  } 



}
