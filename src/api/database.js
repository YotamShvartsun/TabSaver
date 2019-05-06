/* eslint-disable no-console */
import PouchDB from 'pouchdb-browser';

let instance;

export class Loader {
    constructor() {
        if (instance) {
            return instance;
        }
        if (this.dbHandler == null) {
            this.dbHandler = new PouchDB('tabsDb');
            this.dbHandler.info().then((info) => {
                console.table(info);
            });
        }
        instance = this;
    }

    async GetBySaveID(saveID) {
        let result = null;
        try {
            result = await this.dbHandler.get(saveID);
        } catch (err) {
            console.error(err);
        }
        return result;
    }

    async InsertNew(savename, _tabs) {
        await this.dbHandler.put({ _id: savename, tabs: _tabs });
    }

    async DeleteUrlFromGroup(groupId, url) {
        const doc = await this.dbHandler.get(groupId);
        await this.dbHandler.put({
            // eslint-disable-next-line no-underscore-dangle
            _id: doc._id,
            // eslint-disable-next-line no-underscore-dangle
            _rev: doc._rev,
            tabs: doc.tabs.filter(tab => tab.url !== url),
        });
    }
}
export default {
    LoaderClass: Loader,
};
