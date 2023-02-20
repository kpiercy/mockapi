require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");

//child routes

//controller
const dboperations = require("../controllers/charts");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

 /**
  * @swagger
  * tags:
  *   name: Charts
  *   description: 
  */

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/charts/{chartid}:
 *  get:
 *      summary: Use to find chart by id
 *      tags: [Charts]
 *      description: Find a chart entry
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ClientID of data to find
 *        - in: path
 *          name: jobid
 *          schema: 
 *              type: int
 *          required: true
 *          description: JobID of data to find
 *        - in: path
 *          name: facilityid
 *          schema: 
 *              type: int
 *          required: true
 *          description: FacilityID of data to find
 *        - in: path
 *          name: specid
 *          schema: 
 *              type: int
 *          required: true
 *          description: SpecID of data to find
 *        - in: path
 *          name: chartid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ChartID of data to find
 *      responses:
 *          202:
 *              description: Found chart
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Charts'
 *          404:
 *              description: Chart record was not found
 */
router.get("/:chartid", checkReach, dboperations.one_chart);

//PatchOne
router.patch("/:chartid", checkReach, dboperations.update_chart);

 /**
  * @swagger
  * /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/charts:
  *   post:
  *     summary: Use to create one or more charts
  *     tags: [Charts]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: array
  *             items:
  *               $ref: '#/components/schemas/CreateChartBody'
  *     responses:
  *       200:
  *         description: List of created charts
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/Charts'
  */
router.post("/", checkReach, authLvl, dboperations.create_chart);

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/charts/{chartid}:
 *  delete:
 *      summary: Use to delete chart by id
 *      tags: [Charts]
 *      description: Delete a chart entry
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ClientID of data to delete
 *        - in: path
 *          name: jobid
 *          schema: 
 *              type: int
 *          required: true
 *          description: JobID of data to delete
 *        - in: path
 *          name: facilityid
 *          schema: 
 *              type: int
 *          required: true
 *          description: FacilityID of data to delete
 *        - in: path
 *          name: specid
 *          schema: 
 *              type: int
 *          required: true
 *          description: SpecID of data to delete
 *        - in: path
 *          name: chartid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ChartID of data to delete
 *      responses:
 *          202:
 *              description: Deleted chart
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Charts'
 *          404:
 *              description: Chart record was not found
 */
router.delete("/:chartid", checkReach, authLvl, dboperations.delete_chart);

module.exports = router;
