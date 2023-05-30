import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire//compat/firestore';
import { FormsModule } from '@angular/forms';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { VerificarComponent } from './components/verificar-numero/verificar.component';

import { environment } from 'src/environments/environment';
import { ConfirmationResultService } from './services/confirmation-result.service';
import * as firebase from 'firebase/app';


  export const firebaseConfig = {
    apiKey: "AIzaSyCnB9asTgDF2DUosOEN3mUGcYvjtyIeIlU",
    authDomain: "proyecto-login-isc6c.firebaseapp.com",
    projectId: "proyecto-login-isc6c",
    storageBucket: "proyecto-login-isc6c.appspot.com",
    messagingSenderId: "400359707658",
    appId: "1:400359707658:web:9967596232989b241abbf3"
  };

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistrarUsuarioComponent,
    VerificarCorreoComponent,
    RecuperarPasswordComponent,
    SpinnerComponent,
    VerificarComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    ConfirmationResultService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
