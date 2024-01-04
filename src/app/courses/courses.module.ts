import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './containers/courses/courses.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseFormComponent } from './containers/course-form/course-form.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';




@NgModule({
    imports: [
        CommonModule,
        CoursesRoutingModule,
        AppMaterialModule,
        SharedModule,
        ReactiveFormsModule,
        CoursesComponent,
        CourseFormComponent,
        CoursesListComponent
    ]
})
export class CoursesModule { }
