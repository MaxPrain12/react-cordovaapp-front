import RegisterClass from "../Components/RegisterClass";
import Login from "../Components/Login";
import Perfil from "../Components/Perfil";
import SerchUser from "../Components/SerchUser";
import Addpublic from "../Components/Addpublic";

export const MenuItems = [

  {
    id: 1,
    path: '/',
    title: 'login',
    component: Login,
  },
  {
    id: 2,
    path: '/RegisterClass',
    title: 'RegisterClass',
    component: RegisterClass,
  },
  {
    id: 3,
    path: '/Perfil',
    title: 'Perfil',
    component: Perfil,
  }, 
  {
    id: 4,
    path: '/SerchUser',
    title: 'SerchUser',
    component: SerchUser,
  },
  {
    id: 5,
    path: '/Addpublic',
    title: 'Addpublic',
    component: Addpublic,
  }
];