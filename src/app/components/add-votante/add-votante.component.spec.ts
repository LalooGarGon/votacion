import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVotanteComponent } from './add-votante.component';

describe('AddVotanteComponent', () => {
  let component: AddVotanteComponent;
  let fixture: ComponentFixture<AddVotanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVotanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVotanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
