import { Routes } from '@angular/router';

/*
path: 'dashboard': Esta es la ruta principal para el dashboard. Todo lo que ocurre bajo el dashboard 
tiene rutas anidadas (especificadas en el arreglo children). Esta es la ruta base que se usará para 
gestionar el listado de contactos, la creación y la edición.

children: Define rutas anidadas dentro de la ruta principal dashboard. Las rutas dentro de children son 
subrutas que se cargan cuando el usuario navega a rutas como /dashboard/create o /dashboard/edit/:contactId.

path: '**': El patrón ** es un comodín que captura cualquier ruta que no coincida con las rutas definidas 
anteriormente. En otras palabras, es la ruta "catch-all" que se activa cuando el usuario navega a una URL que no existe.
redirectTo: 'dashboard': Si el usuario navega a una ruta no válida, será redirigido automáticamente a la ruta /dashboard. 
Esto es útil para manejar errores de navegación o URLs incorrectas.
*/

export default [
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../contact-dashboard/contact-dashboard.component'),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('../contact-create/contact-create.component'),
      },
      {
        path: 'edit/:contactId',
        loadComponent: () =>
          import('../contact-create/contact-create.component'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
] as Routes;