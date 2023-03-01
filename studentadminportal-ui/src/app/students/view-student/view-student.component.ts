import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { Student } from 'src/app/models/ui-models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentId: string | null | undefined;
  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImageUrl: '',
    gender: {
      id: '',
      description: ''
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: ''
    }
  }

  genders: Gender[] = [];

  constructor(private readonly studentService: StudentService,
    private readonly route: ActivatedRoute,
    private readonly genderService: GenderService,
    private snackBar: MatSnackBar ) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get('id');

        if(this.studentId){
          this.studentService.getStudentById(this.studentId)
          .subscribe(
            (successResponse) => {
              this.student = successResponse;
            }
          );

          this.genderService.getGenders()
          .subscribe(
            (successResponse) => {
              this.genders = successResponse;

            }
          );
        }
      }
    );
  }

  onUpdate(): void {
   this.studentService.updateStudent(this.student.id, this.student)
    .subscribe(
      (sucessResponse) => {
        this.snackBar.open('Student updated successfully', undefined, {
          duration: 2000
        })
      },
      (errorResponse) => {

      }
    );
  }
}
