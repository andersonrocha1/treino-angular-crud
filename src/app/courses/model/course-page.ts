import { Course } from "./course";
import { Lesson } from "./lesson";

export interface CoursePage {
  courses: Course[];
  totalElements: number;
  totalPages: number;
}
