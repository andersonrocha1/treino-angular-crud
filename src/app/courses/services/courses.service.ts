import { Course } from './../model/course';
import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs';
import { CoursePage } from '../model/course-page';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = '/api/courses';
  constructor(private httpClient : HttpClient) { }

  findAll(pageNumber = 0, pageSize = 10) {

    return this.httpClient.get<CoursePage>(this.API, { params: { pageNumber, pageSize } })
    .pipe(
      first(),
    );
  }

  findById(id: string){
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  save(gravar: Partial<Course> ){

    if(gravar._id) {
      return this.update(gravar);
    }
    return this.create(gravar)
  }

  private create(gravar: Partial<Course>){
    return this.httpClient.post<Course>(this.API, gravar).pipe(first());
  }

  private update(gravar: Partial<Course>){
    return this.httpClient.put<Course>( `${this.API}/${gravar._id}`, gravar).pipe(first());
  }

  deletar(id: string){
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
