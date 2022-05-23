import Addpublic from "../Components/Addpublic";
import Perfil from "../Components/Perfil";
import Login from "../Components/Login";
import GamePublish from '../Components/GamePublish';
import FindUser from "../Components/FindUser";

export const FooterItems = [
    {
      id: 1,
      path: '/',
      title: 'HOME',
      component: Login,
      icon: <ion-icon name="home-outline" class="IconoFooterBar"></ion-icon>
    },
    {
      id: 2,
      path: '/FindUser',
      title: 'BUSCAR',
      component: FindUser,
      icon: <ion-icon name="person-add-outline" class="IconoFooterBar"></ion-icon>
    },
    {
      id: 3,
      path: '/Addpublic',
      title: 'PUBLICAR',
      component: Addpublic,
      icon: <ion-icon name="add-circle-outline" class="IconoFooterBar"></ion-icon>
    },
    {
      id: 4,
      path: '/GamePublish',
      title: 'GAMES',
      component: GamePublish,
      icon: <ion-icon name="game-controller-outline" class='IconoFooterBar'></ion-icon>
    },
    {
      id: 5,
      path: '/Perfil',
      title: 'PERFIL',
      component: Perfil,
      icon: <ion-icon name="person-circle-outline" class="IconoFooterBar"></ion-icon>
    }
  ];