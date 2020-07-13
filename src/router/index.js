import Vue from 'vue'
import Router from 'vue-router'

import home from '../components/Home'
import about from '../components/About'

/* dexie */
import DexieTasksTest from '../components/DexieTasks/test'
import DexieTasksTest2 from '../components/DexieTasks/test2'
import DexieTasksTest3 from '../components/DexieTasks/test3'
import DexieTasksTest4 from '../components/DexieTasks/test4'
import DexieTasksTest5 from '../components/DexieTasks/test5'
//
import IndexPlan from '../components/IndexPlans/Index'
import IndexPlanNew from '../components/IndexPlans/new'
import IndexPlanTest from '../components/IndexPlans/test'
import IndexPlanShow from '../components/IndexPlans/show'
import IndexPlanedit from '../components/IndexPlans/edit'
import IndexPlanImport from  '../components/IndexPlans/import_item'
//
import DexieTasks from '../components/DexieTasks/Index'
import DexieTasksNew  from '../components/DexieTasks/new'
import DexieTasksShow from '../components/DexieTasks/show'
import DexieTasksEdit from '../components/DexieTasks/edit'
import DexieTasksImport from '../components/DexieTasks/import_task'
/* dexie-todos */
import DexieTodos from '../components/DexieTodos/Index'
import DexieTodosNew from '../components/DexieTodos/new'
import DexieTodosShow from '../components/DexieTodos/show'
import DexieTodosEdit from '../components/DexieTodos/edit'
import DexieTodosImport from '../components/DexieTodos/import_todo'
/* mdats */
import IndexMdats from '../components/IndexMdats/Index'
import IndexMdatsNew from '../components/IndexMdats/new'
import IndexMdatsEdit from '../components/IndexMdats/edit'
import IndexMdatsChat from '../components/IndexMdats/chart'
import IndexMdatsImport from '../components/IndexMdats/import_mdat'
import IndexMdatsImportCsv from '../components/IndexMdats/import_csv'
import IndexMdatsSample from '../components/IndexMdats/chart_sample'
//
import FilesTest from '../components/Files/test'
import FilesTest2 from '../components/Files/test2'
import FilesExportCsv from '../components/Files/export_csv'


Vue.use(Router)
//
export default new Router({
	/* mode: 'history', */
	routes: [
		{ path: '/', component: home },
		{ path: '/about', component: about },
		/* task */
		{ path: '/dexie_tasks/test', component: DexieTasksTest },
		{ path: '/dexie_tasks/test2', component: DexieTasksTest2 },
		{ path: '/dexie_tasks/test3', component: DexieTasksTest3 },
		{ path: '/dexie_tasks/test4', component: DexieTasksTest4 },
		{ path: '/dexie_tasks/test5', component: DexieTasksTest5 },
		// 
		{ path: '/dexie_tasks', component: DexieTasks },
		{ path: '/dexie_tasks/new', component: DexieTasksNew },
		{ path: '/dexie_tasks/show/:id', component: DexieTasksShow },
		{ path: '/dexie_tasks/edit/:id', component: DexieTasksEdit },
		{ path: '/dexie_tasks/import', component: DexieTasksImport },
		/* dexie-todos */
		{ path: '/dexie_todos', component: DexieTodos },
		{ path: '/dexie_todos/new', component: DexieTodosNew },
		{ path: '/dexie_todos/show/:id', component: DexieTodosShow },
		{ path: '/dexie_todos/edit/:id', component: DexieTodosEdit },
		{ path: '/dexie_todos/import', component: DexieTodosImport },
		/* mdat */
		{ path: '/idx_mdat', component: IndexMdats },
		{ path: '/idx_mdat/new', component: IndexMdatsNew },
		{ path: '/idx_mdat/edit/:id', component: IndexMdatsEdit },
		{ path: '/idx_mdat/chart', component: IndexMdatsChat },
		{ path: '/idx_mdat/import', component: IndexMdatsImport },
		{ path: '/idx_mdat/import_csv', component: IndexMdatsImportCsv },
		{ path: '/idx_mdat/sample', component: IndexMdatsSample },
		/* files */
		{ path: '/files/test', component: FilesTest },
		{ path: '/files/test2', component: FilesTest2 },
		{ path: '/files/csv', component: FilesExportCsv },
		/* plan */ 
		{ path: '/idx_plan/test', component: IndexPlanTest },
		{ path: '/idx_plan', component: IndexPlan },
		{ path: '/idx_plan/new', component: IndexPlanNew },
		{ path: '/idx_plan/show/:id', component: IndexPlanShow },
		{ path: '/idx_plan/edit/:id', component: IndexPlanedit },
		{ path: '/idx_plan/import', component: IndexPlanImport },

	] 
})
