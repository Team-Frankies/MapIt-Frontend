import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the register API endpoint with the correct parameters', async () => {
    const inputData = {
      email: 'test@test.es',
      firstname: 'Test',
      lastname: 'Unitario',
      password: 'Password123',
    };

    (await service.register(inputData)).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `${environment.apiUrl}/auth/sign-up`
    );
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(inputData);

    const mockResponse = { token: 'test_token' };
    req.flush(mockResponse);
  });
});
