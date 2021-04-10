import Vue from 'vue'
import VueRouter from 'vue-router'
import Accueil from '../views/Accueil.vue'
import Contact from '../views/Contact.vue'
import Formulaire from '../views/Formulaire.vue'
import Tableaux from '../views/Tableaux.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/accueil',
    name: 'Accueil',
    component: Accueil
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/formulaire',
    name: 'Formulaire',
    component: Formulaire
  },
  {
    path: '/tableaux',
    name: 'Tableaux',
    component: Tableaux
  },
  {
    path: '/*',
    redirect: '/accueil'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
