import Addpublic from "../Components/Addpublic";
import Perfil from "../Components/Perfil";
import Login from "../Components/Login";

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
      path: '/Addpublic',
      title: 'PUBLICAR',
      component: Addpublic,
      icon: <ion-icon name="add-circle-outline" class="IconoFooterBar"></ion-icon>
    },
    {
      id: 3,
      path: '/Perfil',
      title: 'PERFIL',
      component: Perfil,
      icon: <ion-icon name="person-circle-outline" class="IconoFooterBar"></ion-icon>
    }
  ];