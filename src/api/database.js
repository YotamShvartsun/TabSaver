import PouchDB from 'pouchdb-browser';

export class Loader
{
    constructor()
    {
        this.dbHandler = new PouchDB('tabsDb');
        this.dbHandler.info().then((info)=>{
            console.log(info);
        });
        // no need for init?
    }
    async GetBySaveID(saveID)
    {
        let result = await this.dbHandler.get(saveID);
        console.log(result);
        return result;
    }
    async InsertNew(savename, tabs)
    {
        await this.dbHandler.put({_id:savename, tabs:tabs});
    }
}