import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynonymsPageComponent } from './synonyms-page.component';

describe('SynonymsPageComponent', () => {
  let component: SynonymsPageComponent;
  let fixture: ComponentFixture<SynonymsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SynonymsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SynonymsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
