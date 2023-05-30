import { Injectable } from '@angular/core';
import { ConfirmationResult } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationResultService {
  private confirmationResult!: ConfirmationResult;
  setConfirmationResult(result: ConfirmationResult){
    this.confirmationResult = result;
  }
  getConfirmationResult(): ConfirmationResult{
    return this.confirmationResult;
  }
}
