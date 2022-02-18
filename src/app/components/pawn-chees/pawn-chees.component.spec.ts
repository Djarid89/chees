import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PawnCheesComponent } from './pawn-chees.component';

describe('PawnCheesComponent', () => {
  let component: PawnCheesComponent;
  let fixture: ComponentFixture<PawnCheesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PawnCheesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PawnCheesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
