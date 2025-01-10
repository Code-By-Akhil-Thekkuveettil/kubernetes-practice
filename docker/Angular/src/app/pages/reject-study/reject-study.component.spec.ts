import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectStudyComponent } from './reject-study.component';

describe('RejectStudyComponent', () => {
  let component: RejectStudyComponent;
  let fixture: ComponentFixture<RejectStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectStudyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RejectStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
