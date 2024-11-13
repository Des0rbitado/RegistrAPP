import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface Horario {
  dia: string;
  inicio: string;
  fin: string;
}

interface Seccion {
  codigo_seccion: string;
  profesor_id: number;
  horario: Horario[];
  alumnos_inscritos: number[];
}

interface Asignatura {
  codigo: string;
  nombre: string;
  secciones: Seccion[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'assets/db.json';
  private apiUrl1 = 'http://localhost:3000';
  private apiUrlStudents = 'http://localhost:3000/alumnos';
  private apiUrlTeacher = 'http://localhost:3000/profesores';
  private apiUrlAsignaturas = 'http://localhost:3000/asignaturas';
  private apiUrlAsistencias = 'http://localhost:3000/asistencias';

  private currentUserKey = 'currentUser';

  constructor(private http: HttpClient) { }

  getCurrentUser() {
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  async login(username: string, password: string, isStudent: boolean) {
    const users: any = await firstValueFrom(this.http.get(this.apiUrl));

    const targetUsers = isStudent ? users.alumnos : users.profesores;

    let foundUser: any = null;

    for (const user of targetUsers) {
      if (user.correo === username && user.contraseña === password) {
        foundUser = user;
        break;
      }
    }

    return foundUser;
  }
//http://localhost:3000/asistencias?alumno_id=1&codigo_seccion=FIS3150_001
  getAsistenciasByAlumnoId(): Observable<any> {
    const currentUser = this.getCurrentUser();
    const alumnoId = currentUser.id;
    if (!alumnoId) {
      throw new Error('Alumno ID no establecido en la sesión');
    }

    const url = `${this.apiUrl1}/asistencias?alumno_id=${alumnoId}`;
    return this.http.get<any>(url);
  }

  getAsistenciasAlumno(alumnoId: string, codigoSeccion: string): Observable<any> {
    const url = `${this.apiUrlAsistencias}?alumno_id=${alumnoId}&codigo_seccion=${codigoSeccion}`;
    return this.http.get<any>(url);
  }

  updateUserPassword(user: any) {
    return this.http.put(`${this.apiUrlStudents}/${user.id}`, user).subscribe(() => {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    });
  }

  async getTeacherSubjects(profesorId: string): Promise<string[]> {
    try {
      const data: any = await firstValueFrom(this.http.get(this.apiUrl));
      const profesor = data.profesores.find((profesor: any) => profesor.id === profesorId);

      if (profesor) {
        return profesor.asignaturas;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error al obtener las asignaturas:', error);
      return [];
    }
  }

  async getStudentSubjects(studentId: string): Promise<string[]> {
    try {
      const data: any = await firstValueFrom(this.http.get(this.apiUrl));
      const student = data.alumnos.find((alumno: any) => alumno.id === studentId);

      if (student) {
        return student.asignaturas;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error al obtener las asignaturas:', error);
      return [];
    }
  }

  async getSubjectDetails(subjectCode: string): Promise<Asignatura | null> {
    try {
      const subjectCodeWithoutLast4 = subjectCode.slice(0, -4);
      const url = `${this.apiUrlAsignaturas}/${subjectCodeWithoutLast4}`;
      const data: Asignatura = await firstValueFrom(this.http.get<Asignatura>(url));

      if (!data || !data.secciones) {
        console.warn(`No se encontraron secciones para la asignatura: ${subjectCode}`);
        return null;
      }

      return {
        codigo: data.codigo,
        nombre: data.nombre,
        secciones: data.secciones.map((seccion: Seccion) => ({
          codigo_seccion: seccion.codigo_seccion,
          profesor_id: seccion.profesor_id,
          horario: seccion.horario,
          alumnos_inscritos: seccion.alumnos_inscritos || []
        }))
      };
    } catch (error) {
      console.error('Error al obtener los detalles de la asignatura', error);
      return null;
    }
  }

  updateUserPasswordTeacher(user: any) {
    return this.http.put(`${this.apiUrlTeacher}/${user.id}`, user).subscribe(() => {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    });
  }

  getAsistenciasByAlumnoId1(codigoSeccion: string, alumnoId: string): Observable<any> {
    const url = `${this.apiUrlAsistencias}?alumno_id=${alumnoId}&codigo_seccion=${codigoSeccion}`;
    return this.http.get<any>(url);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  addAsistencia(alumnoId: string, codigoSeccion: string, fecha: string, estado: string): Observable<any> {
    return this.getAsistenciasByAlumnoId1(codigoSeccion, alumnoId).pipe(
      switchMap(asistencias => {
        if (asistencias.length > 0) {
          const asistencia = asistencias[0];
          asistencia.asistencias.push({ fecha, estado });

          return this.http.put(`${this.apiUrlAsistencias}/${asistencia.id}`, asistencia);
        } else {
          const nuevaAsistencia = {
            alumno_id: alumnoId,
            nombre_asignatura: 'Nombre de la asignatura',
            codigo_seccion: codigoSeccion,
            asistencias: [{ fecha, estado }],
          };
          return this.http.post(this.apiUrlAsistencias, nuevaAsistencia);
        }
      })
    );
  }
}
