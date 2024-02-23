import { Routes } from '@angular/router'
import {LoginComponent} from './pages/login/login.component'
import {RegisterComponent} from './pages/register/register.component'
import {QuestionsVotingComponent} from './pages/questions-voting/questions-voting.component'
import {authGuard} from './infra/guards/auth.guard'
import {CreateQuestionComponent} from './pages/create-question/create-question.component'
import {QuestionComponent} from './pages/question/question.component'
import {RegisterVotersComponent} from './pages/register-voters/register-voters.component'

export const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'voting', component: QuestionsVotingComponent, canActivate: [authGuard] },
	{ path: 'create-question', component: CreateQuestionComponent, canActivate: [authGuard] },
	{ path: 'question/:id', component: QuestionComponent },
	{ path: 'register/voters', component: RegisterVotersComponent, canActivate: [authGuard] },
]
