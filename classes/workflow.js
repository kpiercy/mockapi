class workflow {
    constructor (_guid, _jobguid, _alacriti, _paperless, _printtopath, _estmtpath, _uncpath, _runmode, _subproc, _batchsize, _design, _printpdf, _facilitypdf, _uptbl, _runstoredproc, _datasource, _storedprocname, _tblname) {
        this.pp_pub_gid = _guid;
        this.pp_jobid = _jobguid;
        this.Alacriti = _alacriti;
        this.Paperless = _paperless;
        this.PrintPath = _printpath;
        this.EstmtPath = _estmtpath;
        this.UNCPath = _uncpath;
        this.RunMode = _runmode;
        this.Subprocess = _subproc;
        this.BatchSize = _batchsize;
        this.Design = _design;
        this.printPDFs = _printpdf;
        this.facilityPDFs = _facilitypdf;
        this.tblUpdate = _uptbl;
        this.runStoredProc = _runstoredproc;
        this.dataSrcName = _datasource;
        this.storedProcName = _storedprocname;
        this.dbTblName = _tblname;
    }
}

module.exports = workflow;