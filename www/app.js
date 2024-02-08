'use strict';

const DATA = {
    'PV008': {
        code: 'PV008',
        prerequisites: { // Either modifier or code
            modifier: 'or',
            values: [
                {
                    code: 'IB005',
                    not: true,
                    now: false,
                },
                {
                    code: 'IB005',
                    not: true,
                    now: false,
                },
                {
                    code: 'SOUHLAS',
                    not: false,
                    now: false,
                },
            ],
        },
    },
    'IB005': {
        code: 'IB005',
    },

    '_PV008': {
        code: '_PV008',
        prerequisites: { // Either modifier or code
            modifier: 'or',
            values: [
                {
                    code: '_IB005',
                    not: true,
                    now: false,
                },
                {
                    code: '_IB005',
                    not: true,
                    now: false,
                },
                {
                    code: 'SOUHLAS',
                    not: false,
                    now: false,
                },
            ],
        },
    },
    '_IB005': {
        code: '_IB005',
    },
};

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
            if (!allSubjects.find(x => x === code)) allSubjects.push(code);
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

function parseDataToGoodFormat(data) {
    data = JSON.parse(JSON.stringify(data)); // Deep clone

    // isPrerequisuteFor
    for (const code in data) {
        const subject = data[code];

        const allPrerequisutes = getAllPrerequisitesSubjects(subject.prerequisites);
        subject.prerequisitesArray = allPrerequisutes.filter(x => data[x]);

        for (const prerequisite of allPrerequisutes) {
            const prerequisiteSubject = data[prerequisite];
            if (!prerequisiteSubject) continue; // SOUHLAS etc

            if (!prerequisiteSubject.isPrerequisiteFor) {
                prerequisiteSubject.isPrerequisiteFor = [ code ];
            } else if (!prerequisiteSubject.isPrerequisiteFor.find(x => x === code)) {
                prerequisiteSubject.isPrerequisiteFor.push(code);
            }
        }
    }

    // Make layers
    {
        const alreadyDone = []; // The subjects we already have
        
        const subjectsCount = Object.keys(data).length;
        let currentLayer = 1;
        while (alreadyDone.length < subjectsCount) {
            const subjects = Object.values(data).filter(x => !alreadyDone.find(y => y === x.code) && isSmallArrayInBig(x.prerequisitesArray, alreadyDone));

            for (const subject of subjects) {
                subject.layer = currentLayer;
                if (!alreadyDone.find(x => x === subject.code)) alreadyDone.push(subject.code);
            }

            currentLayer++;
        }
        
    }

    // Make groups

    console.log(data);

}

function draw(data) {
    //
}

const data = parseDataToGoodFormat(DATA);
draw(data);
