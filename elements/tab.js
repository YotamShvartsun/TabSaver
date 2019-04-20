import {html, define} from 'hybrids';
import { openUrl } from '../api/tabsApi';

function openTab(caller)
{
    openUrl(caller.url, true);
}

export default Tab = {
    url: '',
    render: (url)=>{
        Tab.url = url;
        return html`<button onclick="${openTab}"><p>${url}</p></button>`;
    }
}