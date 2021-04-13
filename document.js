const fs = require('fs');
const os = require('os')

class Document{

    constructor(dir){
        this._constent = '';
        this._isSaved = false;
        this._filname = '';
        this._dir = dir;
    }

    exists(name){
        return fs.existsSync(`${this._dir}/${name}`);
    }

    append(text){
        this._content += os.EOL+text;
        this._isSaved = false;
    }

    saveas(name){
        fs.writeFileSync(`${this._dir}/${name}`,this._constent);

        this._isSaved = true;
        this._filname = name;
    }

    save(){
        fs.writeFileSync(`${this._dir}/${this._filname}`,this._constent);

        this._isSaved = true;
        this._filname = this._filname;
    }

    getContent(){
        return this._constent;
    }

    hasName(){
        if(this._filname != ''){
            return true;
        }else{
            return false;
        }
    }

    getName(){
        return this._filname;
    }

    isSaved(){
        return this._isSaved;
    }

    open(name){
        this._content = fs.readFileSync(`${this._dir}/${name}`, 'utf-8');
        this._filname = name;
        this._isSaved = true;
        return this._content;
    }

}

module.exports = Document;