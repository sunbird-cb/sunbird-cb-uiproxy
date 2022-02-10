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
                ROLE.PUBLIC,
            ],
        },
        '/proxies/v8/api/user/v2/read/:id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
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
            ],
        },
        '/proxies/v8/event/v4/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
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
                ROLE.CONTENT_REVIEWER,
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
            ],
        },
        '/proxies/v8/action/content/v3/create': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
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
        '/proxies/v8/upload/action/content/v3/upload/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.EDITOR,
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
        '/proxies/v8/action/content/v3/updateReviewStatus/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_REVIEWER,
                ROLE.CONTENT_PUBLISHER,
            ],
        },
        '/proxies/v8/action/content/v3/review/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_CREATOR,
                ROLE.CONTENT_REVIEWER,
                ROLE.CONTENT_PUBLISHER,
            ],
        },
        '/proxies/v8/action/content/v3/publish/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_PUBLISHER,
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
            ],
        },
        '/proxies/v8/data/v1/system/settings/get/orgTypeList': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBC_ADMIN,
                ROLE.MDO_ADMIN,
                ROLE.SPV_ADMIN,
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
                ROLE.SPV_ADMIN,
                ROLE.CBP_ADMIN,
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
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/org/v1/update': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBC_ADMIN,
                ROLE.MDO_ADMIN,
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/user/v1/block': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.SPV_ADMIN,
                ROLE.CBP_ADMIN,
                ROLE.CONTENT_CREATOR,
            ],
        },
        '/proxies/v8/user/v1/unblock': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.SPV_ADMIN,
                ROLE.CBP_ADMIN,
                ROLE.CONTENT_CREATOR,
            ],
        },
        '/proxies/v8/data/v1/system/settings/get/orgTypeConfig': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBC_ADMIN,
                ROLE.MDO_ADMIN,
                ROLE.SPV_ADMIN,
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
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/learnervm/private/content/v3/publish/:do_id': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CONTENT_PUBLISHER,
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
                ROLE.SPV_ADMIN,
            ],
        },
        '/proxies/v8/user/private/v1/migrate': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBC_ADMIN,
                ROLE.MDO_ADMIN,
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
            ],
        },
        '/protected/v8/user/profileDetails/createUser': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.SPV_ADMIN,
                ROLE.CBP_ADMIN,
                ROLE.CONTENT_CREATOR,
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
                ROLE.SPV_ADMIN,
            ],
        },
        '/protected/v8/workflowhandler/historyByApplicationId/:applicationId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
                ROLE.WAT_MEMBER,
                ROLE.CBC_ADMIN,
                ROLE.SPV_ADMIN,
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
                ROLE.WAT_MEMBER,
                ROLE.CBC_ADMIN,
                ROLE.SPV_ADMIN,
            ],
        },
        '/protected/v8/workallocation/getWorkOrders': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
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
                ROLE.WAT_MEMBER,
                ROLE.CBC_ADMIN,
                ROLE.SPV_ADMIN,
            ],
            SCOPE_CHECK: [
                ROLE.MDO_ADMIN,
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
            ],
        },
        '/protected/v8/portal/mdo/deptAction/userrole': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
            ],
        },
        '/protected/v8/workallocation/v2/update': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
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
                ROLE.MDO_ADMIN,
                ROLE.WAT_MEMBER,
                ROLE.CBC_ADMIN,
                ROLE.SPV_ADMIN,
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
                ROLE.WAT_MEMBER,
                ROLE.CBC_ADMIN,
                ROLE.SPV_ADMIN,
            ],
        },
        '/reset': {
            checksNeeded: [],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.PUBLIC,
            ],
        },
        '/protected/v8/user/evaluate/assessment/submit/v2': {
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
            ],
        }, '/proxies/v8/staff/position/:orgId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
            ],
        }, '/proxies/v8/budget/scheme': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
            ],
        }, '/proxies/v8/budget/scheme/:orgId': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
            ],
        }, '/proxies/v8/budget/scheme/:orgId/:budgetYear': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
            ],
        }, '/proxies/v8/orghistory/:orgId/:key': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.CBC_ADMIN,
                ROLE.MDO_ADMIN,
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
                ROLE.PUBLIC,
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
            ],
        },
        '/proxies/v8/storage/delete': {
            checksNeeded: [CHECK.ROLE],
            // tslint:disable-next-line: object-literal-sort-keys
            ROLE_CHECK: [
                ROLE.MDO_ADMIN,
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
            '/proxies/v8/event/v4/read/:do_id',
            '/proxies/v8/event/v4/publish/:do_id',
            '/proxies/v8/event/v4/create',
            '/proxies/v8/user/v1/read/:id',
            '/proxies/v8/contentsearch/search',
            '/proxies/v8/sunbirdigot/read',
            '/proxies/v8/sunbirdigot/search',
            '/proxies/v8/discussion/user/v1/create',
            '/proxies/v8/data/v1/system/settings/get/orgTypeList',
            '/proxies/v8/org/v1/search',
            '/proxies/v8/org/v1/update',
            '/proxies/v8/notifyContentState',
            '/proxies/v8/discussion/topic/:id/:slug',
            '/proxies/v8/discussion/v2/posts/:id/vote',
            '/proxies/v8/discussion/v2/posts/:id',
            '/proxies/v8/discussion/v2/posts/:id/bookmark',
            '/proxies/v8/learner/course/v1/user/enrollment/list/:id',
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
            '/proxies/v8/action/content/v3/updateReviewStatus/:do_id',
            '/proxies/v8/action/content/v3/review/:do_id',
            '/proxies/v8/discussion/recent',
            '/proxies/v8/discussion/popular',
            '/proxies/v8/action/content/v3/publish/:do_id',
            '/proxies/v8/action/content/v3/reject/:do_id',
            '/proxies/v8/user/private/v1/assign/role',
            '/proxies/v8/user/v1/search',
            '/proxies/v8/org/v1/read',
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
            '/protected/v8/cohorts/course/batch/cert/issue',
            '/protected/v8/cohorts/course/batch/cert/template/add',
            '/proxies/v8/storage/upload',
            '/proxies/v8/storage/delete',
            '/proxies/v8/user/v1/extPatch',
            '/proxies/v8/learner/course/v2/user/enrollment/admin/list',
            '/protected/v8/frac/bookmarkDataNode'
        ],
}
