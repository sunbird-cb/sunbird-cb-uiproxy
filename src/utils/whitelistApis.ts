'use strict'
import { ROLE } from './roles'

const CHECK = {
    PARAM_EQUALITY_CHECK: 'PARAM_EQUALITY_CHECK',
    ROLE: 'ROLE_CHECK',
    SCOPE: 'SCOPE_CHECK',
}

// All api list validations
export const API_LIST = {
    URL:
    {
        // '/authApi/content/v3/create': {
        //     checksNeeded: [CHECK.ROLE],
        //     // tslint:disable-next-line: object-literal-sort-keys
        //     ROLE_CHECK: [
        //         ROLE.PUBLIC,
        //     ],
        // },
        // '/authApi/content/v3/read/:do_id': {
        //     checksNeeded: [CHECK.ROLE],
        //     // tslint:disable-next-line: object-literal-sort-keys
        //     ROLE_CHECK: [
        //         ROLE.PUBLIC,
        //     ],
        // },
        // '/authApi/content/v3/update/:do_id': {
        //     checksNeeded: [CHECK.ROLE],
        //     // tslint:disable-next-line: object-literal-sort-keys
        //     ROLE_CHECK: [
        //         ROLE.PUBLIC,
        //     ],
        // },
        '/protected/v8/user/details': {
            checksNeeded: [CHECK.ROLE],
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
                ROLE.MDO_LEADER,
                ROLE.CONTENT_CREATOR,
            ],
        },
        // tslint:disable-next-line: object-literal-sort-keys
        '/protected/v8/resource/': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/api/user/v2/read': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC, 'ALL',
            ],
        },
        '/proxies/v8/api/user/v2/read/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC, 'ALL',
            ],
        },
        '/proxies/v8/api/user/v5/read': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC, 'ALL',
            ],
        },
       '/proxies/v8/user/v1/updateLogin': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC, 'ALL',
            ],
        },
        '/proxies/v8/api/user/v5/read/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC, 'ALL',
            ],
        },
        '/proxies/v8/event/v4/read/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/event/v4/publish/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/event/v4/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/event/v4/update/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/event/v4/retire/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/user/v1/read/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/sunbirdigot/read': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/sunbirdigot/search': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/contentsearch/search': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/read/content-progres/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/discussion/recent': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/content-progres/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/discussion/user/v1/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/discussion/topic/:id/:slug': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/learner/course/v1/user/enrollment/list/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/learner/course/v2/user/enrollment/list/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/learner/certreg/v1/certs/validate': {
            checksNeeded: [],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [],
        },
        '/proxies/v8/action/content/v3/hierarchy/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/action/content/v3/read/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/action/content/v3/reject/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_REVIEWER,
                ROLE.CONTENT_PUBLISHER,
                ROLE.SPV_PUBLISHER,
                ROLE.CONTENT_CREATOR,
            ],
        },
        '/proxies/v8/discussion/forum/v2/read': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/discussion/forum/v3/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/discussion/category/list': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/discussion/category/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/discussion/forum/tags': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/discussion/user/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/action/content/v3/hierarchyUpdate': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_PUBLISHER,
                ROLE.CONTENT_REVIEWER,
                ROLE.SPV_PUBLISHER,
            ],
        },
        '/proxies/v8/action/content/v3/hierarchy/update': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.EDITOR,
                ROLE.CONTENT_PUBLISHER,
                ROLE.CONTENT_REVIEWER,
                ROLE.SPV_PUBLISHER,
            ],
        },
        '/proxies/v8/action/content/v3/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.PROGRAM_COORDINATOR,
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/dashboard/analytics/getDashboardConfig/Karmayogi/:comp': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/dashboard/analytics/getDashboardsForProfile/Karmayogi': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/dashboard/analytics/getChartV2/Karmayogi': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/wat/dashboard/getDashboardConfig/Karmayogi/overview': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/forms/createForm': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/forms/getFormById': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/forms/getCollectiveAggregation': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/forms/getAllForms': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/forms/v1/saveFormSubmit': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/forms/tagFormToCourse': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/forms/untagFormToCourse': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/forms/getAllApplications': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/forms/searchForms': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/forms/getCourseListForSurveys': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/upload/action/content/v3/upload/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.EDITOR,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.PROGRAM_COORDINATOR,
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/v1/content/retire': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.EDITOR,
            ],
        },
        '/proxies/v8/action/content/v3/copy/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
            ],
        },
        '/proxies/v8/action/content/v3/updateReviewStatus/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_REVIEWER,
                ROLE.CONTENT_PUBLISHER,
                ROLE.SPV_PUBLISHER,
                ROLE.CONTENT_CREATOR,
            ],
        },
        '/proxies/v8/action/content/v3/review/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.CONTENT_REVIEWER,
                ROLE.CONTENT_PUBLISHER,
                ROLE.SPV_PUBLISHER,
            ],
        },
        '/proxies/v8/action/content/v3/publish/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_PUBLISHER,
                ROLE.MDO_ADMIN,
                ROLE.SPV_PUBLISHER,
            ],
        },
        '/proxies/v8/action/content/v3/update/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.EDITOR,
                ROLE.CONTENT_REVIEWER,
                ROLE.CONTENT_PUBLISHER,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_PUBLISHER,
            ],
        },
        '/proxies/v8/data/v1/system/settings/get/orgTypeList': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBC_ADMIN,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
                ROLE.STATE_ADMIN,
                ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/data/v1/system/settings/get/notificationPreference': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/org/v1/search': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/user/private/v1/assign/role': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
                ROLE.CBP_ADMIN,
                ROLE.STATE_ADMIN,
                ROLE.CONTENT_CREATOR,
            ],
        },
        '/proxies/v8/user/v1/search': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/org/v1/read': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBC_ADMIN,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
                ROLE.STATE_ADMIN,
            ],
        },
        '/proxies/v8/org/v1/profile/read': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBC_ADMIN,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
                ROLE.STATE_ADMIN,
            ],
        },
        '/proxies/v8/org/v1/profile/patch': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBC_ADMIN,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
                ROLE.STATE_ADMIN,
            ],
        },
        '/proxies/v8/org/v1/update': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBC_ADMIN,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
                ROLE.STATE_ADMIN,
            ],
        },
        '/proxies/v8/user/v1/block': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
                ROLE.CBP_ADMIN,
                ROLE.STATE_ADMIN,
                ROLE.CONTENT_CREATOR,
            ],
        },
        '/proxies/v8/user/v1/unblock': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
                ROLE.CBP_ADMIN,
                ROLE.STATE_ADMIN,
                ROLE.CONTENT_CREATOR,
            ],
        },
        '/proxies/v8/data/v1/system/settings/get/orgTypeConfig': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBC_ADMIN,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
                ROLE.STATE_ADMIN,
            ],
        },
        '/proxies/v8/discussion/tags': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/org/v1/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBC_ADMIN,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
                ROLE.STATE_ADMIN,
            ],
        },
        '/proxies/v8/learnervm/private/content/v3/publish/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_PUBLISHER,
                ROLE.SPV_PUBLISHER,
            ],
        },
        '/proxies/v8/learnervm/private/content/v3/review/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_REVIEWER,
            ],
        },
        '/proxies/v8/discussion/v2/topics': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/discussion/v2/topics/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/discussion/tags/:tag': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/discussion/user/:userKey/bookmarks': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/discussion/user/:userKey/bookmark': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/discussion/user/:userKey/upvoted': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/discussion/user/:userKey/downvoted': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/discussion/categories': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/discussion/mainCategories': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/user/v1/autocomplete/:key': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/user/v1/migrate': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBC_ADMIN,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
                ROLE.STATE_ADMIN,
            ],
        },
        '/proxies/v8/user/private/v1/migrate': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBC_ADMIN,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/user/private/v1/assign/role/userrole': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/discussion/v2/posts/:id/vote': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/discussion/v2/posts/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/discussion/v2/posts/:id/bookmark': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/discussion/popular': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/discussion/moderation/consumer': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/discussion/moderation/producer': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/learnervm/private/content/v3/retire/': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.EDITOR,
            ],
        },
        '/proxies/v8/private/content/v3/update/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.EDITOR,
            ],
        },
        '/proxies/v8/notifyContentState': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/connections/connections/recommended/userDepartment': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/discussionHub/categories/:cid/:slug?/:tid?': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/discussionHub/topics/recent': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/cohorts/:cohortType/:contentId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.EDITOR,
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/user/content/like': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/user/telemetry': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/scrom/get/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/user/progress/:contentId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/user/rating/:contentId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/user/progress': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/user/history/continue': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/portal/departmentType/': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBC_ADMIN,
                ROLE.SPV_ADMIN,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        },
        '/protected/v8/portal/spv/department': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
            ],
        },
        '/protected/v8/portal/spv/deptAction/': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
            ],
        },
        '/protected/v8/user/roles/getUsersV2': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/portal/spv/mydepartment': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
            ],
        },
        '/protected/v8/portal/mdo/mydepartment': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        },
        '/protected/v8/user/profileDetails/createUser': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
                ROLE.CBP_ADMIN,
                ROLE.CONTENT_CREATOR,
                ROLE.STATE_ADMIN,
            ],
        },
        '/protected/v8/user/profileRegistry/getUserRegistryByUser/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/user/profileRegistry/createUserRegistryV2': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/user/profileRegistry/createUserRegistry': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/portal/deptAction': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBC_ADMIN,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
            ],
        },
        '/protected/v8/workflowhandler/historyByApplicationId/:applicationId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.WAT_MEMBER,
                ROLE.CBC_ADMIN,
                ROLE.SPV_ADMIN,
                ROLE.STATE_ADMIN,
            ],
        },
        '/protected/v8/user/autocomplete/:query': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/portal/spv/deptAction/userrole': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
            ],
        },
        '/protected/v8/user/preference': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/workflowhandler/applicationsSearch': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.WAT_MEMBER,
                ROLE.CBC_ADMIN,
                ROLE.SPV_ADMIN,
                ROLE.STATE_ADMIN,
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/workallocation/getWorkOrders': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.WAT_MEMBER,
                ROLE.CBC_ADMIN,
                ROLE.SPV_ADMIN,
            ],
        },
        '/protected/v8/workallocation/add/workorder': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.WAT_MEMBER,
                ROLE.CBC_ADMIN,
                ROLE.SPV_ADMIN,
            ],
        },
        '/protected/v8/workallocation/getWorkOrderById/:workOrderId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.WAT_MEMBER,
                ROLE.CBC_ADMIN,
                ROLE.SPV_ADMIN,
            ],
            SCOPE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        },
        '/protected/v8/workallocation/user/autocomplete/:searchTerm': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/workallocation/getUserCompetencies/:userId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/frac/searchNodes': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/frac/filterByMappings': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/frac/:type/:key': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/workallocation/v2/add': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.WAT_MEMBER,
                ROLE.CBC_ADMIN,
                ROLE.SPV_ADMIN,
            ],
        },
        '/protected/v8/workallocation/getWorkAllocationById/:workAllocationId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.WAT_MEMBER,
                ROLE.CBC_ADMIN,
                ROLE.SPV_ADMIN,
            ],
        },
        '/protected/v8/workallocation/update/workorder': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.WAT_MEMBER,
                ROLE.CBC_ADMIN,
                ROLE.SPV_ADMIN,
            ],
        },
        '/protected/v8/workallocation/getWOPdf/:workOrderId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.WAT_MEMBER,
                ROLE.CBC_ADMIN,
                ROLE.SPV_ADMIN,
            ],
        },
        '/protected/v8/portal/cbp/mydepartment': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBC_ADMIN,
            ],
        },
        '/protected/v8/user/mandatoryContent/checkStatus': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/user/rating/content/average-ratingInfo/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/social/post/timeline': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/user/history/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/frac/getAllNodes/:type': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/frac/getNodeById/:id/:type': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/portal/listDeptNames': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/portal/v1/admin/listDeptNames': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PROGRAM_COORDINATOR,
            ],
        },
        '/protected/v8/scroing/getTemplate/:templateId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/portal/cbc/department': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBC_ADMIN,
            ],
        },
        '/protected/v8/portal/cbc/department/:deptId/': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBC_ADMIN,
            ],
        },
        '/protected/v8/portal/spv/department/:deptId/': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
            ],
        },
        '/protected/v8/scroing/calculate': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.EDITOR,
                ROLE.CONTENT_PUBLISHER,
                ROLE.CONTENT_REVIEWER,
                ROLE.SPV_PUBLISHER,
            ],
        },
        // '/protected/v8/connections/connections/recommended': {
        //     checksNeeded: [CHECK.ROLE],
        //     // tslint:disable-next-line: object-literal-sort-keys
        //     ROLE_CHECK: [
        //         ROLE.PUBLIC,
        //     ],
        // },
        // '/protected/v8/connections/connections/requests/received': {
        //     checksNeeded: [CHECK.ROLE],
        //     // tslint:disable-next-line: object-literal-sort-keys
        //     ROLE_CHECK: [
        //         ROLE.PUBLIC,
        //     ],
        // },
        // '/protected/v8/connections/connections/established': {
        //     checksNeeded: [CHECK.ROLE],
        //     // tslint:disable-next-line: object-literal-sort-keys
        //     ROLE_CHECK: [
        //         ROLE.PUBLIC,
        //     ],
        // },
        // '/protected/v8/connections/connections/established/:id': {
        //     checksNeeded: [CHECK.ROLE],
        //     // tslint:disable-next-line: object-literal-sort-keys
        //     ROLE_CHECK: [
        //         ROLE.PUBLIC,
        //     ],
        // },
        // '/protected/v8/connections/connections/requested': {
        //     checksNeeded: [CHECK.ROLE],
        //     // tslint:disable-next-line: object-literal-sort-keys
        //     ROLE_CHECK: [
        //         ROLE.PUBLIC,
        //     ],
        // },
        // '/protected/v8/connections/add/connection': {
        //     checksNeeded: [CHECK.ROLE],
        //     // tslint:disable-next-line: object-literal-sort-keys
        //     ROLE_CHECK: [
        //         ROLE.PUBLIC,
        //     ],
        // },
        // '/protected/v8/connections/connections/suggests': {
        //     checksNeeded: [CHECK.ROLE],
        //     // tslint:disable-next-line: object-literal-sort-keys
        //     ROLE_CHECK: [
        //         ROLE.PUBLIC,
        //     ],
        // },
        '/protected/v8/cohorts/course/getUsersForBatch/:courseId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/cohorts/course/getUsersForBatch/:batchId/:deptName': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/cohorts/user/autoenrollment/:courseId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/profanity/startPdfProfanity': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.EDITOR,
                ROLE.CONTENT_PUBLISHER,
                ROLE.CONTENT_REVIEWER,
                ROLE.SPV_PUBLISHER,
            ],
        },
        '/protected/v8/profanity/getPdfProfanityForContent/:contentId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.CONTENT_REVIEWER,
                ROLE.CONTENT_PUBLISHER,
                ROLE.EDITOR,
                ROLE.SPV_PUBLISHER,
            ],
        },
        '/protected/v8/catalog': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.EDITOR,
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/scroing/fetch': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.CONTENT_REVIEWER,
                ROLE.EDITOR,
                ROLE.CONTENT_PUBLISHER,
                ROLE.SPV_PUBLISHER,
            ],
        },
        '/protected/v8/portal/mdo/deptAction/userrole': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        },
        '/protected/v8/workallocation/v2/update': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.WAT_MEMBER,
                ROLE.CBC_ADMIN,
                ROLE.SPV_ADMIN,
            ],
        },
        '/protected/v8/user/profileDetails/updateUser': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/frac/addDataNodeBulk': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/roleactivity/:txt': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/connections/update/connection': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/workflowhandler/userWFApplicationFieldsSearch': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/user/details/detailV1': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/user/profileRegistry/getMasterNationalities': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/user/profileRegistry/getMasterCountries': {
             checksNeeded: [CHECK.ROLE],
             // tslint:disable-next-line: object-literal-sort-keys
             ROLE_CHECK: [
                 ROLE.PUBLIC,
             ],
        },
        '/protected/v8/user/profileRegistry/getMasterLanguages': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/user/profileRegistry/getProfilePageMeta': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/user/notifications/settings': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/user/profileRegistry/searchUserRegistry': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/workflowhandler/transition': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/workflowhandler/nextActionSearch/:serviceName/:state': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.WAT_MEMBER,
                ROLE.CBC_ADMIN,
                ROLE.SPV_ADMIN,
            ],
        },
        '/protected/v8/workflowhandler/historyByApplicationIdAndWfId/:applicationId/:wfId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.WAT_MEMBER,
                ROLE.CBC_ADMIN,
                ROLE.SPV_ADMIN,
            ],
        },
        '/protected/v8/workflowhandler/workflowProcess/:wfId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.WAT_MEMBER,
                ROLE.CBC_ADMIN,
                ROLE.SPV_ADMIN,
            ],
        },
        '/protected/v8/workflowhandler/updateUserProfileWf': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.WAT_MEMBER,
                ROLE.CBC_ADMIN,
                ROLE.SPV_ADMIN,
            ],
        },
        '/protected/v8/workflowhandler/userWfSearch': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.WAT_MEMBER,
                ROLE.CBC_ADMIN,
                ROLE.SPV_ADMIN,
            ],
        },
        '/protected/v8/user/profileRegistry/getUserRegistryById': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/user/profileRegistry/getUserRegistryById/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/workallocation/copy/workOrder': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.WAT_MEMBER,
                ROLE.CBC_ADMIN,
                ROLE.SPV_ADMIN,
            ],
        },
        '/reset': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC, 'ALL',
            ],
        },
        '/protected/v8/user/evaluate/assessment/submit/v2': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/user/evaluate/assessment/submit/v3': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/connections/v2/connections/recommended/userDepartment': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/connections/v2/connections/recommended': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/connections/v2/connections/requests/received': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/connections/v2/connections/established': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/contentprivate/update/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
            ],
        },
        '/protected/v8/contentprivate/migratepublisher/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
            ],
        },
        '/protected/v8/contentprivate/migratereviewer/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
            ],
        },
        '/protected/v8/connections/v2/connections/established/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/connections/v2/connections/requested': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/connections/v2/add/connection': {
            checksNeeded: [CHECK.ROLE, CHECK.PARAM_EQUALITY_CHECK],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
            PARAM_EQUALITY_CHECK: {
                checks: [
                    { entity: '__param__equality', session: 'session.userId', requestbody: 'body.userIdFrom' },
                ],
            },
        },
        '/protected/v8/connections/v2/connections/suggests': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/connections/v2/update/connection': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/user/profileDetails/createUserWithoutInvitationEmail': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        },
        '/authApi/batch/:key': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/authApi/readBatch/:batchId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.PROGRAM_COORDINATOR,
            ],
        },
        '/authApi/readCert/:certId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        }, '/proxies/v8/searchBy/:key': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        }, '/proxies/v8/staff/position': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        }, '/proxies/v8/staff/position/:orgId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        }, '/proxies/v8/budget/scheme': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        }, '/proxies/v8/budget/scheme/:orgId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        }, '/proxies/v8/budget/scheme/:orgId/:budgetYear': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        }, '/proxies/v8/orghistory/:orgId/:key': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBC_ADMIN,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/discussion/user/uid/:uid': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/discussion/user/:username/posts': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/action/framework/v3/read/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/action/framework/v3/category/master/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/action/framework/v3/category/master/search': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/action/framework/v3/category/master/read/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/action/framework/v3/category/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/action/framework/v3/category/read/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/action/framework/v3/category/retire/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/action/framework/v3/term/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/action/content/v3/upload/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/learner/course/v1/batch/list': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/cohorts/course/batch/cert/download/:certId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/public/v8/cohorts/course/batch/cert/download/mobile': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/cohorts/course/batch/cert/issue': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/cohorts/course/batch/cert/template/add': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.PROGRAM_COORDINATOR,
            ],
        },
        '/proxies/v8/discussion/v2/categories': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/storage/upload': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/storage/delete': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/user/v1/extPatch': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/learner/course/v2/user/enrollment/admin/list': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.CBP_ADMIN,
            ],
        },
        '/protected/v8/frac/bookmarkDataNode': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/assessment/read/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/question/read': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/cbp/question/list': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.CONTENT_PUBLISHER,
                ROLE.CONTENT_REVIEWER,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_PUBLISHER,
            ],
        },
        '/proxies/v8/questionset/v1/create': {
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
            checksNeeded: [CHECK.ROLE],
        },
        '/proxies/v8/questionset/v1/read/:id': {
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.CONTENT_PUBLISHER,
                ROLE.CONTENT_REVIEWER,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_PUBLISHER,
            ],
            checksNeeded: [CHECK.ROLE],
        },
        '/proxies/v8/questionset/v1/update/:id': {
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.CONTENT_PUBLISHER,
                ROLE.CONTENT_REVIEWER,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_PUBLISHER,
            ],
            checksNeeded: [CHECK.ROLE],
        },
        '/proxies/v8/questionset/v1/review/:id': {
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
            checksNeeded: [CHECK.ROLE],
        },
        '/proxies/v8/questionset/v1/publish/:id': {
            ROLE_CHECK: [
                ROLE.CONTENT_PUBLISHER,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_PUBLISHER,
            ],
            checksNeeded: [CHECK.ROLE],
        },
        '/proxies/v8/questionset/v1/hierarchy/update': {
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
            checksNeeded: [CHECK.ROLE],
        },
        '/proxies/v8/questionset/v1/retire/:id': {
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.CONTENT_PUBLISHER,
                ROLE.CONTENT_REVIEWER,
                ROLE.SPV_PUBLISHER,
            ],
            checksNeeded: [CHECK.ROLE],
        },
        '/proxies/v8/questionset/v1/reject/:id': {
            ROLE_CHECK: [
                ROLE.CONTENT_PUBLISHER,
                ROLE.CONTENT_REVIEWER,
                ROLE.SPV_PUBLISHER,
                ROLE.CONTENT_CREATOR,
            ],
            checksNeeded: [CHECK.ROLE],
        },
        '/proxies/v8/questionset/v1/hierarchy/:id': {
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.CONTENT_PUBLISHER,
                ROLE.CONTENT_REVIEWER,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_PUBLISHER,
            ],
            checksNeeded: [CHECK.ROLE],
        },
        '/proxies/v8/ratings/v1/read/:activityId/:activityType/:userId': {
            ROLE_CHECK: [
               ROLE.PUBLIC,
            ],
           checksNeeded: [CHECK.ROLE],
       },
        '/proxies/v8/ratings/v1/upsert': {
           ROLE_CHECK: [
              ROLE.PUBLIC,
            ],
          checksNeeded: [CHECK.ROLE],
       },
        '/proxies/v8/ratings/v1/summary/:activityId/:activityType': {
           ROLE_CHECK: [
             ROLE.PUBLIC,
            ],
         checksNeeded: [CHECK.ROLE],
        },
        '/proxies/v8/ratings/v1/ratingLookUp': {
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
            checksNeeded: [CHECK.ROLE],
        },
        '/proxies/v8/moderatoradmin/feedback/persist/text/moderated': {
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
            ],
            checksNeeded: [CHECK.ROLE],
        },
        '/proxies/v8/moderatoradmin/feedback/text/fetch': {
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
            ],
            checksNeeded: [CHECK.ROLE],
        },
        '/proxies/v8/moderatoradmin/profanity/type/text': {
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
            ],
            checksNeeded: [CHECK.ROLE],
        },
        '/proxies/v8/moderatoradmin/feedback/flag/values': {
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
            ],
            checksNeeded: [CHECK.ROLE],
        },
       '/proxies/v8/user/v1/positions': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/org/ext/v1/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
                ROLE.STATE_ADMIN,
            ],
        },
        '/proxies/v8/user/basicInfo': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/user/basicProfileUpdate': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/user/v1/bulkupload': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/user/v1/bulkupload/:orgId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/otp/v1/generate': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/otp/v1/verify': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/user/v1/notificationPreference': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
      '/proxies/v8/user/assessment/retake/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/mdo/content/v3/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/mdo/content/v3/hierarchy/update': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/mdo/content/v3/update/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/mdo/content/v3/publish/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/mdo/content/v3/batch/addUser': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/mdo/content/v3/batch/removeUser': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/user/offensive/data/flag': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/user/offensive/data/flag/getFlaggedData': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/masterData/v1/upsert': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/user/v1/bulkuser/download/:id' : {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/workflow/position/update': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/workflow/org/update': {
           checksNeeded: [CHECK.ROLE],
           // tslint:disable-next-line: object-literal-sort-keys
           ROLE_CHECK: [
               ROLE.SPV_ADMIN,
               ROLE.MDO_ADMIN,
               ROLE.MDO_LEADER,
           ],
       },
       '/proxies/v8/workflow/domain/update': {
           checksNeeded: [CHECK.ROLE],
           // tslint:disable-next-line: object-literal-sort-keys
           ROLE_CHECK: [
               ROLE.SPV_ADMIN,
               ROLE.MDO_ADMIN,
               ROLE.MDO_LEADER,
           ],
       },
       '/proxies/v8/workflow/position/search': {
           checksNeeded: [CHECK.ROLE],
           // tslint:disable-next-line: object-literal-sort-keys
           ROLE_CHECK: [
               ROLE.SPV_ADMIN,
               ROLE.MDO_ADMIN,
               ROLE.MDO_LEADER,
           ],
       },
       '/proxies/v8/workflow/org/search': {
           checksNeeded: [CHECK.ROLE],
           // tslint:disable-next-line: object-literal-sort-keys
           ROLE_CHECK: [
               ROLE.SPV_ADMIN,
               ROLE.MDO_ADMIN,
               ROLE.MDO_LEADER,
           ],
       },
       '/proxies/v8/workflow/domain/search': {
           checksNeeded: [CHECK.ROLE],
           // tslint:disable-next-line: object-literal-sort-keys
           ROLE_CHECK: [
               ROLE.SPV_ADMIN,
               ROLE.MDO_ADMIN,
               ROLE.MDO_LEADER,
           ],
       },
       '/protected/v8/user/evaluate/assessment/submit/v4': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/user/assessment/v4/result': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/ratings/v2/read': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
       '/proxies/v8/workflow/blendedprogram/enrol': {
           checksNeeded: [CHECK.ROLE],
           // tslint:disable-next-line: object-literal-sort-keys
           ROLE_CHECK: [
               ROLE.PUBLIC,
           ],
       },
       '/proxies/v8/workflow/blendedprogram/search': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PROGRAM_COORDINATOR,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.PROGRAM_COORDINATOR,
            ],
        },
        '/proxies/v8/workflow/blendedprogram/searchv2/pc': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PROGRAM_COORDINATOR,
            ],
        },
        '/proxies/v8/workflow/blendedprogram/searchv2/mdo': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/workflow/blendedprogram/user/search': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/workflow/blendedprogram/update/pc': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PROGRAM_COORDINATOR,
            ],
        },
        '/proxies/v8/workflow/blendedprogram/update/mdo': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/workflow/blendedprogram/read/mdo/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/workflow/blendedprogram/read/pc/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PROGRAM_COORDINATOR,
            ],
        },
        '/proxies/v8/workflow/blendedprogram/v1/stats': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBP_ADMIN,
                ROLE.PROGRAM_COORDINATOR,
            ],
        },
        '/proxies/v8/storage/v1/report/:reportType/:date/:orgId/:fileName': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.CBP_ADMIN,
                ROLE.PROGRAM_COORDINATOR,
                ROLE.CONTENT_CREATOR,
            ],
        },
        '/proxies/v8/batchsesion/qrcode/:courseid/:batchid': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/workflow/blendedprogram/admin/enrol' : {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/blendedprogram/v1/update/progress': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PROGRAM_COORDINATOR,
            ],
        },
        '/proxies/v8/workflow/blendedprogram/remove/pc': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PROGRAM_COORDINATOR,
            ],
        },
        '/proxies/v8/workflow/blendedprogram/remove/mdo': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/course/v1/batch/read/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/blendedprogram/v1/getUserContentProgress': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PROGRAM_COORDINATOR,
            ],
        },
        '/proxies/v8/user/v1/feed/:userId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/user/feed/v1/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/user/feed/v1/delete': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/user/feed/v1/update': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
       '/proxies/v8/faq/v1/assistant/configs/language': {
           checksNeeded: [CHECK.ROLE],
           // tslint:disable-next-line: object-literal-sort-keys
           ROLE_CHECK: [
               ROLE.PUBLIC,
           ],
       },
       '/proxies/v8/faq/v1/assistant/available/language': {
           checksNeeded: [CHECK.ROLE],
           // tslint:disable-next-line: object-literal-sort-keys
           ROLE_CHECK: [
               ROLE.PUBLIC,
           ],
       },
        '/proxies/v8/curatedprogram/v1/enrol': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/workflow/blendedprogram/enrol/status/count': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/workflow/blendedprogram/unenrol': {
           checksNeeded: [CHECK.ROLE],
           // tslint:disable-next-line: object-literal-sort-keys
           ROLE_CHECK: [
               ROLE.PUBLIC,
           ],
       },
       '/proxies/v8/storage/v1/reportInfo/:orgId': {
           checksNeeded: [CHECK.ROLE],
           // tslint:disable-next-line: object-literal-sort-keys
           ROLE_CHECK: [
               ROLE.MDO_ADMIN,
               ROLE.MDO_LEADER,
               ROLE.CBP_ADMIN,
               ROLE.PROGRAM_COORDINATOR,
               ROLE.CONTENT_CREATOR,
           ],
        },
        '/proxies/v8/program/v1/admin/enrol': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PROGRAM_COORDINATOR,
                ROLE.CBP_ADMIN,
                ROLE.MDO_ADMIN,
                ROLE.CONTENT_CREATOR,
            ],
        },
       '/proxies/v8/user/v1/admin/extPatch': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.MDO_ADMIN,
                    ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/trending/content/search': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/read/user/insights': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/storage/profilePhotoUpload/:cloudFolderName': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/user/v1/admin/autocomplete/:searchTerm': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.MDO_ADMIN,
                    ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/competency/v4/search': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.CONTENT_CREATOR,
                    ROLE.CONTENT_PUBLISHER,
                    ROLE.CONTENT_REVIEWER,
                    ROLE.MDO_ADMIN,
                    ROLE.MDO_LEADER,
                    ROLE.PUBLIC,
                    ROLE.SPV_PUBLISHER,
            ],
        },
        '/proxies/v8/competency/v4/read/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/competency/v4/upsert': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.MDO_ADMIN,
                    ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/competency/v4/update/relation': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.MDO_ADMIN,
                    ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/cbplan/v1/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.MDO_ADMIN,
                    ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/cbplan/v1/update': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.MDO_ADMIN,
                    ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/cbplan/v1/publish': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.MDO_ADMIN,
                    ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/masterData/v2/deptPosition': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.MDO_ADMIN,
                    ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/masterData/v2/admin/deptPosition': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.PROGRAM_COORDINATOR,
            ],
        },
        '/proxies/v8/cbplan/v1/archive': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.MDO_ADMIN,
                    ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/cbplan/v1/read/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.MDO_ADMIN,
                    ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/cbplan/v1/list': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.MDO_ADMIN,
                    ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/halloffame/read': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/user/v1/cbplan': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/karmapoints/read': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/karmapoints/user/course/read': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/data/v1/system/settings/get/defaultCertTemplate': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
               ROLE.CONTENT_CREATOR,
               ROLE.PROGRAM_COORDINATOR,
            ],
        },
        '/proxies/v8/course/batch/cert/v1/template/add': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.PROGRAM_COORDINATOR,
            ],
        },
        '/proxies/v8/claimkarmapoints': {
          checksNeeded: [CHECK.ROLE],
          // tslint:disable-next-line: object-literal-sort-keys
          ROLE_CHECK: [
              ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/login/entry': {
          checksNeeded: [CHECK.ROLE],
          // tslint:disable-next-line: object-literal-sort-keys
          ROLE_CHECK: [
              ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/user/totalkarmapoints': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
              ],
          },
        '/proxies/v8/cbplan/v1/admin/requestcontent': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.MDO_ADMIN,
                    ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/storage/v1/spvReport/:reportType/:date/:fileName': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
            ],
        },
       '/proxies/v8/storage/v1/spvReportInfo/:date': {
           checksNeeded: [CHECK.ROLE],
           // tslint:disable-next-line: object-literal-sort-keys
           ROLE_CHECK: [
               ROLE.SPV_ADMIN,
           ],
        },

        '/proxies/v8/sunbirdigot/v4/search': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/user/v1/content/recommend': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/ehrms/details': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
              ],
          },
       '/proxies/v8/wheebox/read': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
              ],
          },
        '/proxies/v8/program/v2/admin/bulkEnroll': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PROGRAM_COORDINATOR,
                ROLE.CONTENT_CREATOR,
              ],
          },
        '/proxies/v8/operationalreports/admin/grantaccess': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_LEADER,
              ],
          },
        '/proxies/v8/openprogram/v1/enrol': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/operationalreports/download': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_LEADER,
                ROLE.MDO_ADMIN,
              ],
          },
        '/proxies/v8/halloffame/learnerleaderboard': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.PUBLIC,
            ],
        },

        '/proxies/v8/otp/v3/generate': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/otp/v3/verify': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/user/otp/v2/extPatch': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/operationalreports/v1/reportInfo': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_LEADER,
                ROLE.MDO_ADMIN,
            ],
        },
        '/proxies/v8/operationalreports/leader/readaccess': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_LEADER,
            ],
        },
        '/proxies/v8/operationalreports/admin/readaccess': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
            ],
        },
        '/proxies/v8/workflow/admin/bulkupdate/getstatus': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
             ],
         },
         '/proxies/v8/workflow/admin/transition/bulkupdate': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
             ],
         },
         '/proxies/v8/workflow/admin/bulkuploadfile/download/:fileName': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
             ],
         },
        '/proxies/v8/surveys/mlsurvey/v1/details': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
             ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
          },
        '/proxies/v8/surveySubmissions/mlsurvey/v1/update/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
                ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/cloud-services/mlcore/v1/files/preSignedUrls': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
                ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/cloud-services/mlcore/v1/files/upload': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
                ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/observations/mlsurvey/v1/assessment/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
                ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/observationSubmissions/mlsurvey/v1/update/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
                ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/observations/mlsurvey/v1/entities': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
                ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
          '/proxies/v8/course/v1/batch/getParticipants': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
              ],
          },
          '/proxies/v8/catalog/v1/sector': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
              ],
          },
          '/proxies/v8/content/v2/discard/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
              ],
          },
          '/proxies/v8/catalog/v1/sector/read/:sectorId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
              ],
          },
          '/proxies/v8/catalog/v1/sector/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
              ],
          },
          '/proxies/v8/catalog/v1/subsector/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
              ],
          },

        '/proxies/v8/calendar/v4/read/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },

        '/proxies/v8/calendar/v4/publish/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBP_ADMIN,
            ],
        },
        '/proxies/v8/calendar/v4/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBP_ADMIN,
            ],
        },
        '/proxies/v8/calendar/v4/update/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBP_ADMIN,
            ],
        },
        '/proxies/v8/calendar/v4/retire/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBP_ADMIN,
            ],
        },
        '/proxies/v8/calendar/v1/bulkUpload': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBP_ADMIN,
            ],
        },
          '/proxies/v8/careers/v4/read/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/careers/v4/publish/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/careers/v4/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/careers/v4/update/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/ext-forms/v1/form/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.PUBLIC,
            ],
        },
        '/v1/form/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/ext-forms/v1/form/read': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.PUBLIC,
            ],
        },
        '/v1/form/read': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/ext-forms/v1/form/update': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.PUBLIC,
            ],
        },
        '/v1/form/update': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/ext-forms/v1/form/list': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.PUBLIC,
            ],
        },
        '/v1/form/list': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/ext-forms/v1/form/fetchAll': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.PUBLIC,
            ],
        },
        '/v1/form/fetchAll': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/microsite/read/insights': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/msite/content/aggregation/search': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                    ROLE.PUBLIC,
                ],
        },
        '/proxies/v8/workflow/v2/userWFApplicationFieldsSearch': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/ratings/v1/topReviews/:orgId': {
           ROLE_CHECK: [
              ROLE.PUBLIC,
            ],
          checksNeeded: [CHECK.ROLE],
       },
        '/proxies/v8/storage/orgStoreUpload': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
              ROLE.SPV_ADMIN,
              ROLE.MDO_ADMIN,
            ],
        },
       '/proxies/v8/demand/content/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/demand/content/read/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/demand/content/delete/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/demand/content/search': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
               ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/playList/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_PUBLISHER,
            ],
        },
        '/proxies/v8/playList/update': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_PUBLISHER,
                ROLE.CONTENT_CREATOR,
            ],
        },
        '/proxies/v8/playList/search': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/playList/delete/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_PUBLISHER,
            ],
        },
        '/proxies/v8/user/assessment/v5/result': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/user/assessment/v5/retake/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/user/evaluate/assessment/submit/v5': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/assessment/v5/read/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/question/v5/read': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/interest/v1/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBP_ADMIN,
                ROLE.CONTENT_CREATOR,
            ],
        },
        '/proxies/v8/interest/v1/search': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/interest/v1/assign': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/interest/v1/read/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
      '/proxies/v8/assessment/save': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/demand/content/v1/update/status': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
                ROLE.CONTENT_CREATOR,
              ],
        },
        '/proxies/v8/orgBookmark/v1/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/orgBookmark/v1/update': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/orgBookmark/v1/search': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/orgBookmark/v1/read/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/orgBookmark/v1/delete/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/playList/v2/search': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/playList/read/:id/:orgId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/announcements/v1/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/announcements/v1/update': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/announcements/v1/search': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/announcements/v1/read/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/announcements/v1/delete/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_LEADER,
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/assessment/savepoint': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/playList/v2/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_PUBLISHER,
            ],
        },
        '/proxies/v8/playList/v2/update': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
                ROLE.MDO_ADMIN,
                ROLE.MDO_LEADER,
                ROLE.SPV_PUBLISHER,
                ROLE.CONTENT_CREATOR,
            ],
        },
        '/proxies/v8/playList/v2/read/:id/:playListId/:orgId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/cios/v1/onboardContent': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
              ROLE.SPV_ADMIN,
              ROLE.MDO_ADMIN,
              ROLE.CBP_ADMIN,
            ],
        },
        '/proxies/v8/cios/v1/content/read/:contentId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
              ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/cios/v1/search/content': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
              ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/cios/v1/content/delete/:contentId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
              ROLE.SPV_ADMIN,
              ROLE.MDO_ADMIN,
              ROLE.CBP_ADMIN,
            ],
        },
        '/proxies/v8/ciosIntegration/v1/loadContentFromExcel': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
              ROLE.SPV_ADMIN,
              ROLE.MDO_ADMIN,
              ROLE.CBP_ADMIN,
            ],
        },
        '/proxies/v8/ciosIntegration/v1/readAllContentFromDb': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
              ROLE.SPV_ADMIN,
              ROLE.MDO_ADMIN,
              ROLE.CBP_ADMIN,
            ],
        },
          '/proxies/v8/tenders/v4/read/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/tenders/v4/publish/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/tenders/v4/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/tenders/v4/update/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/user/v2/bulkupload': {
                    checksNeeded: [CHECK.ROLE],
                    // tslint:disable-next-line: object-literal-sort-keys
                    ROLE_CHECK: [
                        ROLE.MDO_ADMIN,
                        ROLE.MDO_LEADER,
                    ],
        },
        '/proxies/v8/workflow/admin/v2/bulkupdate/transition': {
                    checksNeeded: [CHECK.ROLE],
                    // tslint:disable-next-line: object-literal-sort-keys
                    ROLE_CHECK: [
                        ROLE.MDO_ADMIN,
                        ROLE.MDO_LEADER,
                     ],
         },
         '/proxies/v8/playList/v1/search/program': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
         },
          '/proxies/v8/framework/v1/publish/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
         },
          '/proxies/v8/workflow/admin/pending/request': {
                    checksNeeded: [CHECK.ROLE],
                    // tslint:disable-next-line: object-literal-sort-keys
                    ROLE_CHECK: [
                        ROLE.MDO_ADMIN,
                        ROLE.MDO_LEADER,
                    ],
         },
    },
    URL_PATTERN:
        [
            // '/authApi/content/v3/create',
            // '/authApi/content/v3/read/:do_id',
            // '/authApi/content/v3/update/:do_id',
            '/authApi/readBatch/:batchId',
            '/authApi/batch/:key',
            '/authApi/readCert/:certId',
            '/proxies/v8/api/user/v2/read',
            '/proxies/v8/api/user/v2/read/:id',
            '/proxies/v8/api/user/v5/read',
            '/proxies/v8/api/user/v5/read/:id',
            '/proxies/v8/user/v1/updateLogin',
            '/proxies/v8/event/v4/read/:do_id',
            '/proxies/v8/event/v4/publish/:do_id',
            '/proxies/v8/event/v4/create',
            '/proxies/v8/event/v4/update/:do_id',
            '/proxies/v8/event/v4/retire/:do_id',
            '/proxies/v8/user/v1/read/:id',
            '/proxies/v8/contentsearch/search',
            '/proxies/v8/sunbirdigot/read',
            '/proxies/v8/sunbirdigot/search',
            '/proxies/v8/discussion/user/v1/create',
            '/proxies/v8/data/v1/system/settings/get/orgTypeList',
            '/proxies/v8/data/v1/system/settings/get/notificationPreference',
            '/proxies/v8/org/v1/search',
            '/proxies/v8/org/v1/update',
            '/proxies/v8/notifyContentState',
            '/proxies/v8/discussion/topic/:id/:slug',
            '/proxies/v8/discussion/v2/posts/:id/vote',
            '/proxies/v8/discussion/v2/posts/:id',
            '/proxies/v8/discussion/v2/posts/:id/bookmark',
            '/proxies/v8/discussion/moderation/producer',
            '/proxies/v8/discussion/moderation/consumer',
            '/proxies/v8/learner/course/v1/user/enrollment/list/:id',
            '/proxies/v8/learner/course/v2/user/enrollment/list/:id',
            '/proxies/v8/learner/certreg/v1/certs/validate',
            '/proxies/v8/read/content-progres/:do_id',
            '/proxies/v8/content-progres/:do_id',
            '/proxies/v8/action/content/v3/hierarchy/:do_id',
            '/proxies/v8/action/content/v3/hierarchyUpdate',
            '/proxies/v8/action/content/v3/hierarchy/update',
            '/proxies/v8/action/content/v3/read/:do_id',
            '/proxies/v8/discussion/forum/v2/read',
            '/proxies/v8/discussion/category/list',
            '/proxies/v8/discussion/category/:id',
            '/proxies/v8/discussion/forum/tags',
            '/proxies/v8/action/content/v3/update/:do_id',
            '/proxies/v8/discussion/user/:id',
            '/proxies/v8/action/content/v3/create',
            '/proxies/v8/upload/action/content/v3/upload/:do_id',
            '/proxies/v8/v1/content/retire',
            '/proxies/v8/action/content/v3/copy/:do_id',
            '/proxies/v8/action/content/v3/updateReviewStatus/:do_id',
            '/proxies/v8/action/content/v3/review/:do_id',
            '/proxies/v8/discussion/recent',
            '/proxies/v8/discussion/popular',
            '/proxies/v8/action/content/v3/publish/:do_id',
            '/proxies/v8/action/content/v3/reject/:do_id',
            '/proxies/v8/user/private/v1/assign/role',
            '/proxies/v8/user/v1/search',
            '/proxies/v8/org/v1/read',
            '/proxies/v8/org/v1/profile/read',
            '/proxies/v8/org/v1/profile/patch',
            '/proxies/v8/org/v1/create',
            '/proxies/v8/discussion/tags',
            '/proxies/v8/user/v1/block',
            '/proxies/v8/user/v1/unblock',
            '/proxies/v8/data/v1/system/settings/get/orgTypeConfig',
            '/proxies/v8/learnervm/private/content/v3/publish/:do_id',
            '/proxies/v8/learnervm/private/content/v3/review/:do_id',
            '/proxies/v8/discussion/v2/topics',
            '/proxies/v8/discussion/v2/topics/:id',
            '/proxies/v8/discussion/v2/categories',
            '/proxies/v8/discussion/tags/:tag',
            '/proxies/v8/discussion/user/:userKey/bookmarks',
            '/proxies/v8/discussion/user/:userKey/bookmark',
            '/proxies/v8/discussion/user/:userKey/upvoted',
            '/proxies/v8/discussion/user/:userKey/downvoted',
            '/proxies/v8/discussion/categories',
            '/proxies/v8/discussion/mainCategories',
            '/proxies/v8/user/v1/autocomplete/:key',
            '/proxies/v8/user/v1/migrate',
            '/proxies/v8/user/private/v1/migrate',
            '/proxies/v8/user/private/v1/assign/role/userrole',
            '/proxies/v8/learnervm/private/content/v3/retire/',
            '/proxies/v8/private/content/v3/update/:do_id',
            '/proxies/v8/dashboard/analytics/getDashboardConfig/Karmayogi/:comp',
            '/proxies/v8/dashboard/analytics/getDashboardsForProfile/Karmayogi',
            '/proxies/v8/dashboard/analytics/getChartV2/Karmayogi',
            '/proxies/v8/wat/dashboard/getDashboardConfig/Karmayogi/overview',
            '/proxies/v8/forms/createForm',
            '/proxies/v8/forms/getFormById',
            '/proxies/v8/forms/getCollectiveAggregation',
            '/proxies/v8/forms/getAllForms',
            '/proxies/v8/forms/v1/saveFormSubmit',
            '/proxies/v8/forms/getAllApplications',
            '/proxies/v8/forms/tagFormToCourse',
            '/proxies/v8/forms/untagFormToCourse',
            '/proxies/v8/forms/searchForms',
            '/proxies/v8/forms/getCourseListForSurveys',
            '/protected/v8/user/profileDetails/test',
            '/protected/v8/resource/',
            '/protected/v8/user/details',
            '/protected/v8/connections/connections/recommended/userDepartment',
            '/protected/v8/discussionHub/categories/:cid/:slug?/:tid?',
            '/protected/v8/discussionHub/topics/recent',
            '/protected/v8/cohorts/:cohortType/:contentId',
            '/protected/v8/user/content/like',
            '/protected/v8/user/telemetry',
            '/protected/v8/scrom/get/:id',
            '/protected/v8/user/progress/:contentId',
            '/protected/v8/user/rating/:contentId',
            '/protected/v8/user/progress',
            '/protected/v8/user/history/continue',
            '/protected/v8/portal/departmentType/',
            '/protected/v8/portal/spv/department',
            '/protected/v8/portal/spv/deptAction/',
            '/protected/v8/user/roles/getUsersV2',
            '/protected/v8/portal/spv/mydepartment',
            '/protected/v8/portal/mdo/mydepartment',
            '/protected/v8/user/profileDetails/createUser',
            '/protected/v8/user/profileRegistry/getUserRegistryByUser/:id',
            '/protected/v8/user/profileRegistry/createUserRegistryV2',
            '/protected/v8/user/profileRegistry/createUserRegistry',
            '/protected/v8/portal/deptAction',
            '/protected/v8/workflowhandler/historyByApplicationId/:applicationId',
            '/protected/v8/user/autocomplete/:query',
            '/protected/v8/portal/spv/deptAction/userrole',
            '/protected/v8/user/preference',
            '/protected/v8/workflowhandler/applicationsSearch',
            '/protected/v8/workallocation/getWorkOrders',
            '/protected/v8/workallocation/add/workorder',
            '/protected/v8/workallocation/getWorkOrderById/:workOrderId',
            '/protected/v8/workallocation/user/autocomplete/:searchTerm',
            '/protected/v8/workallocation/getUserCompetencies/:userId',
            '/protected/v8/frac/searchNodes',
            '/protected/v8/frac/filterByMappings',
            '/protected/v8/frac/:type/:key',
            '/protected/v8/workallocation/v2/add',
            '/protected/v8/workallocation/getWorkAllocationById/:workAllocationId',
            '/protected/v8/workallocation/update/workorder',
            '/protected/v8/workallocation/v2/update',
            '/protected/v8/workallocation/getWOPdf/:workOrderId',
            '/protected/v8/portal/cbp/mydepartment',
            '/protected/v8/user/mandatoryContent/checkStatus',
            '/protected/v8/contentprivate/update/:do_id',
            '/protected/v8/contentprivate/migratepublisher/:do_id',
            '/protected/v8/contentprivate/migratereviewer/:do_id',
            '/protected/v8/user/rating/content/average-ratingInfo/:do_id',
            '/protected/v8/social/post/timeline',
            '/protected/v8/user/history/:id',
            '/protected/v8/frac/getAllNodes/:type',
            '/protected/v8/frac/getNodeById/:id/:type',
            '/protected/v8/portal/listDeptNames',
            '/proxies/v8/portal/v1/admin/listDeptNames',
            '/protected/v8/scroing/getTemplate/:templateId',
            '/protected/v8/portal/cbc/department',
            '/protected/v8/portal/cbc/department/:deptId/',
            '/protected/v8/portal/spv/department/:deptId/',
            '/protected/v8/scroing/calculate',
            // '/protected/v8/connections/connections/recommended',
            // '/protected/v8/connections/connections/requests/received',
            // '/protected/v8/connections/connections/established',
            // '/protected/v8/connections/connections/established/:id',
            // '/protected/v8/connections/connections/requested',
            // '/protected/v8/connections/add/connection',
            // '/protected/v8/connections/connections/suggests',
            '/protected/v8/cohorts/course/getUsersForBatch/:courseId',
            '/protected/v8/cohorts/course/getUsersForBatch/:batchId/:deptName',
            '/protected/v8/cohorts/user/autoenrollment/:courseId',
            '/protected/v8/profanity/startPdfProfanity',
            '/protected/v8/profanity/getPdfProfanityForContent/:contentId',
            '/protected/v8/catalog',
            '/protected/v8/scroing/fetch',
            '/protected/v8/portal/mdo/deptAction/userrole',
            '/protected/v8/user/profileDetails/updateUser',
            '/protected/v8/frac/addDataNodeBulk',
            '/protected/v8/roleactivity/:txt',
            '/protected/v8/connections/update/connection',
            '/protected/v8/workflowhandler/userWFApplicationFieldsSearch',
            '/protected/v8/user/details/detailV1',
            '/protected/v8/user/profileRegistry/getMasterNationalities',
            '/protected/v8/user/profileRegistry/getMasterCountries',
            '/protected/v8/user/profileRegistry/getMasterLanguages',
            '/protected/v8/user/profileRegistry/getProfilePageMeta',
            '/protected/v8/user/notifications/settings',
            '/protected/v8/user/profileRegistry/searchUserRegistry',
            '/protected/v8/workflowhandler/transition',
            '/protected/v8/workflowhandler/nextActionSearch/:serviceName/:state',
            '/protected/v8/workflowhandler/historyByApplicationIdAndWfId/:applicationId/:wfId',
            '/protected/v8/workflowhandler/workflowProcess/:wfId',
            '/protected/v8/workflowhandler/updateUserProfileWf',
            '/protected/v8/workflowhandler/userWfSearch',
            '/protected/v8/user/profileRegistry/getUserRegistryById',
            '/protected/v8/user/profileRegistry/getUserRegistryById/:id',
            '/protected/v8/workallocation/copy/workOrder',
            '/reset',
            '/protected/v8/user/evaluate/assessment/submit/v2',
            '/protected/v8/user/evaluate/assessment/submit/v3',
            '/protected/v8/connections/v2/connections/recommended/userDepartment',
            '/protected/v8/connections/v2/connections/recommended',
            '/protected/v8/connections/v2/connections/requests/received',
            '/protected/v8/connections/v2/connections/established',
            '/protected/v8/connections/v2/connections/established/:id',
            '/protected/v8/connections/v2/connections/requested',
            '/protected/v8/connections/v2/add/connection',
            '/protected/v8/connections/v2/connections/suggests',
            '/protected/v8/connections/v2/update/connection',
            '/protected/v8/user/profileDetails/createUserWithoutInvitationEmail',
            '/proxies/v8/searchBy/:key',
            '/proxies/v8/staff/position',
            '/proxies/v8/staff/position/:orgId',
            '/proxies/v8/budget/scheme',
            '/proxies/v8/budget/scheme/:orgId',
            '/proxies/v8/budget/scheme/:orgId/:budgetYear',
            '/proxies/v8/orghistory/:orgId/:key',
            '/proxies/v8/discussion/user/uid/:uid',
            '/proxies/v8/discussion/user/:username/posts',
            '/proxies/v8/action/framework/v3/read/:id',
            '/proxies/v8/action/framework/v3/category/master/create',
            '/proxies/v8/action/framework/v3/category/master/search',
            '/proxies/v8/action/framework/v3/category/master/read/:id',
            '/proxies/v8/action/framework/v3/category/create',
            '/proxies/v8/action/framework/v3/category/read/:id',
            '/proxies/v8/action/framework/v3/category/retire/:id',
            '/proxies/v8/action/framework/v3/term/create',
            '/proxies/v8/action/content/v3/upload/:do_id',
            '/proxies/v8/learner/course/v1/batch/list',
            '/protected/v8/cohorts/course/batch/cert/download/:certId',
            '/public/v8/cohorts/course/batch/cert/download/mobile',
            '/protected/v8/cohorts/course/batch/cert/issue',
            '/protected/v8/cohorts/course/batch/cert/template/add',
            '/proxies/v8/storage/upload',
            '/proxies/v8/storage/delete',
            '/proxies/v8/user/v1/extPatch',
            '/proxies/v8/learner/course/v2/user/enrollment/admin/list',
            '/protected/v8/frac/bookmarkDataNode',
            '/proxies/v8/assessment/read/:id',
            '/proxies/v8/question/read',
            '/proxies/v8/cbp/question/list',
            '/proxies/v8/questionset/v1/create',
            '/proxies/v8/questionset/v1/read/:id',
            '/proxies/v8/questionset/v1/update/:id',
            '/proxies/v8/questionset/v1/review/:id',
            '/proxies/v8/questionset/v1/publish/:id',
            '/proxies/v8/questionset/v1/hierarchy/update',
            '/proxies/v8/questionset/v1/retire/:id',
            '/proxies/v8/questionset/v1/reject/:id',
            '/proxies/v8/questionset/v1/hierarchy/:id',
            '/proxies/v8/ratings/v1/read/:activityId/:activityType/:userId',
            '/proxies/v8/ratings/v1/upsert',
            '/proxies/v8/ratings/v1/summary/:activityId/:activityType',
            '/proxies/v8/ratings/v1/ratingLookUp',
            '/proxies/v8/moderatoradmin/feedback/persist/text/moderated',
            '/proxies/v8/moderatoradmin/feedback/text/fetch',
            '/proxies/v8/moderatoradmin/profanity/type/text',
            '/proxies/v8/moderatoradmin/feedback/flag/values',
            '/proxies/v8/user/v1/positions',
            '/proxies/v8/org/ext/v1/create',
            '/proxies/v8/user/basicInfo',
            '/proxies/v8/user/basicProfileUpdate',
            '/proxies/v8/user/v1/bulkupload',
            '/proxies/v8/user/v1/bulkupload/:orgId',
            '/proxies/v8/otp/v1/generate',
            '/proxies/v8/otp/v1/otp',
            '/proxies/v8/user/v1/notificationPreference',
            '/proxies/v8/user/assessment/retake/:id',
            '/proxies/v8/mdo/content/v3/create',
            '/proxies/v8/mdo/content/v3/hierarchy/update',
            '/proxies/v8/mdo/content/v3/update/:do_id',
            '/proxies/v8/mdo/content/v3/publish/:do_id',
            '/proxies/v8/mdo/content/v3/batch/addUser',
            '/proxies/v8/mdo/content/v3/batch/removeUser',
            '/proxies/v8/user/offensive/data/flag',
            '/proxies/v8/user/offensive/data/flag/getFlaggedData',
            '/proxies/v8/masterData/v1/upsert',
            '/proxies/v8/user/v1/bulkuser/download/:id',
            '/proxies/v8/workflow/position/update',
            '/proxies/v8/workflow/org/update',
            '/proxies/v8/workflow/domain/update',
            '/proxies/v8/workflow/position/search',
            '/proxies/v8/workflow/org/search',
            '/proxies/v8/workflow/domain/search',
            '/protected/v8/user/evaluate/assessment/submit/v4',
            '/proxies/v8/user/assessment/v4/result',
            '/proxies/v8/ratings/v2/read',
            '/proxies/v8/workflow/blendedprogram/enrol',
            '/proxies/v8/workflow/blendedprogram/search',
            '/proxies/v8/workflow/blendedprogram/searchv2/pc',
            '/proxies/v8/workflow/blendedprogram/searchv2/mdo',
            '/proxies/v8/workflow/blendedprogram/user/search',
            '/proxies/v8/workflow/blendedprogram/update/pc',
            '/proxies/v8/workflow/blendedprogram/update/mdo',
            '/proxies/v8/workflow/blendedprogram/read/mdo/:id',
            '/proxies/v8/workflow/blendedprogram/read/pc/:id',
            '/proxies/v8/workflow/blendedprogram/v1/stats',
            '/proxies/v8/storage/v1/report/:reportType/:date/:orgId/:fileName',
            '/proxies/v8/workflow/blendedprogram/admin/enrol',
            '/proxies/v8/batchsesion/qrcode/:courseid/:batchid',
            '/proxies/v8/blendedprogram/v1/update/progress',
            '/proxies/v8/workflow/blendedprogram/remove/pc',
            '/proxies/v8/workflow/blendedprogram/remove/mdo',
            '/proxies/v8/course/v1/batch/read/:id',
            '/proxies/v8/blendedprogram/v1/getUserContentProgress',
            '/proxies/v8/user/v1/feed/:userId',
            '/proxies/v8/user/feed/v1/create',
            '/proxies/v8/user/feed/v1/delete',
            '/proxies/v8/user/feed/v1/update',
            '/proxies/v8/faq/v1/assistant/configs/language',
            '/proxies/v8/faq/v1/assistant/available/language',
            '/proxies/v8/curatedprogram/v1/enrol',
            '/proxies/v8/workflow/blendedprogram/enrol/status/count',
            '/proxies/v8/workflow/blendedprogram/unenrol',
            '/proxies/v8/storage/v1/reportInfo/:orgId',
            '/proxies/v8/program/v1/admin/enrol',
            '/proxies/v8/user/v1/admin/extPatch',
            '/proxies/v8/trending/content/search',
            '/proxies/v8/read/user/insights',
            '/proxies/v8/storage/profilePhotoUpload/:cloudFolderName',
            '/proxies/v8/user/v1/admin/autocomplete/:searchTerm',
            '/proxies/v8/data/v1/system/settings/get/defaultCertTemplate',
            '/proxies/v8/course/batch/cert/v1/template/add',
            '/proxies/v8/competency/v4/search',
            '/proxies/v8/competency/v4/read/:id',
            '/proxies/v8/competency/v4/upsert',
            '/proxies/v8/competency/v4/update/relation',
            '/proxies/v8/cbplan/v1/create',
            '/proxies/v8/cbplan/v1/update',
            '/proxies/v8/cbplan/v1/publish',
            '/proxies/v8/masterData/v2/deptPosition',
            '/proxies/v8/masterData/v2/admin/deptPosition',
            '/proxies/v8/cbplan/v1/archive',
            '/proxies/v8/cbplan/v1/read/:id',
            '/proxies/v8/cbplan/v1/list',
            '/proxies/v8/halloffame/read',
            '/proxies/v8/user/v1/cbplan',
            '/proxies/v8/karmapoints/read',
            '/proxies/v8/karmapoints/user/course/read',
            '/proxies/v8/claimkarmapoints',
            '/proxies/v8/login/entry',
            '/proxies/v8/user/totalkarmapoints',
            '/proxies/v8/cbplan/v1/admin/requestcontent',
            '/proxies/v8/storage/v1/spvReport/:reportType/:date/:fileName',
            '/proxies/v8/storage/v1/spvReportInfo/:date',
            '/proxies/v8/ehrms/details',
            '/proxies/v8/wheebox/read',
            '/proxies/v8/sunbirdigot/v4/search',
            '/proxies/v8/user/v1/content/recommend',
            '/proxies/v8/program/v2/admin/bulkEnroll',
            '/proxies/v8/operationalreports/admin/grantaccess',
            '/proxies/v8/openprogram/v1/enrol',
            '/proxies/v8/operationalreports/download',
            '/proxies/v8/halloffame/learnerleaderboard',
            '/proxies/v8/otp/v3/generate',
            '/proxies/v8/otp/v3/verify',
            '/proxies/v8/user/otp/v2/extPatch',
            '/proxies/v8/operationalreports/v1/reportInfo',
            '/proxies/v8/operationalreports/leader/readaccess',
            '/proxies/v8/operationalreports/admin/readaccess',
            '/proxies/v8/workflow/admin/bulkupdate/getstatus',
            '/proxies/v8/workflow/admin/transition/bulkupdate',
            '/proxies/v8/workflow/admin/bulkuploadfile/download/:fileName',
            '/proxies/v8/surveys/mlsurvey/v1/details',
            '/proxies/v8/surveySubmissions/mlsurvey/v1/update/:id',
            '/proxies/v8/cloud-services/mlcore/v1/files/preSignedUrls',
            '/proxies/v8/observations/mlsurvey/v1/assessment/:id',
            '/proxies/v8/observationSubmissions/mlsurvey/v1/update/:id',
            '/proxies/v8/observations/mlsurvey/v1/entities',
            '/proxies/v8/cloud-services/mlcore/v1/files/upload',
            '/proxies/v8/course/v1/batch/getParticipants',
            '/proxies/v8/catalog/v1/sector',
            '/proxies/v8/content/v2/discard/:id',
            '/proxies/v8/catalog/v1/sector/read/:sectorId',
            '/proxies/v8/catalog/v1/sector/create',
            '/proxies/v8/catalog/v1/subsector/create',
            '/proxies/v8/calendar/v4/read/:do_id',
            '/proxies/v8/calendar/v4/publish/:do_id',
            '/proxies/v8/calendar/v4/create',
            '/proxies/v8/calendar/v4/update/:do_id',
            '/proxies/v8/calendar/v4/retire/:do_id',
            '/proxies/v8/calendar/v1/bulkUpload',
            '/proxies/v8/careers/v4/read/:do_id',
            '/proxies/v8/careers/v4/publish/:do_id',
            '/proxies/v8/careers/v4/create',
            '/proxies/v8/careers/v4/update/:do_id',
            '/proxies/v8/careers/v4/retire/:do_id',
            '/proxies/v8/ext-forms/v1/form/create',
            '/v1/form/create',
            '/proxies/v8/ext-forms/v1/form/read',
            '/v1/form/read',
            '/proxies/v8/ext-forms/v1/form/update',
            '/v1/form/update',
            '/proxies/v8/ext-forms/v1/form/list',
            '/v1/form/list',
            '/proxies/v8/ext-forms/v1/form/fetchAll',
            '/v1/form/fetchAll',
            '/proxies/v8/microsite/read/insights',
            '/proxies/v8/msite/content/aggregation/search',
            '/proxies/v8/workflow/v2/userWFApplicationFieldsSearch',
            '/proxies/v8/ratings/v1/topReviews/:orgId',
            '/proxies/v8/demand/content/create',
            '/proxies/v8/demand/content/read/:do_id',
            '/proxies/v8/demand/content/delete/:do_id',
            '/proxies/v8/demand/content/search',
            '/proxies/v8/playList/create',
            '/proxies/v8/playList/update',
            '/proxies/v8/playList/search',
            '/proxies/v8/playList/delete/:do_id',
            '/proxies/v8/user/assessment/v5/result',
            '/proxies/v8/user/assessment/v5/retake/:id',
            '/protected/v8/user/evaluate/assessment/submit/v5',
            '/proxies/v8/assessment/v5/read/:id',
            '/proxies/v8/question/v5/read',
            '/proxies/v8/interest/v1/create',
            '/proxies/v8/interest/v1/search',
            '/proxies/v8/interest/v1/assign',
            '/proxies/v8/interest/v1/read/:id',
            '/proxies/v8/assessment/save',
            '/proxies/v8/demand/content/v1/update/status',
            '/proxies/v8/orgBookmark/v1/create',
            '/proxies/v8/orgBookmark/v1/update',
            '/proxies/v8/orgBookmark/v1/search',
            '/proxies/v8/orgBookmark/v1/read/:id',
            '/proxies/v8/orgBookmark/v1/delete/:id',
            '/proxies/v8/playList/v2/search',
            '/proxies/v8/playList/read/:id/:orgId',
            '/proxies/v8/announcements/v1/create',
            '/proxies/v8/announcements/v1/update',
            '/proxies/v8/announcements/v1/search',
            '/proxies/v8/announcements/v1/read/:id',
            '/proxies/v8/announcements/v1/delete/:id',
            '/proxies/v8/assessment/savepoint',
            '/proxies/v8/playList/v2/create',
            '/proxies/v8/playList/v2/update',
            '/proxies/v8/playList/v2/read/:id/:playListId/:orgId',
            '/proxies/v8/cios/v1/onboardContent',
            '/proxies/v8/cios/v1/content/read/:contentId',
            '/proxies/v8/cios/v1/search/content',
            '/proxies/v8/cios/v1/content/delete/:contentId',
            '/proxies/v8/ciosIntegration/v1/loadContentFromExcel',
            '/proxies/v8/ciosIntegration/v1/readAllContentFromDb',
            '/proxies/v8/tenders/v4/read/:do_id',
            '/proxies/v8/tenders/v4/publish/:do_id',
            '/proxies/v8/tenders/v4/create',
            '/proxies/v8/tenders/v4/update/:do_id',
            '/proxies/v8/user/v2/bulkupload',
            '/proxies/v8/workflow/admin/v2/bulkupdate/transition',
            '/proxies/v8/playList/v1/search/program',
            '/proxies/v8/framework/v1/publish/:id',
            '/proxies/v8/workflow/admin/pending/request',
           ],
}
