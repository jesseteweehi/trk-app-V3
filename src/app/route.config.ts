import { Route } from "@angular/router";

import { StudentListComponent } from './student-list/student-list.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { StandardListComponent } from './standard-list/standard-list.component';

import { MyStudentComponent } from './my-student/my-student.component';
import { MySubjectListComponent } from './my-subject-list/my-subject-list.component';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { MyGoalsListComponent } from './my-goals-list/my-goals-list.component';
import { MyPathwaysListComponent } from './my-pathways-list/my-pathways-list.component';



export const routerConfig : Route[] = [
    {
        path: '',
        redirectTo: 'students',
        pathMatch: 'full'
    },
    {
        path:'students',
        children:[
            {
                path: '',
                component: StudentListComponent,
            }
        ]
    },
    {
        path: 'subjects',
        children: [
            {
                path: '',
                component: SubjectListComponent,
            }

        ]
    },
    {
        path: 'standards',
        children: [
            {
                path: '',
                component: StandardListComponent,
            }
        ]
    },
    {
        path: 'mystudents',
        children: [
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: MyStudentComponent,
                    }
                ]
            
            }
        ]
    }
]