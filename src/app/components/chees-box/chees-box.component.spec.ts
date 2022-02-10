import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheesBoxComponent } from './chees-box.component';

describe('CheesBoxComponent', () => {
  let component: CheesBoxComponent;
  let fixture: ComponentFixture<CheesBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheesBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
