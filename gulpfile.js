var gulp = require('gulp');
var del = require('del');
var flatten = require('gulp-flatten');
var es = require('event-stream');
var fs = require('fs');
var path = require('path');

var fileRoot = 'C:/work/dev-tools/XPlatform/Main/';
var dataSourceRoot = "C:/Users/rstoffers/Documents/GitHub/igniteui-datasources/";
var exp = [];

function clean(cb) {
    del.sync("src/ig/**/*.*");
    del.sync("src/ig");
    cb();
}
function copyStatic() {
    return gulp.src([
        fileRoot + 'Source/TSCore/*.ts',
        fileRoot + 'Source/RCore/*.ts',
        fileRoot + 'Source/RCore/*.tsx'
    ])
    .pipe(gulp.dest("src/ig/igniteui-core"));
}
function copy() {
    return gulp.src([
        fileRoot + 'Source/Translator/bin/build/TS/**/*.ts',
        fileRoot + 'Source/Translator/bin/build/React/**/*.ts',
        fileRoot + 'Source/Translator/bin/build/React/**/*.tsx',
        fileRoot + 'Source/*.JS/**/bin/**/TS/**/*.ts',
        fileRoot + 'Source/*.JS/**/bin/**/React/**/*.ts',
        fileRoot + 'Source/*.JS/**/bin/**/React/**/*.tsx',
        //"!" + fileRoot + 'Source/Excel.JS/**/*.ts',
        //"!" + fileRoot + 'Source/Documents.Core.JS/**/*.ts',
        //"!" + fileRoot + 'Source/Spreadsheet.JS/**/*.ts',
        //"!" + fileRoot + 'Source/Spreadsheet.ChartAdapter.JS/**/*.ts',
        //"!" + fileRoot + 'Source/Undo.JS/**/*.ts',
        "!" + fileRoot + "Source/**/public_api.*.ts"
    ])
    .pipe(flatten({ includeParents: -1 }))
    .pipe(gulp.dest("src/ig"))
    .on("end", function () {
        

        del.sync("src/ig/igniteui-spreadsheet");
        del.sync("src/ig/igniteui-spreadsheet-chart-adapter");
        //del.sync("src/ig/igniteui-gauges");
        //del.sync("src/ig/igniteui-maps");
        del.sync("src/ig/igniteui-testframework");
        del.sync("src/ig/igniteui-fdc3");
        del.sync("src/ig/igniteui-webinputs");
        del.sync("src/ig/igniteui-webgrids");
        // del.sync("src/ig/igniteui-grids");
        del.sync("src/ig/igniteui-excel");
        // del.sync("src/ig/igniteui-layouts");

        //del.sync("src/ig/igniteui-charts");
        
        //generateIndexes();
    });
}

function indexes() {
    return gulp.src([__dirname + '/src/ig/**/*.ts'])
        .pipe(buildIndexes())
        .on("end", () => {
            generateIndexes();
        })
}

function isValidChar(char) {
    return char !== ' ' && char !== '<' && char !== '\n' && char !== '\r' && char !== '(' && char !== '*' && char !== '}';
}

function buildIndexes() {
    return es.map((file, cb) => {
        if (fs.existsSync(file.path) && !file.path.includes("_combined")) {
            //console.log("processing file: " + file.path);
            const package = path.basename(path.dirname(file.path));
            var content = fs.readFileSync(file.path).toString();
            
            processExportType(file, content, "export class ", package);
            processExportType(file, content, "export enum ", package);
            processExportType(file, content, "export function ", package);
            processExportType(file, content, "export {", package);
        }
        cb(null, file);
    });
}

function processExportType(file, fileContent, signature, package) {
    let idx = fileContent.indexOf(signature, 0);
    while (idx > 0) {
        idx += signature.length;
        let exportName = "";
        while (idx < fileContent.length && isValidChar(fileContent.charAt(idx))) {
            exportName += fileContent.charAt(idx);
            idx++;
        }
        if (exportName.length > 0) {
            let packageExists = false;
            for (let i = 0; i < exp.length; i++) {
                if (exp[i].package === package) {
                    exp[i].exports.push({
                        name: exportName,
                        file: file.basename.replace(".ts", ""),
                    });
                    packageExists = true;
                }
            }
            if (!packageExists) {
                console.log("package not found. creating new package entry: " + package);
                exp.push({
                    package: package,
                    exports: [{ name: exportName, file: file.basename.replace(".ts", "")}]
                });
            }
        }

        idx = fileContent.indexOf(signature, idx);
    }
}

function generateIndexes() {
    for (let i = 0; i < exp.length; i++) {
        //console.log("processing package: " + exp[i].package);
        if (fs.existsSync(path.join(__dirname, "src/ig", exp[i].package))) {
            let indexContent = "";
            for (let j = 0; j < exp[i].exports.length; j++) {
                if (exp[i].exports[j].name === `"`) {
                    continue;
                }
                indexContent += `export { ${exp[i].exports[j].name} } from './${exp[i].exports[j].file}';
`;
            }
            fs.writeFileSync(path.join(__dirname, "src/ig", exp[i].package, "index.ts"), indexContent);
        }
    }
}

function copyDatasource() {
    return gulp.src([dataSourceRoot + '*.ts'])
        .pipe(gulp.dest("src/ig/igniteui-datasources"));
}

exports.clean = clean;
exports.default = gulp.series(clean, gulp.parallel(copyStatic, copyDatasource, copy), indexes);
exports.idx = gulp.series(indexes);
