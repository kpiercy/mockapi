require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");
const validateDto = require('../middleware/validateDto')
const filterDto = require('../schemas/filters')

//child routes

//controller
const dboperations = require("../controllers/filters");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/filters:
 *     get:
 *       tags:
 *         - Filters
 *       summary: Get all filters by specid
 *       description: Get all filters by specid
 *       operationId: getAllFiltersBySpecid
 *       parameters:
 *         - name: paginate
 *           in: query
 *           schema:
 *             type: string
 *             example: 'true'
 *         - name: page
 *           in: query
 *           schema:
 *             type: string
 *             example: '1'
 *         - name: limit
 *           in: query
 *           schema:
 *             type: string
 *             example: '1'
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Filters:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         FilterOnField:
 *                           type: string
 *                           example: FILTER_ON_FIELD
 *                         FilterValue:
 *                           type: string
 *                           example: Filter field on this value instead
 *                         GUID:
 *                           type: string
 *                           example: 33E6E5D8-AD28-4572-ADA4-89A59C55708D
 *                         Spec_GUID:
 *                           type: string
 *                           example: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                     example:
 *                       - Active: true
 *                         FilterOnField: FILTER_ON_FIELD
 *                         FilterValue: Filter field on this value instead
 *                         GUID: 33E6E5D8-AD28-4572-ADA4-89A59C55708D
 *                         Spec_GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                       - Active: true
 *                         FilterOnField: FILTER_ON_FIELD
 *                         FilterValue: Filter field on this value
 *                         GUID: 36223186-3BED-4D03-968C-57A4359F10A4
 *                         Spec_GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *               examples:
 *                 '200':
 *                   value:
 *                     Filters:
 *                       - Active: true
 *                         FilterOnField: FILTER_ON_FIELD
 *                         FilterValue: Filter field on this value instead
 *                         GUID: 33E6E5D8-AD28-4572-ADA4-89A59C55708D
 *                         Spec_GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                       - Active: true
 *                         FilterOnField: FILTER_ON_FIELD
 *                         FilterValue: Filter field on this value
 *                         GUID: 36223186-3BED-4D03-968C-57A4359F10A4
 *                         Spec_GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 */
router.get("/", checkReach, dboperations.all_filters);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/filters/{filterid}:
 *     get:
 *       tags:
 *         - Filters
 *       summary: Get filter by filterid
 *       description: Get filter by filterid
 *       operationId: getFilterByFilterid
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Filters:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         FilterOnField:
 *                           type: string
 *                           example: FILTER_ON_FIELD
 *                         FilterValue:
 *                           type: string
 *                           example: Filter field on this value instead
 *                         GUID:
 *                           type: string
 *                           example: 33E6E5D8-AD28-4572-ADA4-89A59C55708D
 *                         Spec_GUID:
 *                           type: string
 *                           example: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                     example:
 *                       - Active: true
 *                         FilterOnField: FILTER_ON_FIELD
 *                         FilterValue: Filter field on this value instead
 *                         GUID: 33E6E5D8-AD28-4572-ADA4-89A59C55708D
 *                         Spec_GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *               examples:
 *                 '200':
 *                   value:
 *                     Filters:
 *                       - Active: true
 *                         FilterOnField: FILTER_ON_FIELD
 *                         FilterValue: Filter field on this value instead
 *                         GUID: 33E6E5D8-AD28-4572-ADA4-89A59C55708D
 *                         Spec_GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 */
router.get("/:filterid", checkReach, dboperations.one_filter);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/filters/{filterid}:
 *     patch:
 *       tags:
 *         - Filters
 *       summary: Update filter by filterid
 *       description: Update filter by filterid
 *       operationId: updateFilterByFilterid
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Filters:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Active:
 *                         type: boolean
 *                         example: true
 *                       FilterOnField:
 *                         type: string
 *                         example: FILTER_ON_FIELD_UPDATED
 *                       FilterValue:
 *                         type: string
 *                         example: Filter field on this value instead
 *                   example:
 *                     - Active: true
 *                       FilterOnField: FILTER_ON_FIELD_UPDATED
 *                       FilterValue: Filter field on this value instead
 *             example:
 *               Filters:
 *                 - Active: true
 *                   FilterOnField: FILTER_ON_FIELD_UPDATED
 *                   FilterValue: Filter field on this value instead
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Filters:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         FilterOnField:
 *                           type: string
 *                           example: FILTER_ON_FIELD_UPDATED
 *                         FilterValue:
 *                           type: string
 *                           example: Filter field on this value instead
 *                         GUID:
 *                           type: string
 *                           example: 33E6E5D8-AD28-4572-ADA4-89A59C55708D
 *                         Spec_GUID:
 *                           type: string
 *                           example: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                     example:
 *                       - Active: true
 *                         FilterOnField: FILTER_ON_FIELD_UPDATED
 *                         FilterValue: Filter field on this value instead
 *                         GUID: 33E6E5D8-AD28-4572-ADA4-89A59C55708D
 *                         Spec_GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *               examples:
 *                 '200':
 *                   value:
 *                     Filters:
 *                       - Active: true
 *                         FilterOnField: FILTER_ON_FIELD_UPDATED
 *                         FilterValue: Filter field on this value instead
 *                         GUID: 33E6E5D8-AD28-4572-ADA4-89A59C55708D
 *                         Spec_GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *     parameters:
 *       - name: clientid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: de33ba44-dbd3-4b52-9a7e-0a031b8872c7
 *       - name: jobid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 664c6b5e-334e-4368-988e-167e02c34ec9
 *       - name: facilityid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 1f80ff20-5afc-44d5-9407-910ab3c63eca
 *       - name: specid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: e3f4c842-623b-4e7d-a049-11c51e19d6fb
 *       - name: filterid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 33E6E5D8-AD28-4572-ADA4-89A59C55708D
 */
router.patch("/:filterid", checkReach, dboperations.update_filter);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/filters:
 *     post:
 *       tags:
 *         - Filters
 *       summary: /
 *       description: /
 *       operationId: '5'
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Filters:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Active:
 *                         type: boolean
 *                         example: true
 *                       FilterOnField:
 *                         type: string
 *                         example: FILTER_ON_FIELD
 *                       FilterValue:
 *                         type: string
 *                         example: Filter field on this value
 *                       Spec_GUID:
 *                         type: string
 *                         example: e3f4c842-623b-4e7d-a049-11c51e19d6fb
 *                   example:
 *                     - Active: true
 *                       FilterOnField: FILTER_ON_FIELD
 *                       FilterValue: Filter field on this value
 *                       Spec_GUID: e3f4c842-623b-4e7d-a049-11c51e19d6fb
 *             example:
 *               Filters:
 *                 - Active: true
 *                   FilterOnField: FILTER_ON_FIELD
 *                   FilterValue: Filter field on this value
 *                   Spec_GUID: e3f4c842-623b-4e7d-a049-11c51e19d6fb
 *       responses:
 *         '200':
 *           description: ''
 *     parameters:
 *       - name: clientid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: de33ba44-dbd3-4b52-9a7e-0a031b8872c7
 *       - name: jobid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 664c6b5e-334e-4368-988e-167e02c34ec9
 *       - name: facilityid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 1f80ff20-5afc-44d5-9407-910ab3c63eca
 *       - name: specid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: e3f4c842-623b-4e7d-a049-11c51e19d6fb
 */
router.post("/", checkReach, authLvl, validateDto(filterDto), dboperations.create_filter);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/filters/{filterid}:
 *     delete:
 *       tags:
 *         - Filters
 *       summary: Delete filter by filterid
 *       description: Delete filter by filterid
 *       operationId: deleteFilterByFilterid
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Filters:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: false
 *                         GUID:
 *                           type: string
 *                           example: 33E6E5D8-AD28-4572-ADA4-89A59C55708D
 *                     example:
 *                       - Active: false
 *                         GUID: 33E6E5D8-AD28-4572-ADA4-89A59C55708D
 *               examples:
 *                 '200':
 *                   value:
 *                     Filters:
 *                       - Active: false
 *                         GUID: 33E6E5D8-AD28-4572-ADA4-89A59C55708D
 */
router.delete("/:filterid", checkReach, authLvl, dboperations.delete_filter);

module.exports = router;
