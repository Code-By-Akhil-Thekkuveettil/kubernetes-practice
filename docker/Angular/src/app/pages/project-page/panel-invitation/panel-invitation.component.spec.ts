import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelInvitationComponent } from './panel-invitation.component';

describe('PanelInvitationComponent', () => {
  let component: PanelInvitationComponent;
  let fixture: ComponentFixture<PanelInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelInvitationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
