import { Component, Input } from '@angular/core';
import { Synonym } from '../shared/model/synonyms';
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
/**
 * Component to display synonyms of a word
 */
export class SynonymsDetailsComponent {
  @Input() synonymsResult: Synonym | undefined = undefined;

  /**
   * Split the synonyms string into an array of synonyms
   * @param synonyms 
   * @returns Array of synonyms (string[])
   */
  splitSynonyms(synonyms: string): string[] {
    return synonyms.split('|');
  }
}
