import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Registro {
  id: string;
  nombre: string;
  correo: string;
  numero: string;
  asistencia: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataUser: any;
  registrosCollection: AngularFirestoreCollection<Registro>;
  registros: Observable<Registro[]>;
  registroForm: FormGroup;

  registroIdEditar: string | null = null;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: DatabaseService,
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder
  ) {
    this.registrosCollection = this.firestore.collection<Registro>('Lista');
    this.registros = this.registrosCollection.valueChanges();
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      numero: ['', Validators.required],
      asistencia: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    this.afAuth.currentUser.then(user => {
      /*if(user && user.emailVerified) {
        this.dataUser = user;
        console.log(user)
      } else {
        this.router.navigate(['/login']);
      }*/
      this.dataUser = user;
    });
  }

  logOut() {
    this.afAuth.signOut().then(() => this.router.navigate(['/login']));
  }

  guardarRegistro() {
    if (this.registroForm.valid) {
      const registro: Registro = {
        id: this.registroIdEditar ? this.registroIdEditar : this.firestore.createId(),
        nombre: this.registroForm.get('nombre')?.value,
        correo: this.registroForm.get('correo')?.value,
        numero: this.registroForm.get('numero')?.value,
        asistencia: this.registroForm.get('asistencia')?.value
      };
  
      if (this.registroIdEditar) {
        this.registrosCollection.doc(registro.id).update(registro);
        this.registroIdEditar = null; // Reinicia la propiedad para permitir la creación de nuevos registros
      } else {
        this.registrosCollection.doc(registro.id).set(registro);
      }
  
      this.registroForm.reset();
    }
  }
  eliminarRegistro(id: string) {
    this.registrosCollection.doc(id).delete();
  }

  editarRegistro(registro: Registro) {
    this.registroIdEditar = registro.id;
    this.registroForm.patchValue({
      nombre: registro.nombre,
      correo: registro.correo,
      numero: registro.numero,
      asistencia: registro.asistencia
    });
  }
}