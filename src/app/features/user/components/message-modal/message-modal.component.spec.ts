import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageModalComponent } from './message-modal.component';

describe('MessageModalComponent', () => {
  let component: MessageModalComponent;
  let fixture: ComponentFixture<MessageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
