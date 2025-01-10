import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuotaGroupComponent } from './add-quota-group.component';

describe('AddQuotaGroupComponent', () => {
  let component: AddQuotaGroupComponent;
  let fixture: ComponentFixture<AddQuotaGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddQuotaGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddQuotaGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
