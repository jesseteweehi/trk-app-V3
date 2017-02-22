import { Route } from "@angular/router";

import { StudentListComponent } from './student-list/student-list.component'
import { StudentFormComponent } from './student-form/student-form.component'
import { SubjectListComponent } from './subject-list/subject-list.component'
import { MySubjectListComponent } from './my-subject-list/my-subject-list.component'
import { SubjectFormComponent } from './subject-form/subject-form.component'



export const routerConfig : Route[] = [
    {
        path: '',
        redirectTo: 'subjects',
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
    }
]