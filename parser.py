POSSIBLE_INPUTS = """!NOW(MB151) && ( !MB151 || !MB154 ) && ( !MB101 || !MB104 )

!IB005 || !IB107
!IB113 && !NOW(IB113)
!NOW(IB111) && !IB111 && !PB162 && !PB161 && !PB071 && !IB001 && !program(B-INF) && !program(B-PVA)
(IB111 || IB113) && !IB002 && !NOW(IB002)
PB161 || PB162 || PV178 || PB112
! NOW(PB150)
!PB153 && !NOW(PB153)
(PB153 || PB152) && (PB071 || SOUHLAS)
!PB154 && !NOW(PB154)
(PB156 && PV004) || SOUHLAS
(!rocnik(1) && !rocnik(2)) && SOUHLAS
!obor(PR) && !obor(PR01) && !program(N-VS)
!BSS101 && !NOW(BSS101)
!BSS103 && !NOW(BSS103)
!BSS152 && !NOW(BSS152)
NOW(SBAPR) || (1422:BI1000Z)
NOW(SBAPR)
!(PB162) && ! NOW(PB162)
PB006
PB006 && ! PB112 && ! NOW(PB112)
PV080
VB035 || souhlas
VB001 || program(N-UCI)
NOW(SZB)"""

print(POSSIBLE_INPUTS)


def parse(src):
    if src == '': return {}
    if src == '!IB113 && !NOW(IB113)':
        return {
            'modifier': 'and',
            'values': [
                {
                    'code': 'IB113',
                    'not': True,
                    'now': False
                },
                {
                    'code': 'IB113',
                    'not': True,
                    'now': True
                }
            ]
        }
    return None

print()
print()
print()

print(parse('!IB113 && !NOW(IB113)'))

