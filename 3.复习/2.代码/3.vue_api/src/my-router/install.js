
import RouterLink from './components/link';
import RouterView from './components/view';
export default function(Vue){
    Vue.component(RouterView.name,RouterView);
    Vue.component(RouterLink.name,RouterLink);
}