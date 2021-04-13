const readline = require('readline');
const Messages = require('./messages');
const Document = require('./document');
const Directory = require('./directory');


const dir = new Directory();

let interface = readline.createInterface(process.stdin,process.stdout);

const tools = `Comandos :q = salir, :sa = guardar como, :s = guardar
==================================================================`;

const pantalla = `
                ================
                Editor de texto.\n
                ================
                Elige una opcion:\n
                1 Crear nuevo documento
                2 Abrir documento
                3 Cerrar editor\n>`;

mainScreen();

function mainScreen(){
    process.stdout.write('\033c');

    interface.question(pantalla,res=>{
        switch (res.trim()) {
            case '1':
                    createFile();
                break;
        
            case '2':
                    openFileInterface();
                break;
            case '3':
                    interface.close();
                break;      
            
            default:
                mainScreen()
        }
    });


function createFile(){
    //Creamos el archivo
    let file=new Document(dir.getPath());

    //Renderizar la interface
    renderInterface(file);
    renderCommands(file);
}

function openFileInterface(){
    let file = new Document(dir.getPath());
    dir.getFilesInDir();
}


function renderInterface(file, mesaje){
    //Limpiando la pantalla
    process.stdout.write('\033c');

    (file.getName() == '') ? console.log(`| Untitled |`) : console.log(`| ${file.getName()} |`);

    console.log(tools);

    if(mesaje != null) console.log(mesaje);
    console.log(file.getContent())
}

function renderCommands(file){
    interface.on('line', input=>{
        switch (input.trim()) {
            case ':sa':
                saveas(file);
                break;
            case ':q':
                interface.removeAllListeners('line');
                mainScreen();
                break;
            case ':s':
                save(file);
                break;
            default:
                file.append(input.trim());
        }
    });
}


function saveas(file){
    interface.question(Messages.requestFileName, name=>{
        if(file.exists()){
            console.log(Messages.fileExists);
            interface.question(Messages.replaceFile,confirm=>{
                if(confirm='y'){
                    file.saveas(name);
                    renderInterface(file,Messages.fileSaves + '\n');
                }else{
                    renderInterface(file,Messages.fileNotSaves + '\n')
                }
            })
        }else{
            //El archivo no existe y se tiene que crear
            file.saveas(name);
            renderInterface(file, Messages.fileSaves + '\n');
        }
    });
}

function save(file){
    if(file.hasName()){
        file.save();
        renderInterface(file,Messages.fileSaves + '\n');
    }else{
        saveas(file);
    }
}



}