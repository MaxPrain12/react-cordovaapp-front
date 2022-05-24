import RegisterClass from "../Components/RegisterClass";
import Login from "../Components/Login";
import Perfil from "../Components/Perfil";
import GamePublish from "../Components/GamePublish";
import Addpublic from "../Components/Addpublic";
import FindUser from "../Components/FindUser";
import ConfigPerf from "../Components/ConfigPerf";


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
    path: '/GamePublish',
    title: 'GamePublish',
    component: GamePublish,
  },
  {
    id: 5,
    path: '/FindUser',
    title: 'FindUser',
    component: FindUser,
  },
  {
    id: 6,
    path: '/Addpublic',
    title: 'Addpublic',
    component: Addpublic,
  },
  {
    id: 7,
    path: '/configperf',
    title: 'Editar Perfil',
    component: ConfigPerf
  }

];