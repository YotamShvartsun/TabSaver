import { html, dispatch } from 'hybrids';
import { openUrl } from '../api/tabsApi';

export function openTab(caller) {
    openUrl(caller.url, false);
}

export function OnremoveDispatch(host) {
    dispatch(host, 'remove');
}

export const Tab = {
    url: '',
    render: ({ url }) => html`
        <button onclick="${openTab}">open ${url}</button>
        <div onclick=${OnremoveDispatch}>
        <img src="../../../assets/x.svg"></img>
        </div>`,
};
