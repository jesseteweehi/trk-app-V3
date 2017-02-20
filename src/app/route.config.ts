import { Route } from "@angular/router";

import { StudentListComponent } from './student-list/student-list.component'
import { StudentFormComponent } from './student-form/student-form.component'
import { SubjectListComponent } from './subject-list/subject-list.component'
import { SubjectFormComponent } from './subject-form/subject-form.component'



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
                        component: SubjectListComponent
                    },
                    {
                        path: 'new',
                        component: SubjectFormComponent
                    }

                ]
            }
            // ,
            // {
            //     path: 'goals',
            //     component: StudentFormComponent,
            // },
            // {
            //     path: 'pathways',
            //     component: StudentFormComponent,
            // }
        ]
    }
    // {
    //     path:'organisations',
    //     children:[
    //         {
    //             path: '',
    //             component: OrganisationComponent,
    //         },
    //         {
    //             path: 'skills/:id',
    //             component: SkillsComponent,
    //         }
    //     ]
    // }
]