'use strict';

const DATA = {
    'MB141': {
        name: 'Lineární algebra a diskrétní matematika',
        prerequisites: {
            modifier: 'or',
            values: [
                {
                    code: 'MB151',
                    not: true,
                    now: false,
                },
                {
                    code: 'MB151',
                    not: true,
                    now: false,
                },
                {
                    code: 'MB154',
                    not: true,
                    now: false,
                },
                {
                    code: 'MB101',
                    not: true,
                    now: false,
                },
                {
                    code: 'MB104',
                    not: true,
                    now: false,
                },
            ],
        },
    },
    'IB000': {
        name: 'Matematické základy informatiky',
    },
    'IB110': {
        name: 'Základy informatiky',
        prerequisites: {
            modifier: 'or',
            values: [
                {
                    code: 'IB005',
                    not: true,
                    now: false,
                },
                {
                    code: 'IB107',
                    not: true,
                    now: false,
                },
            ],
        },
    },
    'IB111': {
        name: 'Základy programování',
        prerequisites: {
            modifier: 'and',
            values: [
                {
                    code: 'IB113',
                    not: true,
                    now: false,
                },
                {
                    code: 'IB113',
                    not: true,
                    now: true,
                },
            ],
        },
    },
    'IB113': {
        name: 'Úvod do programování a algoritmizace',
        prerequisites: {
            modifier: 'and',
            values: [
                {
                    code: 'IB111',
                    not: true,
                    now: false,
                },
                {
                    code: 'IB111',
                    not: true,
                    now: true,
                },
                {
                    code: 'PB162',
                    not: true,
                    now: false,
                },
                {
                    code: 'PB161',
                    not: true,
                    now: false,
                },
                {
                    code: 'PB071',
                    not: true,
                    now: false,
                },
                {
                    code: 'IB001',
                    not: true,
                    now: false,
                },
                {
                    code: 'program(B-INF)',
                    not: true,
                    now: false,
                },
                {
                    code: 'program(B-PVA)',
                    not: true,
                    now: false,
                },
            ],
        },
    },
    'IB114': {
        name: 'Úvod do programování a algoritmizace II',
        prerequisites: {
            modifier: 'and',
            values: [
                {
                    code: 'IB111',
                    not: false,
                    now: true,
                },
                {
                    code: 'IB111',
                    not: true,
                    now: false,
                },
                {
                    code: 'IB002',
                    not: true,
                    now: false,
                },
                {
                    code: 'IB002',
                    not: false,
                    now: true,
                },
            ],
        },
    },
    'IV130': {
        name: 'Přínosy a rizika inteligentních systémů',
    },
    'PB007': {
        name: 'Software Engineering I',
        prerequisites: {
            modifier: 'or',
            values: [
                {
                    code: 'PB161',
                    not: false,
                    now: false,
                },
                {
                    code: 'PB162',
                    not: false,
                    now: false,
                },
                {
                    code: 'PV178',
                    not: false,
                    now: false,
                },
                {
                    code: 'PB112',
                    not: false,
                    now: false,
                },
            ],
        },
    },
    'PB071': {
        name: 'Principy nízkoúrovňového programování',
    },
    'PB151': {
        name: 'Výpočetní systémy',
        prerequisites: {
            modifier: 'or',
            values: [
                {
                    code: 'PB150',
                    not: true,
                    now: true,
                },
            ],
        },
    },
    'PB152': {
        name: 'Operační systémy',
        prerequisites: {
            modifier: 'and',
            values: [
                {
                    code: 'PB153',
                    not: true,
                    now: false,
                },
                {
                    code: 'PB153',
                    not: false,
                    now: true,
                },
            ],
        },
    },
    'PB152cv': {
        name: 'Operační systémy - cvičení',
        prerequisites: {
            modifier: 'and',
            values: [
                {
                    code: 'PB153cv',
                    not: true,
                    now: false,
                },
                {
                    code: 'PB153cv',
                    not: false,
                    now: true,
                },
            ],
        },
    },
    'PB153': {
        name: 'Operační systémy a systémové programování',
        prerequisites: {
            modifier: 'and',
            values: [
                {
                    code: 'PB161',
                    not: true,
                    now: false,
                },
                {
                    code: 'PB161',
                    not: false,
                    now: true,
                },
            ],
        },
    },
    'PB153cv': {
        name: 'Operační systémy a systémové programování - cvičení',
        prerequisites: {
            modifier: 'and',
            values: [
                {
                    code: 'PB161cv',
                    not: true,
                    now: false,
                },
                {
                    code: 'PB161cv',
                    not: false,
                    now: true,
                },
            ],
        },
    },
    'PB154': {
        name: 'Architektura počítačů',
    },
    'PB155': {
        name: 'Architektura počítačů',
    },
    'PB156': {
        name: 'Architektura počítačů',
    },
    'PB161': {
        name: 'Programování v jazyce C',
        prerequisites: {
            modifier: 'or',
            values: [
                {
                    code: 'PB161',
                    not: true,
                    now: false,
                },
                {
                    code: 'PB161',
                    not: false,
                    now: true,
                },
                {
                    code: 'program(B-INOV)',
                    not: true,
                    now: false,
                },
                {
                    code: 'program(B-AI)',
                    not: true,
                    now: false,
                },
            ],
        },
    },
    'PB161cv': {
        name: 'Programování v jazyce C - cvičení',
        prerequisites: {
            modifier: 'or',
            values: [
                {
                    code: 'PB161cv',
                    not: true,
                    now: false,
                },
                {
                    code: 'PB161cv',
                    not: false,
                    now: true,
                },
                {
                    code: 'program(B-INOV)',
                    not: true,
                    now: false,
                },
                {
                    code: 'program(B-AI)',
                    not: true,
                    now: false,
                },
            ],
        },
    },
    'PB162': {
        name: 'Programování v jazyce C++',
        prerequisites: {
            modifier: 'or',
            values: [
                {
                    code: 'PB162',
                    not: true,
                    now: false,
                },
                {
                    code: 'PB162',
                    not: false,
                    now: true,
                },
            ],
        },
    },
    'PB162cv': {
        name: 'Programování v jazyce C++ - cvičení',
        prerequisites: {
            modifier: 'or',
            values: [
                {
                    code: 'PB162cv',
                    not: true,
                    now: false,
                },
                {
                    code: 'PB162cv',
                    not: false,
                    now: true,
                },
            ],
        },
    },
    'PV181': {
        name: 'Teoretická informatika',
        prerequisites: {
            modifier: 'or',
            values: [
                {
                    code: 'IB002',
                    not: true,
                    now: false,
                },
                {
                    code: 'IB002',
                    not: false,
                    now: true,
                },
            ],
        },
    },
    'PV211': {
        name: 'Úvod do počítačové grafiky',
        prerequisites: {
            modifier: 'and',
            values: [
                {
                    code: 'PB161',
                    not: true,
                    now: false,
                },
                {
                    code: 'PB161',
                    not: false,
                    now: true,
                },
            ],
        },
    },
    'PV212': {
        name: 'Počítačová grafika',
        prerequisites: {
            modifier: 'or',
            values: [
                {
                    code: 'PV211',
                    not: true,
                    now: false,
                },
                {
                    code: 'PV211',
                    not: false,
                    now: true,
                },
            ],
        },
    },
    'PV222': {
        name: 'Algoritmy v počítačové grafice',
        prerequisites: {
            modifier: 'and',
            values: [
                {
                    code: 'PV211',
                    not: true,
                    now: false,
                },
                {
                    code: 'PV211',
                    not: false,
                    now: true,
                },
                {
                    code: 'PV211',
                    not: false,
                    now: false,
                },
            ],
        },
    },
    'PV225': {
        name: 'Pokročilá počítačová grafika',
        prerequisites: {
            modifier: 'and',
            values: [
                {
                    code: 'PV212',
                    not: true,
                    now: false,
                },
                {
                    code: 'PV212',
                    not: false,
                    now: true,
                },
            ],
        },
    },
    'PV226': {
        name: 'Pokročilá počítačová grafika - cvičení',
        prerequisites: {
            modifier: 'and',
            values: [
                {
                    code: 'PV225',
                    not: true,
                    now: false,
                },
                {
                    code: 'PV225',
                    not: false,
                    now: true,
                },
            ],
        },
    },
    'PV253': {
        name: 'Teorie databází',
    },
    'PV260': {
        name: 'Teorie algoritmů',
        prerequisites: {
            modifier: 'or',
            values: [
                {
                    code: 'PV215',
                    not: true,
                    now: false,
                },
                {
                    code: 'PV215',
                    not: false,
                    now: true,
                },
            ],
        },
    },
    'PV264': {
        name: 'Úvod do formálních jazyků a automatů',
    },
    'PV265': {
        name: 'Úvod do teorie složitosti',
    },
    'PV268': {
        name: 'Použití šablon v programování',
        prerequisites: {
            modifier: 'or',
            values: [
                {
                    code: 'PB162',
                    not: false,
                    now: false,
                },
                {
                    code: 'PB162cv',
                    not: false,
                    now: false,
                },
                {
                    code: 'PB161',
                    not: false,
                    now: false,
                },
                {
                    code: 'PB161cv',
                    not: false,
                    now: false,
                },
                {
                    code: 'program(B-SI)',
                    not: false,
                    now: false,
                },
                {
                    code: 'program(B-INOV)',
                    not: false,
                    now: false,
                },
            ],
        },
    },
    'PV269': {
        name: 'Matematické metody ve vizualizaci',
    },
    'PV271': {
        name: 'Úvod do umělé inteligence',
        prerequisites: {
            modifier: 'or',
            values: [
                {
                    code: 'IV122',
                    not: true,
                    now: false,
                },
                {
                    code: 'IV122',
                    not: false,
                    now: true,
                },
            ],
        },
    },
    'PV272': {
        name: 'Umělá inteligence',
    },
    'PV273': {
        name: 'Umělá inteligence',
    },
    'PV277': {
        name: 'Pokročilé techniky zpracování signálů',
    },
    'PV279': {
        name: 'Zpracování řečových signálů',
    },
    'PV278': {
        name: 'Základy mluvené řeči',
    },
    'PV280': {
        name: 'Soft Computing',
    },
    'PV181cv': {
        name: 'Teoretická informatika - cvičení',
    },
    'PV215': {
        name: 'Algoritmy a datové struktury',
    },
    'PV215cv': {
        name: 'Algoritmy a datové struktury - cvičení',
    },
    'PV216': {
        name: 'Algoritmy a datové struktury II',
    },
    'PV218': {
        name: 'Víceúrovňové modely a metody v informatice',
    },
    'PV219': {
        name: 'Grafické procesory a jejich programování',
    },
    'PV222cv': {
        name: 'Algoritmy v počítačové grafice - cvičení',
    },
    'PV226cv': {
        name: 'Pokročilá počítačová grafika - cvičení',
    },
    'PV241': {
        name: 'Matematická logika',
    },
    'PV243': {
        name: 'Návrhové metody v informatice',
    },
    'PV246': {
        name: 'Rozpoznávání a klasifikace',
    },
    'PV247': {
        name: 'Zpracování obrazu',
    },
    'PV249': {
        name: 'Videokomprese',
    },
    'PV250': {
        name: 'Běhové prostředí programů',
    },
    'PV253cv': {
        name: 'Teorie databází - cvičení',
    },
    'PV264cv': {
        name: 'Úvod do formálních jazyků a automatů - cvičení',
    },
    'PV265cv': {
        name: 'Úvod do teorie složitosti - cvičení',
    },
    'PV269cv': {
        name: 'Matematické metody ve vizualizaci - cvičení',
    },
    'PV271cv': {
        name: 'Úvod do umělé inteligence - cvičení',
    },
    'PV272cv': {
        name: 'Umělá inteligence - cvičení',
    },
    'PV273cv': {
        name: 'Umělá inteligence - cvičení',
    },
    'PV277cv': {
        name: 'Pokročilé techniky zpracování signálů - cvičení',
    },
    'PV279cv': {
        name: 'Zpracování řečových signálů - cvičení',
    },
    'PV280cv': {
        name: 'Soft Computing - cvičení',
    },
};
