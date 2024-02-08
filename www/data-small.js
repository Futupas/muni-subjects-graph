'use strict';


const DATA = {
    'PV008': {
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
                    code: 'IB006',
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
    'IB005': { },
    'IB006': { },

    '_PV008': {
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
    '_IB005': { },
    '_LAYER3': {
        prerequisites: {
            code: '_PV008',
            not: true,
            now: false,
        },
    }
};

