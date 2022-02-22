import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlyCheesboardComponent } from './read-only-cheesboard.component';

describe('ReadOnlyCheesboardComponent', () => {
  let component: ReadOnlyCheesboardComponent;
  let fixture: ComponentFixture<ReadOnlyCheesboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadOnlyCheesboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadOnlyCheesboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
