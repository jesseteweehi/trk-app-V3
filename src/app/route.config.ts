import { Route } from "@angular/router";

import { StudentListComponent } from './student-list/student-list.component'
import { StudentFormComponent } from './student-form/student-form.component'
import { SubjectListComponent } from './subject-list/subject-list.component'
import { MySubjectListComponent } from './my-subject-list/my-subject-list.component'
import { SubjectFormComponent } from './subject-form/subject-form.component'
import { StandardListComponent } from './standard-list/standard-list.component'
import { StandardFormComponent } from './standard-form/standard-form.component'


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
            },
            {
                path: 'new',
                component: StudentFormComponent,
            },
            {
                path: ':id/subjects',
                children:[
                    {
                        path: '',
                        component: MySubjectListComponent
                    }
                ]
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
            },
            {
                path: 'new',
                component: StandardFormComponent,
            },

        ]
    }
]