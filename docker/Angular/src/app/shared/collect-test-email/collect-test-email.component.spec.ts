import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectTestEmailComponent } from './collect-test-email.component';

describe('CollectTestEmailComponent', () => {
  let component: CollectTestEmailComponent;
  let fixture: ComponentFixture<CollectTestEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectTestEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectTestEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
