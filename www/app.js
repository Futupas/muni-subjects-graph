'use strict';

/*
TODO List:

1. Refactor DATA
2. Refactor isSmallInBig
3. CHeck on bigger data
4. PushIfNeeded function
5. Contains function
6. Draw Souhlas and other stuff like that
7. And/Or in prerequisites
8. CSS improvements

*/


const SHOW_ONLY_DEPENDENCIES = true;

const main = document.getElementById('main');

function getAllPrerequisitesSubjects(prerequisites) {
    const allSubjects = [];

    function parseNode(node) {
        if (!node) {
            console.warn('Undefined node');
            return;
        }

        if (node.modifier) {
            for (const newNode of node.values) {
                parseNode(newNode);
            }
        } else if (node.code) {
            const code = node.code;
            // We remove NOTs to avoid circular dependency
            if (node.not !== true && !allSubjects.find(x => x === code)) allSubjects.push(code);
        } else {
            console.warn('Unknown node', node);
        }
    }

    parseNode(prerequisites);

    return allSubjects;
}

function isSmallArrayInBig(small, big) {
    // This is a VERY BAD implementation, but this is enogh for our purposes
    for (const x of small) {
        if (!big.find(y => y === x)) return false;
    }
    return true;
}

function prepareData(data) {
    data = JSON.parse(JSON.stringify(data)); // Deep clone

    // Get ALL nodes
    {
        function parseNode(node) {
            if (!node) {
                console.warn('Undefined node');
                return;
            }
    
            if (node.modifier) {
                for (const newNode of node.values) {
                    parseNode(newNode);
                }
            } else if (node.code) {
                const code = node.code;
                // We remove NOTs to avoid circular dependency
                if (node.not !== true && !data[code]) {
                    data[code] = {
                        code,
                        name: code,
                    };
                }
            } else {
                console.warn('Unknown node', node);
            }
        }

        for (const code in data) {
            const subject = data[code];
            parseNode(subject.prerequisites);
        }
    }

    // prerequisites array (both directions)
    for (const code in data) {
        const subject = data[code];
        subject.code = code;

        const allPrerequisutes = getAllPrerequisitesSubjects(subject.prerequisites).filter(x => x !== code);
        subject.prerequisitesArray = allPrerequisutes; // allPrerequisutes.filter(x => data[x]);

        for (const prerequisite of allPrerequisutes) {
            const prerequisiteSubject = data[prerequisite];
            if (!prerequisiteSubject) continue; // SOUHLAS etc

            //prerequisiteSubject.isPrerequisiteFor is just for look to. Dont use it to draw a graph

            if (!prerequisiteSubject.isPrerequisiteFor) {
                prerequisiteSubject.isPrerequisiteFor = [ code ];
            } else if (!prerequisiteSubject.isPrerequisiteFor.find(x => x === code)) {
                prerequisiteSubject.isPrerequisiteFor.push(code);
            }
        }
    }

    if (SHOW_ONLY_DEPENDENCIES) {
        for (const code of Object.keys(data)) {
            const subject = data[code];
            if (!subject.prerequisitesArray?.length && !subject.isPrerequisiteFor?.length) {
                delete data[code];
            }
        }
    }

    // Make and/or graph
    {
        let currentNodeId = 0;
        function parseNode(node, parent, codeToAvoid) {
            if (!node) {
                console.warn('Undefined node');
                return;
            }

            if (node.modifier) {
                node.code = node.modifier + '_' + (++currentNodeId);
                node.name = node.modifier;

                data[node.code] = node;
                node.prerequisitesArray = [];
                parent.prerequisitesArray.push(node.code);

                for (const childNode of node.values) {
                    if (childNode.code !== codeToAvoid) {
                        parseNode(childNode, node, codeToAvoid);
                    }
                }

                return node;
            } else if (node.code) {
                // We remove NOTs to avoid circular dependency
                if (node.not !== true && node.code !== codeToAvoid) {
                    parent.prerequisitesArray.push(node.code);
                }
            } else {
                console.warn('Unknown node', node);
            }
        }

        var realSubjectsKeys = Object.keys(data);
        for (const subjectKey of realSubjectsKeys) {
            const subject = data[subjectKey];
            subject.prerequisitesArray = []; // add 'isPrerequisiteFor
            parseNode(subject.prerequisites, subject, subject.code);
        }
    }

    // Normalize graph a lil bit (remove leave AND?OR nodes)
    {
        const problemNodes = Object.keys(data).filter(x => data[x].modifier && !data[x].prerequisitesArray.length);
        let currentNodeKey = problemNodes.length && problemNodes[0];
        while (currentNodeKey) {
            delete data[currentNodeKey];
            problemNodes.splice(0, 1);
            
            var newNodes = Object.values(data)
            .map(x => {
                const index = x.prerequisitesArray.findIndex(x => x === currentNodeKey);
                return { x, index };
            })
            .filter(x => x.index !== -1);

            for (const newNode of newNodes) {
                newNode.x.prerequisitesArray.splice(newNode.index, 1);
                if (newNode.x.modifier && !newNode.x.prerequisitesArray.length && !problemNodes.find(x => x === newNode.x.code)) {
                    problemNodes.push(newNode.x.code);
                }
            }

            currentNodeKey = currentNodeKey = problemNodes.length && problemNodes[0];
        }
    }

    // Make layers
    {
        const alreadyDone = []; // The subjects we already have
        
        const subjectsCount = Object.keys(data).length;
        let currentLayer = 1;
        while (alreadyDone.length < subjectsCount) {
            const subjects = Object.values(data).filter(x => !alreadyDone.find(y => y === x.code) && isSmallArrayInBig(x.prerequisitesArray, alreadyDone));
            // find all the subjects that depend on already found ones in this layer

            if (!subjects.length) {
                console.error('stranger things...', 
                    alreadyDone.map(x => data[x]), 
                    // Object.values(data), 
                    Object.values(data).filter(x => !alreadyDone.find(y => y === x.code))
                );
                break;
            }

            for (const subject of subjects) {
                subject.layer = currentLayer;
                if (!alreadyDone.find(x => x === subject.code)) alreadyDone.push(subject.code);
            }

            currentLayer++;
        }
    }

    // Make groups
    {
        function setNodeAndRelativesGroup(node, parsed, group) {
            parsed.push(node.code);
            node.group = group;
            const subjects = [
                ...(node.prerequisitesArray || []),
                ...(node.isPrerequisiteFor || []),
            ]
            .filter(x => !parsed.find(y => y === x))
            .map(x => data[x]);

            for (const subject of subjects) {
                setNodeAndRelativesGroup(subject, parsed, group);
            }
        }

        let firstUngrouped = Object.values(data).find(x => !x.group);
        let group = 1;
        while (firstUngrouped) {
            setNodeAndRelativesGroup(firstUngrouped, [], group);
            firstUngrouped = Object.values(data).find(x => !x.group);
            group++;
        }
    }

    return data;
}

function draw(data) {

    const SUBJECTS_Y_DIFFERENCE = 120;
    const GROUPS_Y_MARGIN = 50;
    const SUBJECTS_X_DIFFERENCE = 350;
    const DIV_WIDTH = 200;
    const DIV_HEIGHT = 100;

    function drawLine(subject, prerequisiteCode, text) {
        const prerequisite = data[prerequisiteCode];

        const x1 = prerequisite.x + DIV_WIDTH;
        const y1 = prerequisite.y + DIV_HEIGHT / 2;
        const x2 = subject.x;
        const y2 = subject.y + DIV_HEIGHT / 2;

        const length = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        const rotate = Math.atan2(y2 - y1, x2 - x1);

        const div = document.createElement('div');
        div.classList.add('line');
        div.style.width = length + 'px';
        div.style.transform = `rotate(${rotate}rad)`;
        div.style.left = x1 + 'px';
        div.style.top = y1 + 'px';

        const span = document.createElement('span');
        span.innerText = text;
        div.appendChild(span);
        main.appendChild(div);
    }


    let marginTop = 10;
    for (let group = 1; Object.values(data).find(x => x.group === group); group++) {
        const subjectsInGroup = Object.values(data).filter(x => x.group === group);

        let biggestLayer = 0;
        for (let layer = 1; subjectsInGroup.find(x => x.layer === layer); layer++) {
            const subjectsInLayer = subjectsInGroup.filter(x => x.layer === layer);

            if (subjectsInLayer.length > biggestLayer) biggestLayer = subjectsInLayer.length;

            for (let i = 0; i < subjectsInLayer.length; i++) {
                const subject = subjectsInLayer[i];
                const div = document.createElement('div');
                div.classList.add('subject');
                
                if (subject.modifier) {
                    div.innerText = subject.name.toUpperCase();
                    div.style.borderColor = 'blue';
                }
                else if (subject.name) {
                    div.innerText = subject.code + '\n' + subject.name;
                }

                div.subject = subject;
                subject.div = div;

                const x = 20 + (layer - 1) * SUBJECTS_X_DIFFERENCE;
                const y = marginTop + i * SUBJECTS_Y_DIFFERENCE;

                div.style.left = x + 'px';
                div.style.top = y + 'px';

                subject.x = x;
                subject.y = y;

                for(const prerequisiteCode of subject.prerequisitesArray) {
                    drawLine(subject, prerequisiteCode, ''); //todo something better
                }

                main.appendChild(div);
            }

        };

        marginTop += (biggestLayer * SUBJECTS_Y_DIFFERENCE + GROUPS_Y_MARGIN);
    };
}

const data = prepareData(DATA);
console.log(data);
draw(data);
console.log('success');