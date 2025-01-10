import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPanelLinkComponent } from './view-panel-link.component';

describe('ViewPanelLinkComponent', () => {
  let component: ViewPanelLinkComponent;
  let fixture: ComponentFixture<ViewPanelLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPanelLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPanelLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
