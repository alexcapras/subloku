import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridMinorComponent } from './grid-minor.component';

describe('GridMinorComponent', () => {
  let component: GridMinorComponent;
  let fixture: ComponentFixture<GridMinorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridMinorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridMinorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
