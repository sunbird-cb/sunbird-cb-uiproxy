'use strict'
const CHECK = {
    ROLE: 'ROLE_CHECK',
}

// Valid Roles
const ROLE = {
    CONTENT_CREATOR: 'CONTENT_CREATOR',
    // tslint:disable-next-line: object-literal-sort-keys
    COMPENTENCY_REVIEWER: 'competencyReviewer',
    EDITOR: 'EDITOR',
    IFU_MEMBER: 'IFUMember',
    MDO_ADMIN: 'MDO ADMIN',
    MEMBER: 'Member',
    PUBLISHER: 'PUBLISHER',
    REVIEWER: 'REVIEWER',
    FRAC_ACCESS_COMPENTENCY: 'fracAccessCompetency',
    FRAC_ADMIN: 'fracAdmin',
    FRAC_REVIEWER_ONE: 'fracReviewerOne',
    FRAC_REVIEWER_TWO: 'fracReviewerTwo',
    PUBLIC: 'PUBLIC',
}

// All api list validations
export const API_LIST = {
    URL:
    {
        '/protected/v8/user/details': {
            checksNeeded: [],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/user/profileDetails/test': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
              ROLE.MDO_ADMIN,
              ROLE.CONTENT_CREATOR,
            ],
        },
        '/protected/v8/user/resource/': {
            checksNeeded: [],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/api/user/v2/read': {
            checksNeeded: [],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/reset': {
            checksNeeded: [],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
    },
    URL_PATTERN:
    [
        '/proxies/v8/api/user/v2/read',
        '/protected/v8/user/profileDetails/test',
        '/protected/v8/user/resource/',
        '/protected/v8/user/details',
        '/reset',
    ],
}
