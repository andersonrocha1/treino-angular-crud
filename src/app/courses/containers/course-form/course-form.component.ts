import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
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
    name: [''],
    category: ['']
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
}
