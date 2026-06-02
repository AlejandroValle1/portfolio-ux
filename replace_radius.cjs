const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('c:/Users/ale_v/Desktop/Ale/portfolio-ale-valle/src');
let totalReplaced = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    content = content.replace(/borderRadius:\s*'32px'/g, "borderRadius: 'var(--radius-card)'");
    content = content.replace(/borderRadius:\s*'24px'/g, "borderRadius: 'var(--radius-inner)'");
    content = content.replace(/borderRadius:\s*'50px'/g, "borderRadius: 'var(--radius-pill)'");
    content = content.replace(/borderRadius:\s*'12px'/g, "borderRadius: 'var(--radius-small)'");

    if (content !== original) {
        fs.writeFileSync(file, content);
        totalReplaced++;
    }
});

console.log('Reemplazo de radius completado en ' + totalReplaced + ' archivos');
