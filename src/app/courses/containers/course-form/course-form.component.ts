import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    name: [''],
    category: ['']
  });

  constructor(private formBuilder: NonNullableFormBuilder, private service: CoursesService,
    private snackBar: MatSnackBar, private location: Location) {

    //this.form =
  }

  ngOnInit() {

  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(result => this.onSucess(), error=> this.onError());
    this.onCancel();
  }

  onCancel() {
    this.location.back(); //Voltando aos Cursos disponíveis com Location
  }

  private onSucess(){
    this.snackBar.open('Curso salvo com sucesso!', '', {duration:5000});
  }

  private onError(){//Mensagem de erro
    this.snackBar.open('Falha ao salvar curso', '', {duration:5000});
  }
}
