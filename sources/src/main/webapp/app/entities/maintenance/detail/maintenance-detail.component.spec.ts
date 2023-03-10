import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MaintenanceDetailComponent } from './maintenance-detail.component';

describe('Maintenance Management Detail Component', () => {
  let comp: MaintenanceDetailComponent;
  let fixture: ComponentFixture<MaintenanceDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenanceDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ maintenance: { id: '9fec3727-3421-4967-b213-ba36557ca194' } }) },
        },
      ],
    })
      .overrideTemplate(MaintenanceDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MaintenanceDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load maintenance on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.maintenance).toEqual(expect.objectContaining({ id: '9fec3727-3421-4967-b213-ba36557ca194' }));
    });
  });
});
