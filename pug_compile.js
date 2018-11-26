const fs = require('fs');
const path = require('path');
const pug = require('pug');

compilePug('src');

function walk(dir, done) {
    let results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        let pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
}

function compilePug(path) {
    walk(path, (err, list) => {
        if (err) {
            return;
        }

        list.forEach(filePath => {
            const match = filePath.match(/^(.+\/)(\w+)\.pug$/);
            if (match) {

                const jsFunctionString = pug.compileFileClient(filePath, {
                        name: "render" + match[2],
                        exportMixins: true,
                        compileDebug: false
                    })
                    + ` export default render${match[2]};`;

                fs.writeFileSync(match[1] + match[2] + ".pug.js", jsFunctionString);
            }
        })
    })
}

if (require.main === module) {
    compilePug(process.argv[2])
} else {
    module.exports = compilePug;
}
