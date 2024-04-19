import { Component, Input } from '@angular/core';
import { Word } from '../shared/dtos/word-properties';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-word-details',
  standalone: true,
  imports: [
      CommonModule
  ],
  templateUrl: './word-details.component.html',
  styleUrl: './word-details.component.scss'
})
export class WordDetailsComponent {
  @Input() translationResult: Word | null = null;
  @Input() sourceLang: string | undefined;
  @Input() destinationLang: string | undefined;


}
