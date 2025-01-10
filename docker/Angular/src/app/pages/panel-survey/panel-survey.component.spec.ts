import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSurveyComponent } from './panel-survey.component';

describe('PanelSurveyComponent', () => {
  let component: PanelSurveyComponent;
  let fixture: ComponentFixture<PanelSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelSurveyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
