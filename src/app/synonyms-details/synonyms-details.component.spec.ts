import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynonymsDetailsComponent } from './synonyms-details.component';

describe('SynonymsDetailsComponent', () => {
  let component: SynonymsDetailsComponent;
  let fixture: ComponentFixture<SynonymsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SynonymsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SynonymsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
