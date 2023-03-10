import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IChargeJournaliere } from '../charge-journaliere.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../charge-journaliere.test-samples';

import { ChargeJournaliereService, RestChargeJournaliere } from './charge-journaliere.service';

const requireRestSample: RestChargeJournaliere = {
  ...sampleWithRequiredData,
  date: sampleWithRequiredData.date?.format(DATE_FORMAT),
};

describe('ChargeJournaliere Service', () => {
  let service: ChargeJournaliereService;
  let httpMock: HttpTestingController;
  let expectedResult: IChargeJournaliere | IChargeJournaliere[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ChargeJournaliereService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find('9fec3727-3421-4967-b213-ba36557ca194').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a ChargeJournaliere', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const chargeJournaliere = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(chargeJournaliere).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ChargeJournaliere', () => {
      const chargeJournaliere = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(chargeJournaliere).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ChargeJournaliere', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ChargeJournaliere', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ChargeJournaliere', () => {
      const expected = true;

      service.delete('9fec3727-3421-4967-b213-ba36557ca194').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addChargeJournaliereToCollectionIfMissing', () => {
      it('should add a ChargeJournaliere to an empty array', () => {
        const chargeJournaliere: IChargeJournaliere = sampleWithRequiredData;
        expectedResult = service.addChargeJournaliereToCollectionIfMissing([], chargeJournaliere);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(chargeJournaliere);
      });

      it('should not add a ChargeJournaliere to an array that contains it', () => {
        const chargeJournaliere: IChargeJournaliere = sampleWithRequiredData;
        const chargeJournaliereCollection: IChargeJournaliere[] = [
          {
            ...chargeJournaliere,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addChargeJournaliereToCollectionIfMissing(chargeJournaliereCollection, chargeJournaliere);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ChargeJournaliere to an array that doesn't contain it", () => {
        const chargeJournaliere: IChargeJournaliere = sampleWithRequiredData;
        const chargeJournaliereCollection: IChargeJournaliere[] = [sampleWithPartialData];
        expectedResult = service.addChargeJournaliereToCollectionIfMissing(chargeJournaliereCollection, chargeJournaliere);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(chargeJournaliere);
      });

      it('should add only unique ChargeJournaliere to an array', () => {
        const chargeJournaliereArray: IChargeJournaliere[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const chargeJournaliereCollection: IChargeJournaliere[] = [sampleWithRequiredData];
        expectedResult = service.addChargeJournaliereToCollectionIfMissing(chargeJournaliereCollection, ...chargeJournaliereArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const chargeJournaliere: IChargeJournaliere = sampleWithRequiredData;
        const chargeJournaliere2: IChargeJournaliere = sampleWithPartialData;
        expectedResult = service.addChargeJournaliereToCollectionIfMissing([], chargeJournaliere, chargeJournaliere2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(chargeJournaliere);
        expect(expectedResult).toContain(chargeJournaliere2);
      });

      it('should accept null and undefined values', () => {
        const chargeJournaliere: IChargeJournaliere = sampleWithRequiredData;
        expectedResult = service.addChargeJournaliereToCollectionIfMissing([], null, chargeJournaliere, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(chargeJournaliere);
      });

      it('should return initial array if no ChargeJournaliere is added', () => {
        const chargeJournaliereCollection: IChargeJournaliere[] = [sampleWithRequiredData];
        expectedResult = service.addChargeJournaliereToCollectionIfMissing(chargeJournaliereCollection, undefined, null);
        expect(expectedResult).toEqual(chargeJournaliereCollection);
      });
    });

    describe('compareChargeJournaliere', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareChargeJournaliere(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
        const entity2 = null;

        const compareResult1 = service.compareChargeJournaliere(entity1, entity2);
        const compareResult2 = service.compareChargeJournaliere(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
        const entity2 = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };

        const compareResult1 = service.compareChargeJournaliere(entity1, entity2);
        const compareResult2 = service.compareChargeJournaliere(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
        const entity2 = { id: '9fec3727-3421-4967-b213-ba36557ca194' };

        const compareResult1 = service.compareChargeJournaliere(entity1, entity2);
        const compareResult2 = service.compareChargeJournaliere(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
