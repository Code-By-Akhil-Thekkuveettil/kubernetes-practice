import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribePanelComponent } from './unsubscribe-panel.component';

describe('UnsubscribePanelComponent', () => {
  let component: UnsubscribePanelComponent;
  let fixture: ComponentFixture<UnsubscribePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsubscribePanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnsubscribePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
