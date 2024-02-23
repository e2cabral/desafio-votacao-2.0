import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVotersComponent } from './register-voters.component';

describe('RegisterVotersComponent', () => {
  let component: RegisterVotersComponent;
  let fixture: ComponentFixture<RegisterVotersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterVotersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterVotersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
