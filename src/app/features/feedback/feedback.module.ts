import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeedbackComponent } from './feedback/feedback.component';
import { SendModalComponent } from './components/send-modal/send-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/shared/modules/material/angular-material.module';
import { FeedbackRoutingModule } from './feedback-routing.module';


@NgModule({
  declarations: [FeedbackComponent, SendModalComponent],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  exports: [RouterModule],
})
export class FeedbackModule {}
