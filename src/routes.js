import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import TablesView from './components/views/Tables.vue'
import TasksView from './components/views/Tasks.vue'
import SettingView from './components/views/Setting.vue'
import AccessView from './components/views/Access.vue'
import ServerView from './components/views/Server.vue'
import ReposView from './components/views/Repos.vue'
import Excel from './components/views/Excel.vue'
import CapaianUnit from './components/views/tables/Capaian_Unit.vue'
import Datadasar from './components/views/tables/Datadasar.vue'
import JenisSatker from './components/views/tables/Jenissatker.vue'
import Periode from './components/views/tables/Periode.vue'
import MasterIndikator from './components/views/tables/Masterindikator.vue'
import SatuanKerja from './components/views/tables/Satuankerja.vue'
import IndikatorPeriode from './components/views/tables/Indikator_Periode.vue'
import IndikatorSatuanKerja from './components/views/tables/Indikator_Satuankerja.vue'
import IndikatorSatuanKerjaLog from './components/views/tables/Indikator_Satuankerja_log.vue'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Overview of environment'}
      }, {
        path: 'tables',
        component: TablesView,
        name: 'Tables',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'tasks',
        component: TasksView,
        name: 'Tasks',
        meta: {description: 'Tasks page in the form of a timeline'}
      }, {
        path: 'setting',
        component: SettingView,
        name: 'Settings',
        meta: {description: 'User settings page'}
      }, {
        path: 'access',
        component: AccessView,
        name: 'Access',
        meta: {description: 'Example of using maps'}
      }, {
        path: 'server',
        component: ServerView,
        name: 'Servers',
        meta: {description: 'List of our servers', requiresAuth: true}
      }, {
        path: 'repos',
        component: ReposView,
        name: 'Repository',
        meta: {description: 'List of popular javascript repos'}
      }, {
        path: 'excel',
        component: Excel,
        name: 'Excel',
        meta: {description: 'Testing worksheet'}
      }, {
        path: 'datadasar',
        component: Datadasar,
        name: 'Datadasar',
        meta: {description: 'datadasar worksheet'}
      }, {
        path: 'jenissatker',
        component: JenisSatker,
        name: 'Jenis Satuan Kerja',
        meta: {description: 'jenissatker worksheet'}
      }, {
        path: 'periode',
        component: Periode,
        name: 'Periode',
        meta: {description: 'periode worksheet'}
      }, {
        path: 'masterindikator',
        component: MasterIndikator,
        name: 'Master Indikator',
        meta: {description: 'masterindikator worksheet'}
      }, {
        path: 'satuankerja',
        component: SatuanKerja,
        name: 'Satuan Kerja',
        meta: {description: 'satuankerja worksheet'}
      }, {
        path: 'indikatorperiode',
        component: IndikatorPeriode,
        name: 'Indikator Periode',
        meta: {description: 'indikatorperiode worksheet'}
      }, {
        path: 'indikatorsatuankerja',
        component: IndikatorSatuanKerja,
        name: 'Indikator Satuan Kerja',
        meta: {description: 'indikatorsatuankerja worksheet'}
      }, {
        path: 'capaianunit',
        component: CapaianUnit,
        name: 'Capaian Unit',
        meta: {description: 'capaianunit worksheet'}
      }, {
        path: 'indikatorsatuankerjalog',
        component: IndikatorSatuanKerjaLog,
        name: 'Log Indikator Satuan Kerja',
        meta: {description: 'log sheet untuk indikatorsatuankerja'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
