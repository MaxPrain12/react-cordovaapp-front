import ConfigPerf from "../Components/ConfigPerf";
import ChangePerfPhoto from "../Components/ChangePerfPhoto";


export const CMenu = [

    {
      id: 1,
      path: '/configperf',
      title: 'Editar Perfil',
      component: ConfigPerf,
      icon: <ion-icon name="settings-outline" size='large' className='iconsegg'></ion-icon>
    },
    {
      id: 2,
      path: '/changeperfphoto',
      title: 'Cambiar Foto de Perfil',
      component: ChangePerfPhoto,
      icon: <ion-icon name="create-outline" size='large' className='iconsegg'></ion-icon>
    }

  ];