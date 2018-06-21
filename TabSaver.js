var page = "popup.html";
var html = '';


function str2arryParser(input_Local_Storage_string) {
    return JSON.parse(input_Local_Storage_string);
}
function Is_In_Array(_Array, CheckItem) {
    for (var Array_Item in _Array) {
        if (_Array[Array_Item] === CheckItem) {
            return true;
        }
    }
    return false;
}
function Delete_From_Array(Value, _Array) {
    _Array = _Array.filter(function (item) {
        return item !== Value;
    });
    console.log(_Array);
    return _Array;
}


function save() {
    document.body.innerHTML = '';
    html = '<button class="btn btn-success button"id=Home style="padding:1px 6px">Main Menu</button><p class=text-primary style=white-space:n-resize>Name Your Saved Tabs(Without commas in the Name!) You can save you tabs by date, name, or both name and date.<p class="text-primary text"id=Staus></p><select class=form-control id=SaveType style=white-space:nowrap><option value=Nameonly>By User Input<option value=DateOnly>By Time Stamp Only<option value=NameAndDate>By User Input And Time Stamp</select><input class=form-control id=Save_Name> <button class="btn btn-primary"id=Save_Btn>Save your Tabs!</button>';
    $("body").html(html);
    $("#SaveType").css('width', 'auto')
    $("#Save_Btn").click(function () {
        Save_All();
    });
    $("#Home").click(function () {
        popup()
    });
    $("#SaveType").change(function () {
        GetName();
    });
    function Save_All() {
        var queryInfo = {
            currentWindow: true
        };
        var query = chrome.tabs.query(queryInfo, getalltabs);
    }
    function getalltabs(Tabs) {
        var tabsUrls = [];
        for (var i in Tabs) {
            tabsUrls.push(Tabs[i].url);
        }
        Tab_Save(tabsUrls);
    }
    function Tab_Save(tabs) {
        var name = GetName();
        try {
            var Saves = JSON.parse(localStorage["Saves"]);
            if ((Is_In_Array(Saves, name))) {
                $("#Staus").text("You alredy Used this Name, Change the name or delete the previos Save in this name!");
                throw 'Error';
            }
        } catch (e) {
            if (e != 'Error') {
                Saves = [];
            } else {
                throw 'Error';
            }
        }
        Saves.push(name);
        localStorage[name] = JSON.stringify(tabs);
        localStorage["Saves"] = JSON.stringify(Saves);
        popup();
    }
    function GetName() {
        var Save_Name_Input = $("#Save_Name");
        Save_Name_Input.prop("disabled", true);
        var name = Save_Name_Input.val();
        var Select = $("#SaveType");
        var Date = GetDate();
        switch (Select.val()) {
            case "Nameonly":
                {
                    Save_Name_Input.prop("disabled", false);
                    Save_Name_Input.val("");
                    return name;
                }
            case "DateOnly":
                {
                    Save_Name_Input.val(Date);
                    return Date;
                }
            case "NameAndDate":
                {
                    Save_Name_Input.val(name + ' ' + Date);
                    return name + ' ' + Date;
                }
        }
    }
    function GetDate() {
        var _Date = new Date();
        var Year = _Date.getFullYear();
        var Month = (_Date.getMonth() + 1) % 12;
        var Day = _Date.getDate();
        var Hour = _Date.getHours();
        var Minutes = _Date.getMinutes();
        var String_Date = Day.toString() + '/' + Month.toString() + '/' + Year.toString() + ' Time:' + Hour.toString() + ':' + Minutes.toString();
        return String_Date;
    }
}


function read() {
    var deletebtn, div, openbtn, editbtn;
    var SavesArray;
    var NumberOfTabs = 0;
    document.body.innerHTML = '';
    html = '<button id=Home>Main Menu</button><p class=text-primary id=Status style=white-space:no-warp>';
    $("body").html(html);
    $("#Home").click(function () {
        popup()
    });
    $("#Home").addClass("button btn btn-success");
    var Saves = localStorage["Saves"];
    if (typeof (Saves) === 'undefined') {
        $("#Status").text("You Don't Have Any Saved Tabs!");
        $("#Status").css("white-spaces", "nowarp");
        
    }
    else{
        SavesArray = str2arryParser(Saves);
        for(var i in SavesArray)
        {
            HTML_creator.call(this,i);
        }
    }
    function HTML_creator(btn_Number) {
        div = $("<div></div>").addClass("div");
        editbtn = $("<button></button>").text(SavesArray[btn_Number]).addClass("btn btn-info button").css("padding", "1px 6px", "important");
        openbtn = $("<button></button>").text(SavesArray[btn_Number]).addClass("btn btn-primary button").css("padding", "1px 6px", "important");
        openbtn.click(function () {
            Tabs_Read(btn_Number);
        });
        editbtn.click(function () {
            localStorage["SaveNameToEdit"] = JSON.stringify(SavesArray[btn_Number]);
            edit(SavesArray[btn_Number]);
        });
        deletebtn = $("<button></button>").text("Delete " + SavesArray[btn_Number]).addClass("btn btn-warning").css("padding", "1px 6px", "important");
        deletebtn.click(function () {
            Delete_Save(btn_Number);
        });
        div.append(openbtn, deletebtn, editbtn);
        $("body").append(div);
    }
    function Delete_Save(Save_Number) {
        localStorage["TabSaver!!_Args"] = JSON.stringify(Save_Number);
        localStorage["TabSaver!!_Action"] = JSON.stringify("delete this save?");
        deletepage();
    }
    function Tabs_Read(Save_Number) {
        var Save_Name = SavesArray[Save_Number];
        if (!Is_In_Array(SavesArray, SavesArray[Save_Number])) {
            document.getElementById("Status").innerHTML = "Problem!";
            throw '';
        }
        var Tabs = str2arryParser(localStorage[Save_Name]);
        if (Tabs.length === 0) {
            document.getElementById("Status").innerHTML = "Problem!";
            throw '';
        }
        for (var x in Tabs) {
            var TabUrl = Tabs[x].toString();
            chrome.tabs.create({
                url: TabUrl,
                active: false
            });
            NumberOfTabs++;
        }
        CloseFirstTab();
        
    }
    function CloseFirstTab() {
        var queryInfo = {
            currentWindow: true
        };
        var query = chrome.tabs.query(queryInfo, closefirst);
    }
    function closefirst(Tabs) {
        if (Tabs.length - NumberOfTabs === 1) {
            if (Tabs[0].url === "chrome://newtab/") {
                chrome.tabs.remove(Tabs[0].id, function(){});
            }
        }
        else
        {
            chrome.tabs.update(Tabs[Tabs.length - 1].id, {
                selected: true
        });
    }
    }
    function Find_index_in_Array(_Array, item) {
        for (i in _Array) {
            if (_Array[i] === item)
                return i;
        }
        return -1;
    }
}


function edit(saveName) {
    document.body.innerHTML = '';
    html = '<body class=container><p class=text-info id=SaveName>Edit</p><button class="btn btn-info button"id=changename>Rename this save</button>';
    $("body").html(html);
    var Save = JSON.parse(localStorage[saveName]);
    var removed = 0;
    $("#SaveName").text("Edit " + saveName + ":").click(function () {
        read();
    });
    Generate();
    function Rename() {
        var Newname = $("#NameInput").val();
        var Saves = JSON.parse(localStorage.Saves);
        localStorage[Newname] = JSON.stringify(Save);
        localStorage.removeItem(saveName);
        Saves = Saves.filter(function (e) {
            return e !== JSON.parse(saveName)
        });
        Saves.push(Newname);
        localStorage["Saves"] = JSON.stringify(Saves);
        read();
    }
    function Generate() {
        var input = $("<input type=\"text\"></input>").addClass("form-control").attr("id", "NameInput");
        $("body").append(input);
        $("#changename").click(Rename);
        for (var item in Save) {
            btns(item);
        }
    }
    function btns(item) {
        var removespan, urllink, continer = $("<div></div>").addClass("div");
        urllink = $("<a></a> ").text(Save[item]).click(function () {
            chrome.tabs.create({
                url: Save[item],
                active: true
            });
        }).attr("id", item);
        var svgimage = $("<img src=\"/x.svg\"></img>").on("click", function () {
            Remove(item);
        }).attr("id", "remove" + item).css("padding", "0px 10px", "!important");
        continer.append(urllink, svgimage);
        $("body").append(continer);
    }
    function Remove(saveitem) {
        $("#" + saveitem).remove();
        $("#remove" + saveitem).remove();
        Save = Save.filter(function (Saveitem) {
            return Saveitem !== Save[saveitem - removed];
        });
        localStorage[JSON.parse(localStorage["SaveNameToEdit"])] = JSON.stringify(Save);
        removed++;
    }
}


function deletepage() {
    document.body.innerHTML = '';
    html = '<div style=white-space:nowrap><p class=text-primary id=Action></div><button class="btn button btn-primary"id=Yes>Yes</button> <button class="btn button btn-warning"id=No style="padding:5px 5px">No</button>';
    $("body").html(html);
    function getfromlocalstorge(name) {
        return JSON.parse(localStorage[name]);
    }
    var str = "Are you sure you want to" + ' ' + getfromlocalstorge("TabSaver!!_Action");
    $("#Action").text(str);
    var Yes = $("#Yes");
    var No = $("#No");
    No.click(function () {
        window.close();
    });
    if (JSON.parse(localStorage["TabSaver!!_Action"]) === "Reset Tab Saver?") {
        Yes.click(function () {
            localStorage.clear();
            window.close();
        });
    } else {
        var Save_Number = JSON.parse(localStorage["TabSaver!!_Args"]);
        Yes.click(function () {
            var Saves = JSON.parse(localStorage.Saves);
            var SaveName = Saves[Save_Number];
            Saves = Delete_From_Array(Saves[Save_Number], Saves);
            if (Saves.length !== 0) {
                localStorage.removeItem(SaveName);
                localStorage["Saves"] = JSON.stringify(Saves);
            } else {
                localStorage.clear();
            }
            window.close();
        });
    }
}


function imex() {
    document.body.innerHTML = '';
    html = '<button class="btn btn-success button"id=home>Back</button><div style=white-space:nowrap><button class="btn btn-primary"id=im>Import file</button> <button class="btn btn-primary"id=ex>Export to file</button></div>';
    $("body").html(html);
    $("#ex").click(function () {
        tabexportpage();
    });
    $("#im").click(function () {
        importpage();
    });
    $("#home").click(function () {
        popup();
    });
}


function importpage() {
    document.body.innerHTML = '';
    html = '<button class="btn btn-success button"id=home>Back</button> <button class="btn btn-primary"id=inf>Choose file to import from</button> <input accept=.json id=fileinput type=file>';
    $("body").html(html);
    $("#home").click(function () {
        popup();
    });
    var inf = $("#inf");
    var fileimp = $("#fileinput");
    fileimp.hide();
    var Saves;
    fileimp.change(Import);
    inf.click(function () {
        fileimp.click();
    });
    function Import(e) {
        if (localStorage.getItem("Saves") !== null) {
            Saves = str2arryParser(localStorage.Saves);
        } else {
            Saves = [];
        }
        var files = e.target.files
            , reader = new FileReader();
        reader.onload = () => {
            AddTostorage(JSON.parse(reader.result));
        }
            ;
        reader.readAsText(files[0]);
    }
    function AddTostorage(Json) {
        for (s in Json) {
            if (localStorage.getItem(s) === null) {
                if (s !== "TabSaver!!_Args" && s !== "TabSaver!!_Action") {
                    localStorage[s] = Json[s];
                    if (s !== "Saves") {
                        Saves.push(s);
                    }
                }
            } else {
                var localsaves = str2arryParser(localStorage[s]);
                var importedsaves = Json[s];
                if (typeof (localsaves) !== Object) {
                    console.warn("Problem getting saves from file! f:AddToStorage");
                } else {
                    for (y in importedsaves) {
                        if (Is_In_Array(localsaves, importedsaves[y])) {
                            console.log(importedsaves[y] + "is in Saves");
                        } else {
                            localsaves.push(importedsaves[y]);
                        }
                    }
                    localStorage[i] = JSON.stringify(localsaves);
                }
            }
        }
        localStorage.Saves = JSON.stringify(Saves);
    }
}


function tabexportpage() {
    document.body.innerHTML = '';
    html = '<button class="btn button btn-success"id=b style=white-space:nowrap>Back to Main Menu</button><p class=text-info id=action><p class=text-info>Export your tabs by:<div><label><input class=radio id=date name=filename type=radio>Date</label><br><label><input class=radio id=name name=filename type=radio checked>Name</label></div><input class=form-control id=Name style=width:auto value="Name your file"> <button class="btn button btn-primary"id=download>Download</button>';
    $("body").html(html);
    $("#b").click(function () {
        popup();
    });
    $("#date").change(datechange);
    $("#name").change(namechange)
    function Export() {
        var mylink = $("<a><a>");
        var blob = new Blob([JSON.stringify(localStorage)], {
            type: "application/json"
        });
        var Name = $("#Name").val() + ".json";
        var url = window.URL.createObjectURL(blob);
        mylink.attr("href", url);
        mylink.attr("download", Name);
        mylink[0].click();
        $("#action").text("You successfully exported your saves.The file is in your downloads folder now.");
    }
    $("#download").click(Export);
    function datechange() {
        if ($("#date").is(":checked")) {
            $("#Name").val("Saves from " + GetDate());
            $("#Name").prop("disabled", true);
        }
    }
    function namechange() {
        if ($("#name").is(":checked"))
        {
            $("#Name").val("Name your file");
            $("#Name").prop("disabled", false);
        }
    }
    function GetDate() {
        var _Date = new Date();
        var Year = _Date.getFullYear();
        var Month = (_Date.getMonth() + 1) % 12;
        var Day = _Date.getDate();
        var String_Date = Day.toString() + '-' + Month.toString() + '-' + Year.toString();
        return String_Date;
    }
}


function popup() {
    document.body.innerHTML = '';
    html = '<button class="btn btn-primary"id=Save style="padding:5px 5px;margin:15px">Save All Tabs</button> <button class="btn btn-primary"id=Restore style="padding:5px 5px;margin:15px">Open Your Saved Tabs</button> <button class="btn btn-primary"id=imex style="padding:5px 5px;margin:15px">Import/Export tabs</button>';
    $("body").html(html);
    $("#Save").click(function () {
        save();
    });
    $("#Restore").click(function () {
        read();
    });
    $("#imex").click(function () {
        imex();
    });
}


$(function () {
    popup();
});
