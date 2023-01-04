/**
 * openapi: 3.0.3
 * info:
 *   title: REST API
 *   version: 1.0.0
 *   contact: {}
 * paths:
 *   /clients:
 *     post:
 *       tags:
 *         - Clients
 *       summary: Create client
 *       description: Create client
 *       operationId: createClient
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Clients:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       AllInOneInvoicing:
 *                         type: number
 *                         example: 1
 *                       BulkBillEnabled:
 *                         type: number
 *                         example: 1
 *                       ERP_Code:
 *                         type: string
 *                         example: 2068-9999
 *                       ERP_GUID:
 *                         type: number
 *                         example: 111
 *                       ERP_Parent_GUID:
 *                         type: number
 *                         example: 0
 *                       ERP_PostageCode:
 *                         type: string
 *                         example: '2068'
 *                       ERP_SvcsCode:
 *                         type: string
 *                         example: '2068'
 *                       Name:
 *                         type: string
 *                         example: zRockinHospital
 *                       Parent_GUID:
 *                         type: string
 *                         example: 8dd82a1a-105c-4fed-b157-ae18684eecc1
 *                       PostageCost:
 *                         type: number
 *                         example: 0.481
 *                       PostagePrice:
 *                         type: number
 *                         example: 0.464
 *                       Status:
 *                         type: string
 *                         example: Active
 *                       Term:
 *                         type: string
 *                         example: Net 90
 *                       Type:
 *                         type: string
 *                         example: Reseller Child
 *                       ZeroSellHiding:
 *                         type: number
 *                         example: 1
 *                   example:
 *                     - AllInOneInvoicing: 1
 *                       BulkBillEnabled: 1
 *                       ERP_Code: 2068-9999
 *                       ERP_GUID: 111
 *                       ERP_Parent_GUID: 0
 *                       ERP_PostageCode: '2068'
 *                       ERP_SvcsCode: '2068'
 *                       Name: zRockinHospital
 *                       Parent_GUID: 8dd82a1a-105c-4fed-b157-ae18684eecc1
 *                       PostageCost: 0.481
 *                       PostagePrice: 0.464
 *                       Status: Active
 *                       Term: Net 90
 *                       Type: Reseller Child
 *                       ZeroSellHiding: 1
 *             example:
 *               Clients:
 *                 - AllInOneInvoicing: 1
 *                   BulkBillEnabled: 1
 *                   ERP_Code: 2068-9999
 *                   ERP_GUID: 111
 *                   ERP_Parent_GUID: 0
 *                   ERP_PostageCode: '2068'
 *                   ERP_SvcsCode: '2068'
 *                   Name: zRockinHospital
 *                   Parent_GUID: 8dd82a1a-105c-4fed-b157-ae18684eecc1
 *                   PostageCost: 0.481
 *                   PostagePrice: 0.464
 *                   Status: Active
 *                   Term: Net 90
 *                   Type: Reseller Child
 *                   ZeroSellHiding: 1
 *       responses:
 *         '200':
 *           description: ''
 *     delete:
 *       tags:
 *         - Clients
 *       summary: Delete client by clientid
 *       description: Delete client by clientid
 *       operationId: deleteClientByClientid
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Clients:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       clientid:
 *                         type: string
 *                         example: 7133CAAC-3635-48F0-B116-14CAB71FBCB6
 *                   example:
 *                     - clientid: 7133CAAC-3635-48F0-B116-14CAB71FBCB6
 *             example:
 *               Clients:
 *                 - clientid: 7133CAAC-3635-48F0-B116-14CAB71FBCB6
 *       responses:
 *         '200':
 *           description: '200'
 *           headers:
 *             Access-Control-Allow-Origin:
 *               schema:
 *                 type: string
 *                 example: '*'
 *             Access-Origin-Allow-Headers:
 *               schema:
 *                 type: string
 *                 example: Origin, X-Requested-With, Content-Type, Accept, Authorization
 *             Connection:
 *               schema:
 *                 type: string
 *                 example: keep-alive
 *             Content-Length:
 *               schema:
 *                 type: string
 *                 example: '153'
 *             Date:
 *               schema:
 *                 type: string
 *                 example: Tue, 03 Jan 2023 18:38:22 GMT
 *             ETag:
 *               schema:
 *                 type: string
 *                 example: W/"99-YgVQcYogyw0ewnYy1JqKAL90KIM"
 *             Keep-Alive:
 *               schema:
 *                 type: string
 *                 example: timeout=5
 *             X-Powered-By:
 *               schema:
 *                 type: string
 *                 example: Express
 *             X-RateLimit-Limit:
 *               schema:
 *                 type: string
 *                 example: '500'
 *             X-RateLimit-Remaining:
 *               schema:
 *                 type: string
 *                 example: '492'
 *             X-RateLimit-Reset:
 *               schema:
 *                 type: string
 *                 example: '1672772061'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Clients:
 *                     type: object
 *                     properties:
 *                       '0':
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             ERP_ID:
 *                               type: number
 *                               example: 456
 *                             GUID:
 *                               type: string
 *                               example: E9E82AEB-5731-424C-BBA3-42771452F0BD
 *                             Parent_GUID:
 *                               type: string
 *                               example: 8DD82A1A-105C-4FED-B157-AE18684EECC1
 *                             Status:
 *                               type: string
 *                               example: Inactive
 *                         example:
 *                           - ERP_ID: 456
 *                             GUID: E9E82AEB-5731-424C-BBA3-42771452F0BD
 *                             Parent_GUID: 8DD82A1A-105C-4FED-B157-AE18684EECC1
 *                             Status: Inactive
 *               examples:
 *                 '200':
 *                   value:
 *                     Clients:
 *                       '0':
 *                         - ERP_ID: 456
 *                           GUID: E9E82AEB-5731-424C-BBA3-42771452F0BD
 *                           Parent_GUID: 8DD82A1A-105C-4FED-B157-AE18684EECC1
 *                           Status: Inactive
 *   /clients/{clientid}:
 *     get:
 *       tags:
 *         - Clients
 *       summary: Get client by clientid
 *       description: Get client by clientid
 *       operationId: getClientByClientid
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
 *             example: '5'
 *       requestBody:
 *         content:
 *           text/plain:
 *             example: ''
 *       responses:
 *         '200':
 *           description: '200'
 *           headers:
 *             Access-Control-Allow-Origin:
 *               schema:
 *                 type: string
 *                 example: '*'
 *             Access-Origin-Allow-Headers:
 *               schema:
 *                 type: string
 *                 example: Origin, X-Requested-With, Content-Type, Accept, Authorization
 *             Connection:
 *               schema:
 *                 type: string
 *                 example: keep-alive
 *             Content-Length:
 *               schema:
 *                 type: string
 *                 example: '401'
 *             Date:
 *               schema:
 *                 type: string
 *                 example: Tue, 03 Jan 2023 18:34:52 GMT
 *             ETag:
 *               schema:
 *                 type: string
 *                 example: W/"191-HpcuQq6qy0pdo4TRaCtztV1TmD4"
 *             Keep-Alive:
 *               schema:
 *                 type: string
 *                 example: timeout=5
 *             X-Powered-By:
 *               schema:
 *                 type: string
 *                 example: Express
 *             X-RateLimit-Limit:
 *               schema:
 *                 type: string
 *                 example: '500'
 *             X-RateLimit-Remaining:
 *               schema:
 *                 type: string
 *                 example: '498'
 *             X-RateLimit-Reset:
 *               schema:
 *                 type: string
 *                 example: '1672772061'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Clients:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         AllInOneInvoicing:
 *                           type: boolean
 *                           example: false
 *                         BulkBillEnabled:
 *                           type: boolean
 *                           example: false
 *                         ERPCode:
 *                           type: string
 *                           example: 2068-3
 *                         ERPID:
 *                           type: number
 *                           example: 13851
 *                         ERPParentID:
 *                           type: number
 *                           example: 14085
 *                         ERPPostageCode:
 *                           type: string
 *                           example: '2068'
 *                         ERPSvcsCode:
 *                           type: string
 *                           example: '2068'
 *                         GUID:
 *                           type: string
 *                           example: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Name:
 *                           type: string
 *                           example: zAdena swag
 *                         Parent_GUID:
 *                           type: string
 *                           example: 8DD82A1A-105C-4FED-B157-AE18684EECC1
 *                         PostageCost:
 *                           type: number
 *                           example: 0.481
 *                         PostagePrice:
 *                           type: number
 *                           example: 0.51
 *                         Status:
 *                           type: string
 *                           example: Active
 *                         Term:
 *                           type: string
 *                           example: NET30
 *                         Type:
 *                           type: string
 *                           example: ResellerChild
 *                         ZeroSellHiding:
 *                           type: boolean
 *                           example: true
 *                     example:
 *                       - AllInOneInvoicing: false
 *                         BulkBillEnabled: false
 *                         ERPCode: 2068-3
 *                         ERPID: 13851
 *                         ERPParentID: 14085
 *                         ERPPostageCode: '2068'
 *                         ERPSvcsCode: '2068'
 *                         GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Name: zAdena swag
 *                         Parent_GUID: 8DD82A1A-105C-4FED-B157-AE18684EECC1
 *                         PostageCost: 0.481
 *                         PostagePrice: 0.51
 *                         Status: Active
 *                         Term: NET30
 *                         Type: ResellerChild
 *                         ZeroSellHiding: true
 *               examples:
 *                 '200':
 *                   value:
 *                     Clients:
 *                       - AllInOneInvoicing: false
 *                         BulkBillEnabled: false
 *                         ERPCode: 2068-3
 *                         ERPID: 13851
 *                         ERPParentID: 14085
 *                         ERPPostageCode: '2068'
 *                         ERPSvcsCode: '2068'
 *                         GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Name: zAdena swag
 *                         Parent_GUID: 8DD82A1A-105C-4FED-B157-AE18684EECC1
 *                         PostageCost: 0.481
 *                         PostagePrice: 0.51
 *                         Status: Active
 *                         Term: NET30
 *                         Type: ResellerChild
 *                         ZeroSellHiding: true
 *     patch:
 *       tags:
 *         - Clients
 *       summary: Update client by clientid
 *       description: Update client by clientid
 *       operationId: updateClientByClientid
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Clients:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       AllInOneInvoicing:
 *                         type: boolean
 *                         example: false
 *                       BulkBillEnabled:
 *                         type: boolean
 *                         example: false
 *                       ERPCode:
 *                         type: string
 *                         example: '456'
 *                       ERPID:
 *                         type: number
 *                         example: 9
 *                       ERPParentID:
 *                         type: number
 *                         example: 99
 *                       ERPPosCode:
 *                         type: string
 *                         example: '12345'
 *                       ERPSvcsCode:
 *                         type: string
 *                         example: '12345'
 *                       Name:
 *                         type: string
 *                         example: ''
 *                       PostageCost:
 *                         type: number
 *                         example: 0.481
 *                       PostagePrice:
 *                         type: number
 *                         example: 0.51
 *                       Status:
 *                         type: string
 *                         example: Active
 *                       TaxExempt:
 *                         type: boolean
 *                         example: false
 *                       Taxable:
 *                         type: boolean
 *                         example: true
 *                       Terms:
 *                         type: string
 *                         example: NET30
 *                       Type:
 *                         type: string
 *                         example: ResellerChild
 *                       ZeroSellHiding:
 *                         type: boolean
 *                         example: true
 *                   example:
 *                     - AllInOneInvoicing: false
 *                       BulkBillEnabled: false
 *                       ERPCode: '456'
 *                       ERPID: 9
 *                       ERPParentID: 99
 *                       ERPPosCode: '12345'
 *                       ERPSvcsCode: '12345'
 *                       Name: ''
 *                       PostageCost: 0.481
 *                       PostagePrice: 0.51
 *                       Status: Active
 *                       TaxExempt: false
 *                       Taxable: true
 *                       Terms: NET30
 *                       Type: ResellerChild
 *                       ZeroSellHiding: true
 *             example:
 *               Clients:
 *                 - AllInOneInvoicing: false
 *                   BulkBillEnabled: false
 *                   ERPCode: '456'
 *                   ERPID: 9
 *                   ERPParentID: 99
 *                   ERPPosCode: '12345'
 *                   ERPSvcsCode: '12345'
 *                   Name: ''
 *                   PostageCost: 0.481
 *                   PostagePrice: 0.51
 *                   Status: Active
 *                   TaxExempt: false
 *                   Taxable: true
 *                   Terms: NET30
 *                   Type: ResellerChild
 *                   ZeroSellHiding: true
 *       responses:
 *         '200':
 *           description: '200'
 *           headers:
 *             Access-Control-Allow-Origin:
 *               schema:
 *                 type: string
 *                 example: '*'
 *             Access-Origin-Allow-Headers:
 *               schema:
 *                 type: string
 *                 example: Origin, X-Requested-With, Content-Type, Accept, Authorization
 *             Connection:
 *               schema:
 *                 type: string
 *                 example: keep-alive
 *             Content-Length:
 *               schema:
 *                 type: string
 *                 example: '394'
 *             Date:
 *               schema:
 *                 type: string
 *                 example: Tue, 03 Jan 2023 18:37:38 GMT
 *             ETag:
 *               schema:
 *                 type: string
 *                 example: W/"18a-xQ2Xqgi17LCDZihPVnfgEJlsIyg"
 *             Keep-Alive:
 *               schema:
 *                 type: string
 *                 example: timeout=5
 *             X-Powered-By:
 *               schema:
 *                 type: string
 *                 example: Express
 *             X-RateLimit-Limit:
 *               schema:
 *                 type: string
 *                 example: '500'
 *             X-RateLimit-Remaining:
 *               schema:
 *                 type: string
 *                 example: '494'
 *             X-RateLimit-Reset:
 *               schema:
 *                 type: string
 *                 example: '1672772061'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Clients:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         AllInOneInvoicing:
 *                           type: boolean
 *                           example: false
 *                         BulkBillEnabled:
 *                           type: boolean
 *                           example: false
 *                         ERPCode:
 *                           type: string
 *                           example: '456'
 *                         ERPID:
 *                           type: number
 *                           example: 9
 *                         ERPParentID:
 *                           type: number
 *                           example: 99
 *                         ERPPostageCode:
 *                           type: string
 *                           example: '12345'
 *                         ERPSvcsCode:
 *                           type: string
 *                           example: '12345'
 *                         GUID:
 *                           type: string
 *                           example: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Name:
 *                           type: string
 *                           example: zAdena swag
 *                         Parent_GUID:
 *                           type: string
 *                           example: 8DD82A1A-105C-4FED-B157-AE18684EECC1
 *                         PostageCost:
 *                           type: number
 *                           example: 0.481
 *                         PostagePrice:
 *                           type: number
 *                           example: 0.51
 *                         Status:
 *                           type: string
 *                           example: Active
 *                         Terms:
 *                           type: string
 *                           example: NET30
 *                         Type:
 *                           type: string
 *                           example: ResellerChild
 *                         ZeroSellHiding:
 *                           type: boolean
 *                           example: true
 *                     example:
 *                       - AllInOneInvoicing: false
 *                         BulkBillEnabled: false
 *                         ERPCode: '456'
 *                         ERPID: 9
 *                         ERPParentID: 99
 *                         ERPPostageCode: '12345'
 *                         ERPSvcsCode: '12345'
 *                         GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Name: zAdena swag
 *                         Parent_GUID: 8DD82A1A-105C-4FED-B157-AE18684EECC1
 *                         PostageCost: 0.481
 *                         PostagePrice: 0.51
 *                         Status: Active
 *                         Terms: NET30
 *                         Type: ResellerChild
 *                         ZeroSellHiding: true
 *               examples:
 *                 '200':
 *                   value:
 *                     Clients:
 *                       - AllInOneInvoicing: false
 *                         BulkBillEnabled: false
 *                         ERPCode: '456'
 *                         ERPID: 9
 *                         ERPParentID: 99
 *                         ERPPostageCode: '12345'
 *                         ERPSvcsCode: '12345'
 *                         GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Name: zAdena swag
 *                         Parent_GUID: 8DD82A1A-105C-4FED-B157-AE18684EECC1
 *                         PostageCost: 0.481
 *                         PostagePrice: 0.51
 *                         Status: Active
 *                         Terms: NET30
 *                         Type: ResellerChild
 *                         ZeroSellHiding: true
 *     parameters:
 *       - name: clientid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: de33ba44-dbd3-4b52-9a7e-0a031b8872c7









 *   /clients/{clientid}/jobs/{jobid}/workflows:
 *     get:
 *       tags:
 *         - Workflows
 *       summary: /
 *       description: /
 *       operationId: '2'
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
 *           description: ''
 *     post:
 *       tags:
 *         - Workflows
 *       summary: /
 *       description: /
 *       operationId: '1'
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Workflows:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       AlacritiEnabled:
 *                         type: boolean
 *                         example: false
 *                       BatchInSetsOf:
 *                         type: number
 *                         example: 2000
 *                       DataSource:
 *                         type: string
 *                         example: ''
 *                       Design:
 *                         type: string
 *                         example: PFS_Adena.ptk
 *                       FacilityPDFReturnEnabled:
 *                         type: boolean
 *                         example: false
 *                       Job_GUID:
 *                         type: string
 *                         example: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                       PaperlessEnabled:
 *                         type: boolean
 *                         example: false
 *                       PriintToPath:
 *                         type: string
 *                         example: \\inmuneliterds\c$\colorfilestoprint\
 *                       PrintPDFReturnEnabled:
 *                         type: boolean
 *                         example: false
 *                       RunMode:
 *                         type: string
 *                         example: Hold
 *                       StoredProc:
 *                         type: string
 *                         example: ''
 *                       SubprocessReqd:
 *                         type: boolean
 *                         example: false
 *                       TableName:
 *                         type: string
 *                         example: ''
 *                       TableUpdate:
 *                         type: boolean
 *                         example: false
 *                       UNCPath:
 *                         type: string
 *                         example: \\INMUNELITERDS\C$\Clients\P\PFS_Adena\
 *                       UseStoredProc:
 *                         type: boolean
 *                         example: false
 *                   example:
 *                     - AlacritiEnabled: false
 *                       BatchInSetsOf: 2000
 *                       DataSource: ''
 *                       Design: PFS_Adena.ptk
 *                       FacilityPDFReturnEnabled: false
 *                       Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                       PaperlessEnabled: false
 *                       PriintToPath: \\inmuneliterds\c$\colorfilestoprint\
 *                       PrintPDFReturnEnabled: false
 *                       RunMode: Hold
 *                       StoredProc: ''
 *                       SubprocessReqd: false
 *                       TableName: ''
 *                       TableUpdate: false
 *                       UNCPath: \\INMUNELITERDS\C$\Clients\P\PFS_Adena\
 *                       UseStoredProc: false
 *             example:
 *               Workflows:
 *                 - AlacritiEnabled: false
 *                   BatchInSetsOf: 2000
 *                   DataSource: ''
 *                   Design: PFS_Adena.ptk
 *                   FacilityPDFReturnEnabled: false
 *                   Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                   PaperlessEnabled: false
 *                   PriintToPath: \\inmuneliterds\c$\colorfilestoprint\
 *                   PrintPDFReturnEnabled: false
 *                   RunMode: Hold
 *                   StoredProc: ''
 *                   SubprocessReqd: false
 *                   TableName: ''
 *                   TableUpdate: false
 *                   UNCPath: \\INMUNELITERDS\C$\Clients\P\PFS_Adena\
 *                   UseStoredProc: false
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
 *   /clients/{clientid}/jobs/{jobid}/workflows/{workflowid}:
 *     get:
 *       tags:
 *         - Workflows
 *       summary: /:workflowid
 *       description: /:workflowid
 *       operationId: workflowid
 *       responses:
 *         '200':
 *           description: ''
 *     delete:
 *       tags:
 *         - Workflows
 *       summary: /:workflowid
 *       description: /:workflowid
 *       operationId: workflowid2
 *       responses:
 *         '200':
 *           description: ''
 *     patch:
 *       tags:
 *         - Workflows
 *       summary: /:workflowid
 *       description: /:workflowid
 *       operationId: workflowid1
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Workflows:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       AlacritiEnabled:
 *                         type: boolean
 *                         example: true
 *                       BatchInSetsOf:
 *                         type: number
 *                         example: 2000
 *                       Design:
 *                         type: string
 *                         example: PFS_Adena.ptk
 *                       FacilityPDFReturnEnabled:
 *                         type: boolean
 *                         example: false
 *                       PaperlessEnabled:
 *                         type: boolean
 *                         example: true
 *                       PriintToPath:
 *                         type: string
 *                         example: UPDATED\\inmuneliterds\c$\colorfilestoprint\
 *                       PrintPDFReturnEnabled:
 *                         type: boolean
 *                         example: true
 *                       RunMode:
 *                         type: string
 *                         example: IDK
 *                       SubprocessReqd:
 *                         type: boolean
 *                         example: true
 *                       TableUpdate:
 *                         type: boolean
 *                         example: false
 *                       UNCPath:
 *                         type: string
 *                         example: \\INMUNELITERDS\C$\Clients\P\PFS_Adena_UPDATED\
 *                       UseStoredProc:
 *                         type: boolean
 *                         example: false
 *                   example:
 *                     - AlacritiEnabled: true
 *                       BatchInSetsOf: 2000
 *                       Design: PFS_Adena.ptk
 *                       FacilityPDFReturnEnabled: false
 *                       PaperlessEnabled: true
 *                       PriintToPath: UPDATED\\inmuneliterds\c$\colorfilestoprint\
 *                       PrintPDFReturnEnabled: true
 *                       RunMode: IDK
 *                       SubprocessReqd: true
 *                       TableUpdate: false
 *                       UNCPath: \\INMUNELITERDS\C$\Clients\P\PFS_Adena_UPDATED\
 *                       UseStoredProc: false
 *             example:
 *               Workflows:
 *                 - AlacritiEnabled: true
 *                   BatchInSetsOf: 2000
 *                   Design: PFS_Adena.ptk
 *                   FacilityPDFReturnEnabled: false
 *                   PaperlessEnabled: true
 *                   PriintToPath: UPDATED\\inmuneliterds\c$\colorfilestoprint\
 *                   PrintPDFReturnEnabled: true
 *                   RunMode: IDK
 *                   SubprocessReqd: true
 *                   TableUpdate: false
 *                   UNCPath: \\INMUNELITERDS\C$\Clients\P\PFS_Adena_UPDATED\
 *                   UseStoredProc: false
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
 *       - name: workflowid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *   /clients/{clientid}/jobs/{jobid}/contacts:
 *     get:
 *       tags:
 *         - Contacts
 *       summary: /
 *       description: /
 *       operationId: '4'
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
 *             example: '2'
 *       requestBody:
 *         content:
 *           text/plain:
 *             example: ''
 *       responses:
 *         '200':
 *           description: ''
 *     post:
 *       tags:
 *         - Contacts
 *       summary: /
 *       description: /
 *       operationId: '3'
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Contacts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Active:
 *                         type: number
 *                         example: 1
 *                       Email:
 *                         type: string
 *                         example: kpiercy@eliteps.com
 *                       FirstName:
 *                         type: string
 *                         example: Kraig
 *                       Job_GUID:
 *                         type: string
 *                         example: 664c6b5e-334e-4368-988e-167e02c34ec9
 *                       LastName:
 *                         type: string
 *                         example: Piercy
 *                       Phone:
 *                         type: string
 *                         example: '7654990654'
 *                       Type:
 *                         type: string
 *                         example: 3a3c663f-aa44-4295-89f5-c24869689b34
 *                   example:
 *                     - Active: 1
 *                       Email: kpiercy@eliteps.com
 *                       FirstName: Kraig
 *                       Job_GUID: 664c6b5e-334e-4368-988e-167e02c34ec9
 *                       LastName: Piercy
 *                       Phone: '7654990654'
 *                       Type: 3a3c663f-aa44-4295-89f5-c24869689b34
 *             example:
 *               Contacts:
 *                 - Active: 1
 *                   Email: kpiercy@eliteps.com
 *                   FirstName: Kraig
 *                   Job_GUID: 664c6b5e-334e-4368-988e-167e02c34ec9
 *                   LastName: Piercy
 *                   Phone: '7654990654'
 *                   Type: 3a3c663f-aa44-4295-89f5-c24869689b34
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
 *   /clients/{clientid}/jobs/{jobid}/contacts/{contactid}:
 *     get:
 *       tags:
 *         - Contacts
 *       summary: /:contactid
 *       description: /:contactid
 *       operationId: contactid
 *       requestBody:
 *         content:
 *           text/plain:
 *             example: ''
 *       responses:
 *         '200':
 *           description: ''
 *     delete:
 *       tags:
 *         - Contacts
 *       summary: /:contactid
 *       description: /:contactid
 *       operationId: contactid2
 *       requestBody:
 *         content:
 *           text/plain:
 *             example: ''
 *       responses:
 *         '200':
 *           description: ''
 *     patch:
 *       tags:
 *         - Contacts
 *       summary: /:contactid
 *       description: /:contactid
 *       operationId: contactid1
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Contacts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Active:
 *                         type: boolean
 *                         example: true
 *                       Email:
 *                         type: string
 *                         example: kpiercy@eliteps.com
 *                       FirstName:
 *                         type: string
 *                         example: Kraig
 *                       LastName:
 *                         type: string
 *                         example: Piercy
 *                       Phone:
 *                         type: string
 *                         example: '7654990654'
 *                   example:
 *                     - Active: true
 *                       Email: kpiercy@eliteps.com
 *                       FirstName: Kraig
 *                       LastName: Piercy
 *                       Phone: '7654990654'
 *             example:
 *               Contacts:
 *                 - Active: true
 *                   Email: kpiercy@eliteps.com
 *                   FirstName: Kraig
 *                   LastName: Piercy
 *                   Phone: '7654990654'
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
 *       - name: contactid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 2E2F03C3-43B7-413A-9842-96D31EBBD881
 *   /clients/{clientid}/jobs/{jobid}/downloads:
 *     get:
 *       tags:
 *         - Downloads
 *       summary: /
 *       description: /
 *       operationId: '6'
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
 *           description: ''
 *     post:
 *       tags:
 *         - Downloads
 *       summary: /
 *       description: /
 *       operationId: '5'
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Downloads:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       AdditionalTask:
 *                         type: string
 *                         example: someadditionaltask
 *                       AppendValue:
 *                         type: string
 *                         example: ''
 *                       Convert:
 *                         type: number
 *                         example: 0
 *                       ConvertToDelimiter:
 *                         type: string
 *                         example: ''
 *                       ConvertToExtension:
 *                         type: string
 *                         example: ''
 *                       ConvertyToColumns:
 *                         type: number
 *                         example: 0
 *                       IgnoreMask:
 *                         type: string
 *                         example: ''
 *                       Job_GUID:
 *                         type: string
 *                         example: 664c6b5e-334e-4368-988e-167e02c34ec9
 *                       LocalDirectory:
 *                         type: string
 *                         example: somelocaldirectory
 *                       Mask:
 *                         type: string
 *                         example: '*.anEXT'
 *                       NewFilename:
 *                         type: string
 *                         example: ''
 *                       Password:
 *                         type: string
 *                         example: a[pdfbnijp234509gk
 *                       RemoteDirectory:
 *                         type: string
 *                         example: somedirectorythatsnew
 *                       Renamed:
 *                         type: number
 *                         example: 0
 *                       Server:
 *                         type: number
 *                         example: 0
 *                       Timestamped:
 *                         type: number
 *                         example: 1
 *                   example:
 *                     - AdditionalTask: someadditionaltask
 *                       AppendValue: ''
 *                       Convert: 0
 *                       ConvertToDelimiter: ''
 *                       ConvertToExtension: ''
 *                       ConvertyToColumns: 0
 *                       IgnoreMask: ''
 *                       Job_GUID: 664c6b5e-334e-4368-988e-167e02c34ec9
 *                       LocalDirectory: somelocaldirectory
 *                       Mask: '*.anEXT'
 *                       NewFilename: ''
 *                       Password: a[pdfbnijp234509gk
 *                       RemoteDirectory: somedirectorythatsnew
 *                       Renamed: 0
 *                       Server: 0
 *                       Timestamped: 1
 *             example:
 *               Downloads:
 *                 - AdditionalTask: someadditionaltask
 *                   AppendValue: ''
 *                   Convert: 0
 *                   ConvertToDelimiter: ''
 *                   ConvertToExtension: ''
 *                   ConvertyToColumns: 0
 *                   IgnoreMask: ''
 *                   Job_GUID: 664c6b5e-334e-4368-988e-167e02c34ec9
 *                   LocalDirectory: somelocaldirectory
 *                   Mask: '*.anEXT'
 *                   NewFilename: ''
 *                   Password: a[pdfbnijp234509gk
 *                   RemoteDirectory: somedirectorythatsnew
 *                   Renamed: 0
 *                   Server: 0
 *                   Timestamped: 1
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
 *   /clients/{clientid}/jobs/{jobid}/downloads/{downloadid}:
 *     get:
 *       tags:
 *         - Downloads
 *       summary: /:downloadid
 *       description: /:downloadid
 *       operationId: downloadid
 *       responses:
 *         '200':
 *           description: ''
 *     delete:
 *       tags:
 *         - Downloads
 *       summary: /:downloadid
 *       description: /:downloadid
 *       operationId: downloadid2
 *       responses:
 *         '200':
 *           description: ''
 *     patch:
 *       tags:
 *         - Downloads
 *       summary: /:downloadid
 *       description: /:downloadid
 *       operationId: downloadid1
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Downloads:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Active:
 *                         type: boolean
 *                         example: true
 *                       AdditionalTask:
 *                         type: string
 *                         example: newTask.txt
 *                       AppendValue:
 *                         type: string
 *                         example: appendedValue
 *                       ConverToDelimiter:
 *                         type: string
 *                         example: pipe
 *                       Convert:
 *                         type: boolean
 *                         example: false
 *                       ConvertToColumns:
 *                         type: number
 *                         example: 100
 *                       ConvertToExtension:
 *                         type: string
 *                         example: .txt
 *                       IgnoreMask:
 *                         type: string
 *                         example: new ignore
 *                       LocalDirectory:
 *                         type: string
 *                         example: o.O new local
 *                       Mask:
 *                         type: string
 *                         example: updatedMask*.*
 *                       NewFilename:
 *                         type: string
 *                         example: gotanewname
 *                       Password:
 *                         type: string
 *                         example: anewpassword
 *                       RemoteDirectory:
 *                         type: string
 *                         example: /updated/zAdena/Messages
 *                       Renamed:
 *                         type: boolean
 *                         example: false
 *                       Server:
 *                         type: number
 *                         example: 4
 *                       Timestamped:
 *                         type: boolean
 *                         example: true
 *                   example:
 *                     - Active: true
 *                       AdditionalTask: newTask.txt
 *                       AppendValue: appendedValue
 *                       ConverToDelimiter: pipe
 *                       Convert: false
 *                       ConvertToColumns: 100
 *                       ConvertToExtension: .txt
 *                       IgnoreMask: new ignore
 *                       LocalDirectory: o.O new local
 *                       Mask: updatedMask*.*
 *                       NewFilename: gotanewname
 *                       Password: anewpassword
 *                       RemoteDirectory: /updated/zAdena/Messages
 *                       Renamed: false
 *                       Server: 4
 *                       Timestamped: true
 *             example:
 *               Downloads:
 *                 - Active: true
 *                   AdditionalTask: newTask.txt
 *                   AppendValue: appendedValue
 *                   ConverToDelimiter: pipe
 *                   Convert: false
 *                   ConvertToColumns: 100
 *                   ConvertToExtension: .txt
 *                   IgnoreMask: new ignore
 *                   LocalDirectory: o.O new local
 *                   Mask: updatedMask*.*
 *                   NewFilename: gotanewname
 *                   Password: anewpassword
 *                   RemoteDirectory: /updated/zAdena/Messages
 *                   Renamed: false
 *                   Server: 4
 *                   Timestamped: true
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
 *       - name: downloadid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 98393259-977B-4C0B-AF33-FE76127924FE
 *   /clients/{clientid}/jobs/{jobid}/returns:
 *     get:
 *       tags:
 *         - Returns
 *       summary: /
 *       description: /
 *       operationId: '8'
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
 *           description: ''
 *     post:
 *       tags:
 *         - Returns
 *       summary: /
 *       description: /
 *       operationId: '7'
 *       requestBody:
 *         content:
 *           text/plain:
 *             example: "{\r\n    \"Returns\": [\r\n        {\r\n        \"Job_GUID\": \"664c6b5e-334e-4368-988e-167e02c34ec9\",\r\n        \"RemoteDirectory\": \"\",\r\n        \"Mask\": \"\",\r\n        \"AdditionalTask\": \"\",\r\n        \"Password\": \"\",\r\n        \"LocalDirectory\": \"\",\r\n        \"Server\": ,\r\n        \"TimeBased\": 0,\r\n        \"ReturnTime\": \"\",\r\n        \"DaysToReturn\": ,\r\n        \"Type\": ,\r\n        \"ZipName\": \"\",\r\n        \"MultiUpload\": 0,\r\n        \"MultiServer\": ,\r\n        \"MultiRemoteDirectory\": \"\"\r\n        }\r\n    ]\r\n}\r\n"
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
 *   /clients/{clientid}/jobs/{jobid}/returns/{returnid}:
 *     get:
 *       tags:
 *         - Returns
 *       summary: /:returnid
 *       description: /:returnid
 *       operationId: returnid
 *       responses:
 *         '200':
 *           description: ''
 *     patch:
 *       tags:
 *         - Returns
 *       summary: /:returnid
 *       description: /:returnid
 *       operationId: returnid1
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Returns:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       AdditionalTask:
 *                         type: string
 *                         example: new task
 *                       LocalDirectory:
 *                         type: string
 *                         example: new local
 *                       Mask:
 *                         type: string
 *                         example: new return mask
 *                       MultiRemoteDirectory:
 *                         type: string
 *                         example: new multi
 *                       MultiServer:
 *                         type: number
 *                         example: 0
 *                       MultiUpload:
 *                         type: boolean
 *                         example: false
 *                       Password:
 *                         type: string
 *                         example: some fancy password
 *                       RemoteDirectory:
 *                         type: string
 *                         example: new remotedir
 *                       ReturnTime:
 *                         type: string
 *                         example: '11:00:00'
 *                       Server:
 *                         type: number
 *                         example: 5
 *                       TimeBased:
 *                         type: number
 *                         example: 0
 *                       Type:
 *                         type: number
 *                         example: 0
 *                       ZipName:
 *                         type: string
 *                         example: new zipname
 *                   example:
 *                     - AdditionalTask: new task
 *                       LocalDirectory: new local
 *                       Mask: new return mask
 *                       MultiRemoteDirectory: new multi
 *                       MultiServer: 0
 *                       MultiUpload: false
 *                       Password: some fancy password
 *                       RemoteDirectory: new remotedir
 *                       ReturnTime: '11:00:00'
 *                       Server: 5
 *                       TimeBased: 0
 *                       Type: 0
 *                       ZipName: new zipname
 *             example:
 *               Returns:
 *                 - AdditionalTask: new task
 *                   LocalDirectory: new local
 *                   Mask: new return mask
 *                   MultiRemoteDirectory: new multi
 *                   MultiServer: 0
 *                   MultiUpload: false
 *                   Password: some fancy password
 *                   RemoteDirectory: new remotedir
 *                   ReturnTime: '11:00:00'
 *                   Server: 5
 *                   TimeBased: 0
 *                   Type: 0
 *                   ZipName: new zipname
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
 *       - name: returnid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 4644D4A4-6673-4D49-953E-9EA2A15A527E
 *   /clients/{clientid}/jobs/{jobid}/orders:
 *     post:
 *       tags:
 *         - Orders
 *       summary: /
 *       description: /
 *       operationId: '9'
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       BillingType:
 *                         type: number
 *                         example: 1
 *                       CurrentOrder:
 *                         type: string
 *                         example: '123456'
 *                       InvoicesAutomated:
 *                         type: boolean
 *                         example: true
 *                       Job_GUID:
 *                         type: string
 *                         example: 664c6b5e-334e-4368-988e-167e02c34ec9
 *                       OrderTemplate:
 *                         type: string
 *                         example: tempOrderNum
 *                       OrdersAutomated:
 *                         type: boolean
 *                         example: true
 *                       TemplateVersionID:
 *                         type: number
 *                         example: 0
 *                   example:
 *                     - BillingType: 1
 *                       CurrentOrder: '123456'
 *                       InvoicesAutomated: true
 *                       Job_GUID: 664c6b5e-334e-4368-988e-167e02c34ec9
 *                       OrderTemplate: tempOrderNum
 *                       OrdersAutomated: true
 *                       TemplateVersionID: 0
 *             example:
 *               Orders:
 *                 - BillingType: 1
 *                   CurrentOrder: '123456'
 *                   InvoicesAutomated: true
 *                   Job_GUID: 664c6b5e-334e-4368-988e-167e02c34ec9
 *                   OrderTemplate: tempOrderNum
 *                   OrdersAutomated: true
 *                   TemplateVersionID: 0
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
 *   /clients/{clientid}/jobs/{jobid}/orders/{orderid}:
 *     get:
 *       tags:
 *         - Orders
 *       summary: /:orderid
 *       description: /:orderid
 *       operationId: orderid
 *       requestBody:
 *         content:
 *           text/plain:
 *             example: ''
 *       responses:
 *         '200':
 *           description: ''
 *     patch:
 *       tags:
 *         - Orders
 *       summary: /:orderid
 *       description: /:orderid
 *       operationId: orderid1
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       BillingType:
 *                         type: number
 *                         example: 1
 *                       ExportStatus:
 *                         type: number
 *                         example: 2
 *                       InvoicesAutomated:
 *                         type: number
 *                         example: 1
 *                       OrderTemplate:
 *                         type: string
 *                         example: tempOrderNum
 *                       OrdersAutomated:
 *                         type: number
 *                         example: 1
 *                       PostagePO:
 *                         type: string
 *                         example: aPOSpo
 *                       ServicesPO:
 *                         type: string
 *                         example: this is a newPO
 *                       TemplateVersionID:
 *                         type: number
 *                         example: 0
 *                   example:
 *                     - BillingType: 1
 *                       ExportStatus: 2
 *                       InvoicesAutomated: 1
 *                       OrderTemplate: tempOrderNum
 *                       OrdersAutomated: 1
 *                       PostagePO: aPOSpo
 *                       ServicesPO: this is a newPO
 *                       TemplateVersionID: 0
 *             example:
 *               Orders:
 *                 - BillingType: 1
 *                   ExportStatus: 2
 *                   InvoicesAutomated: 1
 *                   OrderTemplate: tempOrderNum
 *                   OrdersAutomated: 1
 *                   PostagePO: aPOSpo
 *                   ServicesPO: this is a newPO
 *                   TemplateVersionID: 0
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
 *       - name: orderid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 6c0661bb-f80e-4859-89b8-362b987dfdad
 *   /clients/{clientid}/jobs/{jobid}/orbipays:
 *     get:
 *       tags:
 *         - Orbipays
 *       summary: /
 *       description: /
 *       operationId: '11'
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
 *             example: '2'
 *         - name: limit
 *           in: query
 *           schema:
 *             type: string
 *             example: '1'
 *       responses:
 *         '200':
 *           description: ''
 *     post:
 *       tags:
 *         - Orbipays
 *       summary: /
 *       description: /
 *       operationId: '10'
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Orbipays:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       AMF_Mask:
 *                         type: string
 *                         example: some AMF mask
 *                       Chained:
 *                         type: string
 *                         example: '0'
 *                       DAF_Mask:
 *                         type: string
 *                         example: some DAF mask
 *                       EDMS_Mask1:
 *                         type: string
 *                         example: some EDMS mask
 *                       EncryptReturnFiles:
 *                         type: number
 *                         example: 1
 *                       FileCountRequired:
 *                         type: number
 *                         example: 1
 *                       FileID:
 *                         type: string
 *                         example: '123'
 *                       HasReports:
 *                         type: number
 *                         example: 1
 *                       Job_GUID:
 *                         type: string
 *                         example: 664c6b5e-334e-4368-988e-167e02c34ec9
 *                       LocalDirectory:
 *                         type: string
 *                         example: C://clients/P/zAdena/BuildAlacritiFiles
 *                       LogFile:
 *                         type: string
 *                         example: AutomateRunSeqLog.txt
 *                       Name:
 *                         type: string
 *                         example: zAdena Statements
 *                       PAY_Mask:
 *                         type: string
 *                         example: some PAY mask
 *                       ParseSuccessMsg:
 *                         type: string
 *                         example: some parse success msg
 *                       PartnerID:
 *                         type: string
 *                         example: '1234567'
 *                       ReportDirectory:
 *                         type: string
 *                         example: the report directory
 *                       ReportMask:
 *                         type: string
 *                         example: '*reportname*.csv'
 *                       Status:
 *                         type: string
 *                         example: Active
 *                       TriggerMask:
 *                         type: string
 *                         example: '*.pdf'
 *                       Type:
 *                         type: string
 *                         example: amfINV
 *                       Wait:
 *                         type: number
 *                         example: 0
 *                       WaitLength:
 *                         type: number
 *                         example: 20
 *                       ZipMask:
 *                         type: string
 *                         example: zip file naming
 *                   example:
 *                     - AMF_Mask: some AMF mask
 *                       Chained: '0'
 *                       DAF_Mask: some DAF mask
 *                       EDMS_Mask1: some EDMS mask
 *                       EncryptReturnFiles: 1
 *                       FileCountRequired: 1
 *                       FileID: '123'
 *                       HasReports: 1
 *                       Job_GUID: 664c6b5e-334e-4368-988e-167e02c34ec9
 *                       LocalDirectory: C://clients/P/zAdena/BuildAlacritiFiles
 *                       LogFile: AutomateRunSeqLog.txt
 *                       Name: zAdena Statements
 *                       PAY_Mask: some PAY mask
 *                       ParseSuccessMsg: some parse success msg
 *                       PartnerID: '1234567'
 *                       ReportDirectory: the report directory
 *                       ReportMask: '*reportname*.csv'
 *                       Status: Active
 *                       TriggerMask: '*.pdf'
 *                       Type: amfINV
 *                       Wait: 0
 *                       WaitLength: 20
 *                       ZipMask: zip file naming
 *             example:
 *               Orbipays:
 *                 - AMF_Mask: some AMF mask
 *                   Chained: '0'
 *                   DAF_Mask: some DAF mask
 *                   EDMS_Mask1: some EDMS mask
 *                   EncryptReturnFiles: 1
 *                   FileCountRequired: 1
 *                   FileID: '123'
 *                   HasReports: 1
 *                   Job_GUID: 664c6b5e-334e-4368-988e-167e02c34ec9
 *                   LocalDirectory: C://clients/P/zAdena/BuildAlacritiFiles
 *                   LogFile: AutomateRunSeqLog.txt
 *                   Name: zAdena Statements
 *                   PAY_Mask: some PAY mask
 *                   ParseSuccessMsg: some parse success msg
 *                   PartnerID: '1234567'
 *                   ReportDirectory: the report directory
 *                   ReportMask: '*reportname*.csv'
 *                   Status: Active
 *                   TriggerMask: '*.pdf'
 *                   Type: amfINV
 *                   Wait: 0
 *                   WaitLength: 20
 *                   ZipMask: zip file naming
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
 *   /clients/{clientid}/jobs/{jobid}/orbipays/{orbipayid}:
 *     get:
 *       tags:
 *         - Orbipays
 *       summary: /:orbipayid
 *       description: /:orbipayid
 *       operationId: orbipayid
 *       responses:
 *         '200':
 *           description: ''
 *     delete:
 *       tags:
 *         - Orbipays
 *       summary: /:orbipayid
 *       description: /:orbipayid
 *       operationId: orbipayid2
 *       responses:
 *         '200':
 *           description: ''
 *     patch:
 *       tags:
 *         - Orbipays
 *       summary: /:orbipayid
 *       description: /:orbipayid
 *       operationId: orbipayid1
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Orbipays:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       AMF_Mask:
 *                         type: string
 *                         example: some AMF mask
 *                       ChainJob:
 *                         type: number
 *                         example: 0
 *                       DAF_Mask:
 *                         type: string
 *                         example: some DAF mask
 *                       EDMS_Mask1:
 *                         type: string
 *                         example: some EDMS mask
 *                       EncryptReturnFiles:
 *                         type: number
 *                         example: 1
 *                       FileCountRequired:
 *                         type: number
 *                         example: 1
 *                       FileID:
 *                         type: string
 *                         example: '123'
 *                       HasReports:
 *                         type: number
 *                         example: 1
 *                       LocalDirectory:
 *                         type: string
 *                         example: C://clients/P/zAdena/BuildAlacritiFiles
 *                       LogFile:
 *                         type: string
 *                         example: AutomateRunSeqLog.txt
 *                       Name:
 *                         type: string
 *                         example: I updated the name
 *                       PAY_Mask:
 *                         type: string
 *                         example: some PAY mask
 *                       PAY_RemoteDirectory:
 *                         type: string
 *                         example: some remote directory
 *                       ParseSuccessMsg:
 *                         type: string
 *                         example: some parse success msg
 *                       PartnerID:
 *                         type: string
 *                         example: '1234567'
 *                       ProcessingMask:
 *                         type: string
 *                         example: '*.pdf'
 *                       ReportDirectory:
 *                         type: string
 *                         example: the report directory
 *                       ReportMask:
 *                         type: string
 *                         example: '*reportname*.csv'
 *                       Status:
 *                         type: string
 *                         example: Active
 *                       Type:
 *                         type: string
 *                         example: amfINV
 *                       Wait:
 *                         type: number
 *                         example: 0
 *                       WaitLength:
 *                         type: number
 *                         example: 20
 *                       ZipMask:
 *                         type: string
 *                         example: zip file naming
 *                   example:
 *                     - AMF_Mask: some AMF mask
 *                       ChainJob: 0
 *                       DAF_Mask: some DAF mask
 *                       EDMS_Mask1: some EDMS mask
 *                       EncryptReturnFiles: 1
 *                       FileCountRequired: 1
 *                       FileID: '123'
 *                       HasReports: 1
 *                       LocalDirectory: C://clients/P/zAdena/BuildAlacritiFiles
 *                       LogFile: AutomateRunSeqLog.txt
 *                       Name: I updated the name
 *                       PAY_Mask: some PAY mask
 *                       PAY_RemoteDirectory: some remote directory
 *                       ParseSuccessMsg: some parse success msg
 *                       PartnerID: '1234567'
 *                       ProcessingMask: '*.pdf'
 *                       ReportDirectory: the report directory
 *                       ReportMask: '*reportname*.csv'
 *                       Status: Active
 *                       Type: amfINV
 *                       Wait: 0
 *                       WaitLength: 20
 *                       ZipMask: zip file naming
 *             example:
 *               Orbipays:
 *                 - AMF_Mask: some AMF mask
 *                   ChainJob: 0
 *                   DAF_Mask: some DAF mask
 *                   EDMS_Mask1: some EDMS mask
 *                   EncryptReturnFiles: 1
 *                   FileCountRequired: 1
 *                   FileID: '123'
 *                   HasReports: 1
 *                   LocalDirectory: C://clients/P/zAdena/BuildAlacritiFiles
 *                   LogFile: AutomateRunSeqLog.txt
 *                   Name: I updated the name
 *                   PAY_Mask: some PAY mask
 *                   PAY_RemoteDirectory: some remote directory
 *                   ParseSuccessMsg: some parse success msg
 *                   PartnerID: '1234567'
 *                   ProcessingMask: '*.pdf'
 *                   ReportDirectory: the report directory
 *                   ReportMask: '*reportname*.csv'
 *                   Status: Active
 *                   Type: amfINV
 *                   Wait: 0
 *                   WaitLength: 20
 *                   ZipMask: zip file naming
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
 *       - name: orbipayid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 2073E46B-A2F4-461C-88EA-B8260B3823E0
 *   /clients/{clientid}/jobs/{jobid}/facilities:
 *     get:
 *       tags:
 *         - Facilities
 *       summary: /
 *       description: /
 *       operationId: '13'
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
 *           description: ''
 *     post:
 *       tags:
 *         - Facilities
 *       summary: /
 *       description: /
 *       operationId: '12'
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Facilities:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Active:
 *                         type: boolean
 *                         example: true
 *                       Facility:
 *                         type: string
 *                         example: RWJEBC
 *                       InsuranceTransferLanguage:
 *                         type: string
 *                         example: some description line
 *                       Job_GUID:
 *                         type: string
 *                         example: 3aad5759-477e-4de8-bf5a-530f4a21e5d5
 *                       MinimumBalance:
 *                         type: number
 *                         example: 75
 *                       PatientTransferLanguage:
 *                         type: string
 *                         example: a different description line
 *                       Specs:
 *                         type: object
 *                         properties:
 *                           APIAvailable:
 *                             type: boolean
 *                             example: false
 *                           APIDocumentation:
 *                             nullable: true
 *                             example: null
 *                           Channels:
 *                             type: object
 *                             properties:
 *                               AmericanExpress:
 *                                 type: boolean
 *                                 example: true
 *                               Discover:
 *                                 type: boolean
 *                                 example: true
 *                               IVRPayments:
 *                                 type: boolean
 *                                 example: false
 *                               IVRPhone:
 *                                 nullable: true
 *                                 example: null
 *                               MailPayments:
 *                                 type: boolean
 *                                 example: true
 *                               MailTo:
 *                                 type: string
 *                                 example: some physical address
 *                               MasterCard:
 *                                 type: boolean
 *                                 example: true
 *                               OnlinePayments:
 *                                 type: boolean
 *                                 example: true
 *                               OtherAccepted:
 *                                 type: string
 *                                 example: NA
 *                               OtherChannels:
 *                                 nullable: true
 *                                 example: null
 *                               PaySite:
 *                                 type: string
 *                                 example: www.paymesucka.com/now
 *                               PhoneLocal:
 *                                 type: string
 *                                 example: 123-456-7890
 *                               PhonePayments:
 *                                 type: boolean
 *                                 example: true
 *                               PhoneTollFree:
 *                                 type: string
 *                                 example: 789-654-3210
 *                               Visa:
 *                                 type: boolean
 *                                 example: true
 *                           ClientProvidedSpecSheet:
 *                             type: boolean
 *                             example: false
 *                           DataCrosswalkProvided:
 *                             type: boolean
 *                             example: true
 *                           DataFileProvided:
 *                             type: boolean
 *                             example: true
 *                           ExtractErrors:
 *                             type: boolean
 *                             example: true
 *                           HoldErrors:
 *                             type: boolean
 *                             example: false
 *                           LockboxBank:
 *                             nullable: true
 *                             example: null
 *                           LockboxCSZ:
 *                             nullable: true
 *                             example: null
 *                           LockboxIntegration:
 *                             type: boolean
 *                             example: true
 *                           Logos:
 *                             type: object
 *                             properties:
 *                               Location:
 *                                 type: string
 *                                 example: >-
 *                                   C:\clients\P\PFS_zAdena\Logos\aFacilityLogo.jpg
 *                           PDFFileProvided:
 *                             type: boolean
 *                             example: false
 *                           Reports:
 *                             type: object
 *                             properties:
 *                               FacilityPDFs:
 *                                 type: boolean
 *                                 example: false
 *                               FacilityReport:
 *                                 type: boolean
 *                                 example: false
 *                               MovesReport:
 *                                 type: boolean
 *                                 example: false
 *                               NonCassReport:
 *                                 type: boolean
 *                                 example: false
 *                               PrintPDFs:
 *                                 type: boolean
 *                                 example: false
 *                               SummaryReport:
 *                                 type: boolean
 *                                 example: false
 *                               SuppressionReport:
 *                                 type: boolean
 *                                 example: false
 *                               UndeliverablesReport:
 *                                 type: boolean
 *                                 example: false
 *                           Software:
 *                             type: string
 *                             example: software123
 *                   example:
 *                     - Active: true
 *                       Facility: RWJEBC
 *                       InsuranceTransferLanguage: some description line
 *                       Job_GUID: 3aad5759-477e-4de8-bf5a-530f4a21e5d5
 *                       MinimumBalance: 75
 *                       PatientTransferLanguage: a different description line
 *                       Specs:
 *                         APIAvailable: false
 *                         APIDocumentation: null
 *                         Channels:
 *                           AmericanExpress: true
 *                           Discover: true
 *                           IVRPayments: false
 *                           IVRPhone: null
 *                           MailPayments: true
 *                           MailTo: some physical address
 *                           MasterCard: true
 *                           OnlinePayments: true
 *                           OtherAccepted: NA
 *                           OtherChannels: null
 *                           PaySite: www.paymesucka.com/now
 *                           PhoneLocal: 123-456-7890
 *                           PhonePayments: true
 *                           PhoneTollFree: 789-654-3210
 *                           Visa: true
 *                         ClientProvidedSpecSheet: false
 *                         DataCrosswalkProvided: true
 *                         DataFileProvided: true
 *                         ExtractErrors: true
 *                         HoldErrors: false
 *                         LockboxBank: null
 *                         LockboxCSZ: null
 *                         LockboxIntegration: true
 *                         Logos:
 *                           Location: C:\clients\P\PFS_zAdena\Logos\aFacilityLogo.jpg
 *                         PDFFileProvided: false
 *                         Reports:
 *                           FacilityPDFs: false
 *                           FacilityReport: false
 *                           MovesReport: false
 *                           NonCassReport: false
 *                           PrintPDFs: false
 *                           SummaryReport: false
 *                           SuppressionReport: false
 *                           UndeliverablesReport: false
 *                         Software: software123
 *             example:
 *               Facilities:
 *                 - Active: true
 *                   Facility: RWJEBC
 *                   InsuranceTransferLanguage: some description line
 *                   Job_GUID: 3aad5759-477e-4de8-bf5a-530f4a21e5d5
 *                   MinimumBalance: 75
 *                   PatientTransferLanguage: a different description line
 *                   Specs:
 *                     APIAvailable: false
 *                     APIDocumentation: null
 *                     Channels:
 *                       AmericanExpress: true
 *                       Discover: true
 *                       IVRPayments: false
 *                       IVRPhone: null
 *                       MailPayments: true
 *                       MailTo: some physical address
 *                       MasterCard: true
 *                       OnlinePayments: true
 *                       OtherAccepted: NA
 *                       OtherChannels: null
 *                       PaySite: www.paymesucka.com/now
 *                       PhoneLocal: 123-456-7890
 *                       PhonePayments: true
 *                       PhoneTollFree: 789-654-3210
 *                       Visa: true
 *                     ClientProvidedSpecSheet: false
 *                     DataCrosswalkProvided: true
 *                     DataFileProvided: true
 *                     ExtractErrors: true
 *                     HoldErrors: false
 *                     LockboxBank: null
 *                     LockboxCSZ: null
 *                     LockboxIntegration: true
 *                     Logos:
 *                       Location: C:\clients\P\PFS_zAdena\Logos\aFacilityLogo.jpg
 *                     PDFFileProvided: false
 *                     Reports:
 *                       FacilityPDFs: false
 *                       FacilityReport: false
 *                       MovesReport: false
 *                       NonCassReport: false
 *                       PrintPDFs: false
 *                       SummaryReport: false
 *                       SuppressionReport: false
 *                       UndeliverablesReport: false
 *                     Software: software123
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
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}:
 *     get:
 *       tags:
 *         - Facilities
 *       summary: /:facilityid
 *       description: /:facilityid
 *       operationId: facilityid
 *       responses:
 *         '200':
 *           description: ''
 *     delete:
 *       tags:
 *         - Facilities
 *       summary: /:facilityid
 *       description: /:facilityid
 *       operationId: facilityid2
 *       responses:
 *         '200':
 *           description: ''
 *     patch:
 *       tags:
 *         - Facilities
 *       summary: /:facilityid
 *       description: /:facilityid
 *       operationId: facilityid1
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Facilities:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Active:
 *                         type: boolean
 *                         example: true
 *                       Facility:
 *                         type: string
 *                         example: RWJEBC
 *                       InsuranceTransferLanguage:
 *                         type: string
 *                         example: some description line
 *                       Job_GUID:
 *                         type: string
 *                         example: 3aad5759-477e-4de8-bf5a-530f4a21e5d5
 *                       MinimumBalance:
 *                         type: number
 *                         example: 75
 *                       PatientTransferLanguage:
 *                         type: string
 *                         example: a different description line
 *                   example:
 *                     - Active: true
 *                       Facility: RWJEBC
 *                       InsuranceTransferLanguage: some description line
 *                       Job_GUID: 3aad5759-477e-4de8-bf5a-530f4a21e5d5
 *                       MinimumBalance: 75
 *                       PatientTransferLanguage: a different description line
 *             example:
 *               Facilities:
 *                 - Active: true
 *                   Facility: RWJEBC
 *                   InsuranceTransferLanguage: some description line
 *                   Job_GUID: 3aad5759-477e-4de8-bf5a-530f4a21e5d5
 *                   MinimumBalance: 75
 *                   PatientTransferLanguage: a different description line
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
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs:
 *     get:
 *       tags:
 *         - Specs
 *       summary: /
 *       description: /
 *       operationId: '15'
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
 *           description: ''
 *     post:
 *       tags:
 *         - Specs
 *       summary: /
 *       description: /
 *       operationId: '14'
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Specs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       APIAvailable:
 *                         type: boolean
 *                         example: false
 *                       Channels:
 *                         type: object
 *                         properties:
 *                           AmericanExpress:
 *                             type: boolean
 *                             example: true
 *                           Discover:
 *                             type: boolean
 *                             example: true
 *                           IVRPayments:
 *                             type: boolean
 *                             example: false
 *                           IVRPhone:
 *                             nullable: true
 *                             example: null
 *                           MailPayments:
 *                             type: boolean
 *                             example: true
 *                           MailTo:
 *                             type: string
 *                             example: some physical address
 *                           MasterCard:
 *                             type: boolean
 *                             example: true
 *                           OnlinePayments:
 *                             type: boolean
 *                             example: true
 *                           OnlineSite:
 *                             type: string
 *                             example: www.paymesucka.com/now
 *                           OtherAccepted:
 *                             type: string
 *                             example: NA
 *                           OtherChannels:
 *                             nullable: true
 *                             example: null
 *                           PhoneLocal:
 *                             type: string
 *                             example: 123-456-7890
 *                           PhonePayments:
 *                             type: boolean
 *                             example: true
 *                           PhoneTollFree:
 *                             type: string
 *                             example: 789-654-3210
 *                           Visa:
 *                             type: boolean
 *                             example: true
 *                       ClientProvidedSpecSheet:
 *                         type: boolean
 *                         example: false
 *                       DataCrosswalkProvided:
 *                         type: boolean
 *                         example: false
 *                       DataFileProvided:
 *                         type: boolean
 *                         example: false
 *                       ExtractErrors:
 *                         type: boolean
 *                         example: true
 *                       HoldErrors:
 *                         type: boolean
 *                         example: false
 *                       LockboxIntegration:
 *                         type: boolean
 *                         example: true
 *                       Logos:
 *                         type: object
 *                         properties:
 *                           Location:
 *                             type: string
 *                             example: C:\clients\P\PFS_zAdena\Logos\THEadena.jpg
 *                       PDFFileProvided:
 *                         type: boolean
 *                         example: false
 *                       Reports:
 *                         type: object
 *                         properties:
 *                           FacilityPDFs:
 *                             type: boolean
 *                             example: false
 *                           FacilityReport:
 *                             type: boolean
 *                             example: false
 *                           MovesReport:
 *                             type: boolean
 *                             example: false
 *                           NonCassReport:
 *                             type: boolean
 *                             example: false
 *                           PrintPDFs:
 *                             type: boolean
 *                             example: false
 *                           SummaryReport:
 *                             type: boolean
 *                             example: false
 *                           SuppressionReport:
 *                             type: boolean
 *                             example: false
 *                           UndeliverablesReport:
 *                             type: boolean
 *                             example: false
 *                       Software:
 *                         type: string
 *                         example: software012
 *                   example:
 *                     - APIAvailable: false
 *                       Channels:
 *                         AmericanExpress: true
 *                         Discover: true
 *                         IVRPayments: false
 *                         IVRPhone: null
 *                         MailPayments: true
 *                         MailTo: some physical address
 *                         MasterCard: true
 *                         OnlinePayments: true
 *                         OnlineSite: www.paymesucka.com/now
 *                         OtherAccepted: NA
 *                         OtherChannels: null
 *                         PhoneLocal: 123-456-7890
 *                         PhonePayments: true
 *                         PhoneTollFree: 789-654-3210
 *                         Visa: true
 *                       ClientProvidedSpecSheet: false
 *                       DataCrosswalkProvided: false
 *                       DataFileProvided: false
 *                       ExtractErrors: true
 *                       HoldErrors: false
 *                       LockboxIntegration: true
 *                       Logos:
 *                         Location: C:\clients\P\PFS_zAdena\Logos\THEadena.jpg
 *                       PDFFileProvided: false
 *                       Reports:
 *                         FacilityPDFs: false
 *                         FacilityReport: false
 *                         MovesReport: false
 *                         NonCassReport: false
 *                         PrintPDFs: false
 *                         SummaryReport: false
 *                         SuppressionReport: false
 *                         UndeliverablesReport: false
 *                       Software: software012
 *             example:
 *               Specs:
 *                 - APIAvailable: false
 *                   Channels:
 *                     AmericanExpress: true
 *                     Discover: true
 *                     IVRPayments: false
 *                     IVRPhone: null
 *                     MailPayments: true
 *                     MailTo: some physical address
 *                     MasterCard: true
 *                     OnlinePayments: true
 *                     OnlineSite: www.paymesucka.com/now
 *                     OtherAccepted: NA
 *                     OtherChannels: null
 *                     PhoneLocal: 123-456-7890
 *                     PhonePayments: true
 *                     PhoneTollFree: 789-654-3210
 *                     Visa: true
 *                   ClientProvidedSpecSheet: false
 *                   DataCrosswalkProvided: false
 *                   DataFileProvided: false
 *                   ExtractErrors: true
 *                   HoldErrors: false
 *                   LockboxIntegration: true
 *                   Logos:
 *                     Location: C:\clients\P\PFS_zAdena\Logos\THEadena.jpg
 *                   PDFFileProvided: false
 *                   Reports:
 *                     FacilityPDFs: false
 *                     FacilityReport: false
 *                     MovesReport: false
 *                     NonCassReport: false
 *                     PrintPDFs: false
 *                     SummaryReport: false
 *                     SuppressionReport: false
 *                     UndeliverablesReport: false
 *                   Software: software012
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
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}:
 *     get:
 *       tags:
 *         - Specs
 *       summary: /:specid
 *       description: /:specid
 *       operationId: specid
 *       responses:
 *         '200':
 *           description: ''
 *     delete:
 *       tags:
 *         - Specs
 *       summary: /:specid
 *       description: /:specid
 *       operationId: specid2
 *       responses:
 *         '200':
 *           description: ''
 *     patch:
 *       tags:
 *         - Specs
 *       summary: /:specid
 *       description: /:specid
 *       operationId: specid1
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Specs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       APIAvailable:
 *                         type: boolean
 *                         example: false
 *                       ClientProvidedSpecSheet:
 *                         type: boolean
 *                         example: false
 *                       DataCrosswalkProvided:
 *                         type: boolean
 *                         example: false
 *                       DataFileProvided:
 *                         type: boolean
 *                         example: false
 *                       ExtractErrors:
 *                         type: boolean
 *                         example: true
 *                       HoldErrors:
 *                         type: boolean
 *                         example: false
 *                       LockboxIntegration:
 *                         type: boolean
 *                         example: true
 *                       PDFFileProvided:
 *                         type: boolean
 *                         example: false
 *                       Software:
 *                         type: string
 *                         example: software012
 *                   example:
 *                     - APIAvailable: false
 *                       ClientProvidedSpecSheet: false
 *                       DataCrosswalkProvided: false
 *                       DataFileProvided: false
 *                       ExtractErrors: true
 *                       HoldErrors: false
 *                       LockboxIntegration: true
 *                       PDFFileProvided: false
 *                       Software: software012
 *             example:
 *               Specs:
 *                 - APIAvailable: false
 *                   ClientProvidedSpecSheet: false
 *                   DataCrosswalkProvided: false
 *                   DataFileProvided: false
 *                   ExtractErrors: true
 *                   HoldErrors: false
 *                   LockboxIntegration: true
 *                   PDFFileProvided: false
 *                   Software: software012
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
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/groups:
 *     post:
 *       tags:
 *         - Groups
 *       summary: /
 *       description: /
 *       operationId: '16'
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Groups:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Active:
 *                         type: boolean
 *                         example: true
 *                       GroupOnField1:
 *                         type: string
 *                         example: GROUPING_FIELD
 *                       GroupOnField2:
 *                         nullable: true
 *                         example: null
 *                       GroupOnField3:
 *                         nullable: true
 *                         example: null
 *                       GroupOnField4:
 *                         nullable: true
 *                         example: null
 *                       GroupOnField5:
 *                         nullable: true
 *                         example: null
 *                   example:
 *                     - Active: true
 *                       GroupOnField1: GROUPING_FIELD
 *                       GroupOnField2: null
 *                       GroupOnField3: null
 *                       GroupOnField4: null
 *                       GroupOnField5: null
 *             example:
 *               Groups:
 *                 - Active: true
 *                   GroupOnField1: GROUPING_FIELD
 *                   GroupOnField2: null
 *                   GroupOnField3: null
 *                   GroupOnField4: null
 *                   GroupOnField5: null
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
 *       - name: specid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/groups/{groupid}:
 *     get:
 *       tags:
 *         - Groups
 *       summary: /:groupid
 *       description: /:groupid
 *       operationId: groupid
 *       responses:
 *         '200':
 *           description: ''
 *     delete:
 *       tags:
 *         - Groups
 *       summary: /:groupid
 *       description: /:groupid
 *       operationId: groupid2
 *       responses:
 *         '200':
 *           description: ''
 *     patch:
 *       tags:
 *         - Groups
 *       summary: /:groupid
 *       description: /:groupid
 *       operationId: groupid1
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Groups:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Active:
 *                         type: boolean
 *                         example: true
 *                       GroupOnField1:
 *                         type: string
 *                         example: GROUP_HERE
 *                       GroupOnField2:
 *                         type: string
 *                         example: ''
 *                       GroupOnField3:
 *                         type: string
 *                         example: ''
 *                       GroupOnField4:
 *                         type: string
 *                         example: ''
 *                       GroupOnField5:
 *                         type: string
 *                         example: ''
 *                   example:
 *                     - Active: true
 *                       GroupOnField1: GROUP_HERE
 *                       GroupOnField2: ''
 *                       GroupOnField3: ''
 *                       GroupOnField4: ''
 *                       GroupOnField5: ''
 *             example:
 *               Groups:
 *                 - Active: true
 *                   GroupOnField1: GROUP_HERE
 *                   GroupOnField2: ''
 *                   GroupOnField3: ''
 *                   GroupOnField4: ''
 *                   GroupOnField5: ''
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
 *       - name: groupid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 1e931b34-9f31-4dec-8443-e3d62432a9fc
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/reports:
 *     post:
 *       tags:
 *         - Reports
 *       summary: /
 *       description: /
 *       operationId: '17'
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Reports:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       FacilityPDFs:
 *                         type: boolean
 *                         example: false
 *                       FacilityReport:
 *                         type: boolean
 *                         example: false
 *                       MovesReport:
 *                         type: boolean
 *                         example: false
 *                       NonCassReport:
 *                         type: boolean
 *                         example: false
 *                       PrintPDFs:
 *                         type: boolean
 *                         example: false
 *                       Spec_GUID:
 *                         type: string
 *                         example: e3f4c842-623b-4e7d-a049-11c51e19d6fb
 *                       SummaryReport:
 *                         type: boolean
 *                         example: false
 *                       SuppressionReport:
 *                         type: boolean
 *                         example: false
 *                       UndeliverablesReport:
 *                         type: boolean
 *                         example: false
 *                   example:
 *                     - FacilityPDFs: false
 *                       FacilityReport: false
 *                       MovesReport: false
 *                       NonCassReport: false
 *                       PrintPDFs: false
 *                       Spec_GUID: e3f4c842-623b-4e7d-a049-11c51e19d6fb
 *                       SummaryReport: false
 *                       SuppressionReport: false
 *                       UndeliverablesReport: false
 *             example:
 *               Reports:
 *                 - FacilityPDFs: false
 *                   FacilityReport: false
 *                   MovesReport: false
 *                   NonCassReport: false
 *                   PrintPDFs: false
 *                   Spec_GUID: e3f4c842-623b-4e7d-a049-11c51e19d6fb
 *                   SummaryReport: false
 *                   SuppressionReport: false
 *                   UndeliverablesReport: false
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
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/reports/{reportid}:
 *     get:
 *       tags:
 *         - Reports
 *       summary: /:reportid
 *       description: /:reportid
 *       operationId: reportid
 *       responses:
 *         '200':
 *           description: ''
 *     delete:
 *       tags:
 *         - Reports
 *       summary: /:reportid
 *       description: /:reportid
 *       operationId: reportid2
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Will need to update MasterUploadReady=false:
 *                   type: string
 *                   example: do this
 *             example:
 *               Will need to update MasterUploadReady=false: do this
 *       responses:
 *         '200':
 *           description: ''
 *     patch:
 *       tags:
 *         - Reports
 *       summary: /:reportid
 *       description: /:reportid
 *       operationId: reportid1
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Reports:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       FacilityPDFs:
 *                         type: boolean
 *                         example: false
 *                       FacilityReport:
 *                         type: boolean
 *                         example: false
 *                       MovesReport:
 *                         type: boolean
 *                         example: false
 *                       NonCassReport:
 *                         type: boolean
 *                         example: false
 *                       PrintPDFs:
 *                         type: boolean
 *                         example: false
 *                       SummaryReport:
 *                         type: boolean
 *                         example: true
 *                       SuppressionReport:
 *                         type: boolean
 *                         example: false
 *                       UndeliverablesReport:
 *                         type: boolean
 *                         example: false
 *                   example:
 *                     - FacilityPDFs: false
 *                       FacilityReport: false
 *                       MovesReport: false
 *                       NonCassReport: false
 *                       PrintPDFs: false
 *                       SummaryReport: true
 *                       SuppressionReport: false
 *                       UndeliverablesReport: false
 *             example:
 *               Reports:
 *                 - FacilityPDFs: false
 *                   FacilityReport: false
 *                   MovesReport: false
 *                   NonCassReport: false
 *                   PrintPDFs: false
 *                   SummaryReport: true
 *                   SuppressionReport: false
 *                   UndeliverablesReport: false
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
 *           example: ''
 *       - name: specid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: e3f4c842-623b-4e7d-a049-11c51e19d6fb
 *       - name: reportid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/filters:
 *     get:
 *       tags:
 *         - Filters
 *       summary: /
 *       description: /
 *       operationId: '19'
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
 *           description: ''
 *     post:
 *       tags:
 *         - Filters
 *       summary: /
 *       description: /
 *       operationId: '18'
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
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/filters/{filterid}:
 *     get:
 *       tags:
 *         - Filters
 *       summary: /:filterid
 *       description: /:filterid
 *       operationId: filterid
 *       responses:
 *         '200':
 *           description: ''
 *     delete:
 *       tags:
 *         - Filters
 *       summary: /:filterid
 *       description: /:filterid
 *       operationId: filterid2
 *       responses:
 *         '200':
 *           description: ''
 *     patch:
 *       tags:
 *         - Filters
 *       summary: /:filterid
 *       description: /:filterid
 *       operationId: filterid1
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
 *                         example: Filter field on this value instead
 *                   example:
 *                     - Active: true
 *                       FilterOnField: FILTER_ON_FIELD
 *                       FilterValue: Filter field on this value instead
 *             example:
 *               Filters:
 *                 - Active: true
 *                   FilterOnField: FILTER_ON_FIELD
 *                   FilterValue: Filter field on this value instead
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
 *       - name: filterid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 33E6E5D8-AD28-4572-ADA4-89A59C55708D
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/channels:
 *     post:
 *       tags:
 *         - Channels
 *       summary: /
 *       description: /
 *       operationId: '20'
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Channels:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       AmericanExpress:
 *                         type: boolean
 *                         example: true
 *                       Discover:
 *                         type: boolean
 *                         example: true
 *                       Facility_GUID:
 *                         type: string
 *                         example: 1f80ff20-5afc-44d5-9407-910ab3c63eca
 *                       IVRPayments:
 *                         type: boolean
 *                         example: false
 *                       IVRPhone:
 *                         nullable: true
 *                         example: null
 *                       MailPayments:
 *                         type: boolean
 *                         example: true
 *                       MailTo:
 *                         type: string
 *                         example: some physical address
 *                       MasterCard:
 *                         type: boolean
 *                         example: true
 *                       OnlinePayments:
 *                         type: boolean
 *                         example: true
 *                       OtherAccepted:
 *                         type: string
 *                         example: NA
 *                       OtherChannels:
 *                         nullable: true
 *                         example: null
 *                       PaySite:
 *                         type: string
 *                         example: www.paymesucka.com/now
 *                       PhoneLocal:
 *                         type: string
 *                         example: 123-456-7890
 *                       PhonePayments:
 *                         type: boolean
 *                         example: true
 *                       PhoneTollFree:
 *                         type: string
 *                         example: 789-654-3210
 *                       Spec_GUID:
 *                         type: string
 *                         example: e3f4c842-623b-4e7d-a049-11c51e19d6fb
 *                       Visa:
 *                         type: boolean
 *                         example: true
 *                   example:
 *                     - AmericanExpress: true
 *                       Discover: true
 *                       Facility_GUID: 1f80ff20-5afc-44d5-9407-910ab3c63eca
 *                       IVRPayments: false
 *                       IVRPhone: null
 *                       MailPayments: true
 *                       MailTo: some physical address
 *                       MasterCard: true
 *                       OnlinePayments: true
 *                       OtherAccepted: NA
 *                       OtherChannels: null
 *                       PaySite: www.paymesucka.com/now
 *                       PhoneLocal: 123-456-7890
 *                       PhonePayments: true
 *                       PhoneTollFree: 789-654-3210
 *                       Spec_GUID: e3f4c842-623b-4e7d-a049-11c51e19d6fb
 *                       Visa: true
 *             example:
 *               Channels:
 *                 - AmericanExpress: true
 *                   Discover: true
 *                   Facility_GUID: 1f80ff20-5afc-44d5-9407-910ab3c63eca
 *                   IVRPayments: false
 *                   IVRPhone: null
 *                   MailPayments: true
 *                   MailTo: some physical address
 *                   MasterCard: true
 *                   OnlinePayments: true
 *                   OtherAccepted: NA
 *                   OtherChannels: null
 *                   PaySite: www.paymesucka.com/now
 *                   PhoneLocal: 123-456-7890
 *                   PhonePayments: true
 *                   PhoneTollFree: 789-654-3210
 *                   Spec_GUID: e3f4c842-623b-4e7d-a049-11c51e19d6fb
 *                   Visa: true
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
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/channels/{channelid}:
 *     get:
 *       tags:
 *         - Channels
 *       summary: /:channelid
 *       description: /:channelid
 *       operationId: channelid
 *       responses:
 *         '200':
 *           description: ''
 *     patch:
 *       tags:
 *         - Channels
 *       summary: /:channelid
 *       description: /:channelid
 *       operationId: channelid1
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Channels:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       AmericanExpress:
 *                         type: boolean
 *                         example: true
 *                       Discover:
 *                         type: boolean
 *                         example: true
 *                       IVRPayments:
 *                         type: boolean
 *                         example: false
 *                       IVRPhone:
 *                         nullable: true
 *                         example: null
 *                       MailPayments:
 *                         type: boolean
 *                         example: true
 *                       MailTo:
 *                         type: string
 *                         example: some new address
 *                       MasterCard:
 *                         type: boolean
 *                         example: true
 *                       OnlinePayments:
 *                         type: boolean
 *                         example: true
 *                       OnlineSite:
 *                         type: string
 *                         example: www.paymesucka.com/now
 *                       OtherAccepted:
 *                         type: string
 *                         example: NA
 *                       OtherChannels:
 *                         nullable: true
 *                         example: null
 *                       PhoneLocal:
 *                         type: string
 *                         example: 123-456-7890
 *                       PhonePayments:
 *                         type: boolean
 *                         example: true
 *                       PhoneTollFree:
 *                         type: string
 *                         example: 789-654-3210
 *                       Visa:
 *                         type: boolean
 *                         example: true
 *                   example:
 *                     - AmericanExpress: true
 *                       Discover: true
 *                       IVRPayments: false
 *                       IVRPhone: null
 *                       MailPayments: true
 *                       MailTo: some new address
 *                       MasterCard: true
 *                       OnlinePayments: true
 *                       OnlineSite: www.paymesucka.com/now
 *                       OtherAccepted: NA
 *                       OtherChannels: null
 *                       PhoneLocal: 123-456-7890
 *                       PhonePayments: true
 *                       PhoneTollFree: 789-654-3210
 *                       Visa: true
 *             example:
 *               Channels:
 *                 - AmericanExpress: true
 *                   Discover: true
 *                   IVRPayments: false
 *                   IVRPhone: null
 *                   MailPayments: true
 *                   MailTo: some new address
 *                   MasterCard: true
 *                   OnlinePayments: true
 *                   OnlineSite: www.paymesucka.com/now
 *                   OtherAccepted: NA
 *                   OtherChannels: null
 *                   PhoneLocal: 123-456-7890
 *                   PhonePayments: true
 *                   PhoneTollFree: 789-654-3210
 *                   Visa: true
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
 *       - name: channelid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: c696b0ac-5be6-4a91-97ab-a53d31bd3926
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/logos:
 *     get:
 *       tags:
 *         - Logos
 *       summary: /
 *       description: /
 *       operationId: '22'
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
 *           description: ''
 *     post:
 *       tags:
 *         - Logos
 *       summary: /
 *       description: /
 *       operationId: '21'
 *       requestBody:
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 logos:
 *                   type: string
 *                   format: binary
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
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/logos/{logoid}:
 *     get:
 *       tags:
 *         - Logos
 *       summary: /:logoid
 *       description: /:logoid
 *       operationId: logoid
 *       responses:
 *         '200':
 *           description: ''
 *     put:
 *       tags:
 *         - Logos
 *       summary: /:logoid
 *       description: /:logoid
 *       operationId: logoid1
 *       requestBody:
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 logos:
 *                   type: string
 *                   format: binary
 *       responses:
 *         '200':
 *           description: ''
 *     delete:
 *       tags:
 *         - Logos
 *       summary: /:logoid
 *       description: /:logoid
 *       operationId: logoid2
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
 *       - name: logoid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/inserts:
 *     get:
 *       tags:
 *         - Inserts
 *       summary: /
 *       description: /
 *       operationId: '24'
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
 *           description: ''
 *     post:
 *       tags:
 *         - Inserts
 *       summary: /
 *       description: /
 *       operationId: '23'
 *       requestBody:
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 inserts:
 *                   type: string
 *                   format: binary
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
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/inserts/{insertid}:
 *     get:
 *       tags:
 *         - Inserts
 *       summary: /:insertid
 *       description: /:insertid
 *       operationId: insertid
 *       responses:
 *         '200':
 *           description: ''
 *     put:
 *       tags:
 *         - Inserts
 *       summary: /:insertid
 *       description: /:insertid
 *       operationId: insertid1
 *       requestBody:
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 inserts:
 *                   type: string
 *                   format: binary
 *       responses:
 *         '200':
 *           description: ''
 *     delete:
 *       tags:
 *         - Inserts
 *       summary: /:insertid
 *       description: /:insertid
 *       operationId: insertid2
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
 *       - name: insertid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/layouts:
 *     get:
 *       tags:
 *         - Layouts
 *       summary: /
 *       description: /
 *       operationId: '26'
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
 *           description: ''
 *     post:
 *       tags:
 *         - Layouts
 *       summary: /
 *       description: /
 *       operationId: '25'
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Layouts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties: {}
 *                   example:
 *                     - {}
 *             example:
 *               Layouts:
 *                 - {}
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
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/layouts/{layoutid}:
 *     get:
 *       tags:
 *         - Layouts
 *       summary: /:layoutid
 *       description: /:layoutid
 *       operationId: layoutid
 *       responses:
 *         '200':
 *           description: ''
 *     delete:
 *       tags:
 *         - Layouts
 *       summary: /:layoutid
 *       description: /:layoutid
 *       operationId: layoutid2
 *       responses:
 *         '200':
 *           description: ''
 *     patch:
 *       tags:
 *         - Layouts
 *       summary: /:layoutid
 *       description: /:layoutid
 *       operationId: layoutid1
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Layouts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties: {}
 *                   example:
 *                     - {}
 *             example:
 *               Layouts:
 *                 - {}
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
 *       - name: layoutid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/layouts/{layoutid}/messages:
 *     get:
 *       tags:
 *         - Messages
 *       summary: /
 *       description: /
 *       operationId: '28'
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
 *           description: ''
 *     post:
 *       tags:
 *         - Messages
 *       summary: /
 *       description: /
 *       operationId: '27'
 *       requestBody:
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: string
 *                   format: binary
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
 *       - name: layoutid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/layouts/{layoutid}/messages/{messageid}:
 *     get:
 *       tags:
 *         - Messages
 *       summary: /:messageid
 *       description: /:messageid
 *       operationId: messageid
 *       responses:
 *         '200':
 *           description: ''
 *     put:
 *       tags:
 *         - Messages
 *       summary: /:messageid
 *       description: /:messageid
 *       operationId: messageid1
 *       requestBody:
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: string
 *                   format: binary
 *       responses:
 *         '200':
 *           description: ''
 *     delete:
 *       tags:
 *         - Messages
 *       summary: /:messageid
 *       description: /:messageid
 *       operationId: messageid2
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
 *       - name: layoutid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: messageid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/layouts/{layoutid}/charts:
 *     get:
 *       tags:
 *         - Charts
 *       summary: /
 *       description: /
 *       operationId: '30'
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
 *           description: ''
 *     post:
 *       tags:
 *         - Charts
 *       summary: /
 *       description: /
 *       operationId: '29'
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Charts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties: {}
 *                   example:
 *                     - {}
 *             example:
 *               Charts:
 *                 - {}
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
 *       - name: layoutid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/layouts/{layoutid}/charts/{chartid}:
 *     get:
 *       tags:
 *         - Charts
 *       summary: /:chartid
 *       description: /:chartid
 *       operationId: chartid
 *       responses:
 *         '200':
 *           description: ''
 *     delete:
 *       tags:
 *         - Charts
 *       summary: /:chartid
 *       description: /:chartid
 *       operationId: chartid2
 *       responses:
 *         '200':
 *           description: ''
 *     patch:
 *       tags:
 *         - Charts
 *       summary: /:chartid
 *       description: /:chartid
 *       operationId: chartid1
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Charts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties: {}
 *                   example:
 *                     - {}
 *             example:
 *               Charts:
 *                 - {}
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
 *       - name: layoutid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: chartid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/layouts/{layoutid}/styles:
 *     get:
 *       tags:
 *         - Styles
 *       summary: /
 *       description: /
 *       operationId: '32'
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
 *           description: ''
 *     post:
 *       tags:
 *         - Styles
 *       summary: /
 *       description: /
 *       operationId: '31'
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Styles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties: {}
 *                   example:
 *                     - {}
 *             example:
 *               Styles:
 *                 - {}
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
 *       - name: layoutid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/layouts/{layoutid}/styles/{styleid}:
 *     get:
 *       tags:
 *         - Styles
 *       summary: /:styleid
 *       description: /:styleid
 *       operationId: styleid
 *       responses:
 *         '200':
 *           description: ''
 *     delete:
 *       tags:
 *         - Styles
 *       summary: /:styleid
 *       description: /:styleid
 *       operationId: styleid2
 *       responses:
 *         '200':
 *           description: ''
 *     patch:
 *       tags:
 *         - Styles
 *       summary: /:styleid
 *       description: /:styleid
 *       operationId: styleid1
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Styles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties: {}
 *                   example:
 *                     - {}
 *             example:
 *               Styles:
 *                 - {}
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
 *       - name: layoutid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: styleid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 * tags:
 *   - name: Clients
 *   - name: Users
 *   - name: Contracts
 *   - name: Services
 *   - name: Products
 *   - name: Prices
 *   - name: Invoices
 *   - name: Deposits
 *   - name: Credits
 *   - name: Jobs
 *   - name: Processes
 *   - name: Workflows
 *   - name: Contacts
 *   - name: Downloads
 *   - name: Returns
 *   - name: Orders
 *   - name: Versions
 *   - name: Orbipays
 *   - name: Facilities
 *   - name: Specs
 *   - name: Groups
 *   - name: Reports
 *   - name: Filters
 *   - name: Channels
 *   - name: STOPPED HERE
 *   - name: Logos
 *   - name: Inserts
 *   - name: Layouts
 *   - name: Messages
 *   - name: Charts
 *   - name: Styles
 */