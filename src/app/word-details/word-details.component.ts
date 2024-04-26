import { Component, Input } from '@angular/core';
import { Word } from '../shared/model/word-properties';
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


}
