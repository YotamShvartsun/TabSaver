import {html, define} from 'hybrids';
import { openUrl } from '../api/tabsApi';

export function openTab(caller)
{
    openUrl(caller.url, true);
}

export const Tab = {
    url: '',
    render: (url)=>{
        Tab.url = url;
        return html`<button onclick="${openTab}"><p>${url}</p></button>`;
    }
}
define('tab', Tab);