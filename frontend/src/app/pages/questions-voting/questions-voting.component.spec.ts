import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsVotingComponent } from './questions-voting.component';

describe('QuestionsVotingComponent', () => {
  let component: QuestionsVotingComponent;
  let fixture: ComponentFixture<QuestionsVotingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionsVotingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionsVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
