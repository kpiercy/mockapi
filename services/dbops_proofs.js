require('dotenv').config()

var configJobData = require('../config/JobData_dbconfig');
const sql = require('mssql/msnodesqlv8');


async function getProof(ID){
    try{
        let pool = await sql.connect(configJobData);
        let proof = await pool.request()
            .input('pID', sql.Int, ID)
            .execute('GetProofbyID')
    return proof.recordsets;
    }

    catch (error){
        console.log(error);
    }
}

async function addProof(proof){
    try{
        let pool = await sql.connect(configJobData);
        let insertProof = await pool.request()
            .input('proofs', sql.NVarChar, proof)
            .execute('addProofs');

        return insertProof.recordsets;
    }
    catch (error){
        console.log(error);
    }
}

async function updateProof(proofresult){
    try{
        let pool = await sql.connect(configJobData);
        let updateProof = await pool.request()
            .input('proofs', sql.NVarChar, proofresult)
            .execute('updateProof');

        return updateProof.recordsets;
    }
    catch (error){
        console.log(error);
    }
}

module.exports = {
    getProof: getProof,
    addProof: addProof,
    updateProof: updateProof
}