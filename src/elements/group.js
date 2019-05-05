import {html, define} from 'hybrids';
import * as Tab from './tab';
import {Loader} from '../api'

export function getUrls(id)
{
    console.log('in getUrls')
    let db = new Loader();
    let value = [];
    db.GetBySaveID(id).then(res=>{
        value = res
        console.log(res);
        }
    );
    return value;
}

export const Group = {
    group: '',
    render: ({group})=>{
        console.trace('in render');
        return html`${getUrls(group).map((tab)=>`<tab-url url="${tab.url}></tab-url>`)}`
    }
}
