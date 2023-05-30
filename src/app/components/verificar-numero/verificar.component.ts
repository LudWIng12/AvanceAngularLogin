import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';
import { ConfirmationResult, getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { ConfirmationResultService } from 'src/app/services/confirmation-result.service';

@Component({
  selector: 'app-verificar',
  templateUrl: './verificar.component.html',
  styleUrls: ['./verificar.component.css']
})
export class VerificarComponent implements OnInit {
  OTPCode: FormGroup;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService,
    private confirmationResultService: ConfirmationResultService){
      this.OTPCode = this.fb.group({
        otpCode: ['', Validators.required],
      });
    }

    ngOnInit() {}

    onVerifyCode() {
      const code = this.OTPCode.value.otpCode;
      const confirmationResult = this.confirmationResultService.getConfirmationResult();
      this.loading = true;
      confirmationResult.confirm(code)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          this.loading = false;
          this.router.navigate(['/dashboard']);
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
        });
    }

}
