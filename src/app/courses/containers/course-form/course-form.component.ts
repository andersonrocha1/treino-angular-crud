import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
    category: ['', [Validators.required]]
  });

  constructor(private formBuilder: NonNullableFormBuilder, private service: CoursesService,
    private snackBar: MatSnackBar, private location: Location,
    private route: ActivatedRoute) {

    //this.form =
  }

  ngOnInit() {
      const course: Course = this.route.snapshot.data['course'];
      this.form.setValue({
        _id: course._id,
        name: course.name,
        category: course.category
      });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(result => this.onSucess(), error=> this.onError());
    this.onCancel();
  }

  onCancel() {
    this.location.back(); //Voltando aos Cursos disponíveis com Location
  }

  private onSucess(){
    this.snackBar.open('Curso salvo com sucesso!', '', {duration:3000});
  }

  private onError(){//Mensagem de erro
    this.snackBar.open('Falha ao salvar curso', '', {duration:5000});
  }

  getErrorMessage(fieldName: string){
    const field = this.form.get(fieldName);
    if(field?.hasError('required')){
      return 'Campo obrigatório';
    }

    if(field?.hasError('minlength')){
      const requiredLength: number = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Quantidade mínima de carateres é ${requiredLength}`;
    }

    if(field?.hasError('maxlength')){
      const requiredLength: number = field.errors ? field.errors['maxlength']['requiredLength'] : 150;
      return `Quantidade máximo de carateres é ${requiredLength}`;
    }
    return 'Campo inválido';
  }
}
