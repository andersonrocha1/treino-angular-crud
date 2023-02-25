import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]> | null = null ;


  //coursesService: CoursesService;

  constructor(private coursesService: CoursesService,
    public dialog: MatDialog, private router: Router,
    private route: ActivatedRoute, private snackBar: MatSnackBar){
    //this.courses = [];
    //this.coursesService = new CoursesService();
    this.onRefresh();
  }

  ngOnInit(): void {

  }

  onAdd(){
    this.router.navigate(['newCourse'], {relativeTo: this.route});

  }

  onEdit(course: Course){
    this.router.navigate(['editCourse', course._id], {relativeTo: this.route});
  }

  onDelete(course: Course){

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Você quer mesmo excluir este curso ?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.coursesService.deletar(course._id).subscribe(
          () => {
            this.onRefresh();
            this.snackBar.open('Curso excluído com sucesso!!', 'X', {duration:4000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          ( ) => this.onError("Falha ao excluir curso!!")

        );

      }
    });
  }

  onRefresh(){
    this.courses$ = this.coursesService.findAll()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos...')
        return of([]);
      })
    );
  }

  onError(errorMsg: String) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

}
