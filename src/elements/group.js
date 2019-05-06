/* eslint-disable no-console */
import { html } from 'hybrids';
import { Loader } from '../api';

export function getUrls(id) {
    if (id === '') {
        return new Promise((resolve, reject) => {
            if (id !== '') {
                reject();
            }
            resolve({ tabs: [] });
        });
    }
    console.log('in getUrls');
    console.log(id);
    const db = new Loader();
    return db.GetBySaveID(id);
}
export function OnRemoveTab(host, { target }) {
    console.log(target);
    const db = new Loader();
    const idTmp = host.group;
    db.DeleteUrlFromGroup(host.group, target.url).then(() => {
        // eslint-disable-next-line no-param-reassign
        host.group = '';
        // eslint-disable-next-line no-param-reassign
        host.group = idTmp;
    });
}

export const Group = {
    group: '',
    render: ({ group }) => {
        const data = getUrls(group);
        return html`
        <div style="border:1px solid black;">
        <p>${group}</p>
        ${html.resolve(
        data.then(({ tabs }) => html`${tabs.map(tab => html`<tab-url url="${tab.url}" onremove=${OnRemoveTab}></tab-url>`)}`).catch((err) => {
            console.error(err);
            return html`Oops! there is an error!`;
        }),
        html`...`,
    )}
        <div>
        `;
    },

};
