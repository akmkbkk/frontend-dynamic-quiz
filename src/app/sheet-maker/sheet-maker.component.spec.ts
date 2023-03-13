import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetMakerComponent } from './sheet-maker.component';

describe('SheetMakerComponent', () => {
  let component: SheetMakerComponent;
  let fixture: ComponentFixture<SheetMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheetMakerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
