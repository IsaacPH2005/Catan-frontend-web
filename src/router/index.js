import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/auth/loginView.vue'
import RegisterView from '@/views/auth/registerView.vue'
import PerfilView from '@/views/profile/PerfilView.vue'
import EventosView from '@/views/evetos/EventosView.vue'

import Tablas from '@/views/crear_tabla_de_posicioens/Tablas.vue'

import RolesView from '@/views/roles/RolesView.vue'
import RolesFormView from '@/views/roles/RolesFormView.vue'
import UsuariosView from '@/views/usuarios/UsuariosView.vue'
import LayautWebView from '@/views/Layout/LayautWebView.vue'
import AgregarJugadoresTabla from '@/views/AgregarJugadoresTabla.vue'
import PanelAdminView from '@/views/Layout/PanelAdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/admin-crud',
      component: PanelAdminView,
      children: [
        {
          path: '/eventos',
          name: 'eveetos',
          component: EventosView
        },
        {
          path: '/tablas',
          name: 'tablas',
          component: Tablas
        },
        {
          path: '/roles',
          name: 'roles',
          component: RolesView
        },
        {
          path: '/roles-form',
          name: 'crear-rol',
          component: RolesFormView
        },
        {
          path: '/usuarios',
          name: 'usuarios',
          component: UsuariosView
        },
        {
          path: '/agregar-jugador',
          name: 'agregar-jugador',
          component: AgregarJugadoresTabla
        },
      ]
    },
    {
      path: '/',
      component: LayautWebView,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        },
        {
          path: '/profile',
          name: 'profile',
          component: PerfilView
        },
      ]
    },
  ]
})

export default router
