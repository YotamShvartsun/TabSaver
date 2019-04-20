/***
 * @description class for handling the database
 */

 export class Loader{
    constructor()
    {
        this.db = openDatabase('tabsdb', '1.0', 'tabs', 2 * 1024 * 1024);
        if(!this.db)
            throw Error("Unable to open database");
        // create the tables
        this.db.transaction((tx)=>{
            tx.executeSql('CREATE TABLE IF NOT EXISTS tabs (id INT primary key autoincrement, url text, group int not NULL);')
            tx.executeSql('CREATE TABLE IF NOT EXISTS groups (id INT primary key autoincrement, name text, date int not null);')
        });
    }
    /***
     * @description get all urls in a group
     * @param saveId id of the group
     * @param callback callback for result
     */
    GetBySaveID(saveId, callback)
    {
        let result = [];
        this.db.transaction((tx)=>{
            tx.executeSql('SELECT * FROM TABS WHERE group = ?;', [saveId], (tx, res)=>{
                for(let obj of res.rows)
                {
                    result.push({url: obj['url']});
                }
                callback(result);
            }, (err)=>{
                console.error(`error while getting data from db ${err}`);
            });
        });
    }
    /***
     * @description get all groups saved
     * @param callback callback for result
     */
    GetAllGroups(callback)
    {
        let result = [];
        this.db.transaction((tx)=>{
            tx.executeSql('SELECT * from groups;', [], (tx, res)=>{
                for(let obj of res.rows)
                {
                    result.push({id: obj['id'], name: obj['name'], date: obj['date']});
                }
                callback(result);
            }, (err)=>{
                console.error(err);
            });
        });
    }
    /***
     * @description returns the urls for a group, if exists
     * @param groupName name of the group
     * @param callback callback for result
     */
    GetGroupByName(groupName, callback)
    {
        this.db.transaction((tx)=>{
            tx.executeSql('SELECT id from groups where name = ?', [groupName], (tx, res)=>{
                if(res.rows.lenght != 1) // two groups with the same id
                    throw Error('Error while reading from database');
                this.GetGroupByName(res.rows[0]['id'], callback);
            });
        });
	}
	/***
	 * @description create a new group with tabs
	 */
    InsertNew(group, tabs)
    {
        this.db.transaction((tx)=>{
            tx.executeSql('INSERT INTO groups (name, date) values (?,?)', [group.name, group.date]);
            for(tab of tabs)
            {
				tx.executeSql('insert into tabs (url, group) values (?, select max(id) from groups)', [tab.url]);
            }
        })
    }
}