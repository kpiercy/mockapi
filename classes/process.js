class process {
    constructor(_guid, _jobguid, _procdir, _archivedir, _wait, _parsesuccess, _printsuccess, _masterready, _timebased, _timeran, _daysran, _filesready, _bypass, _unzip, _presortpage, _stampfield, _filesreq, _chainjob, _automoves, _gaready, _onceaday, _rantoday) {
        this.au_pub_gid = _guid;
        this.au_jobid = _jobguid;
        this.ProcessingDirectory = _procdir;
        this.DownloadArchiveDirectory = _archivedir;
        this.TaskWait = _wait;
        this.ParseSuccess = _parsesuccess;
        this.PrintSuccess = _printsuccess;
        this.MasterReady = _masterready;
        this.TimeBased = _timebased;
        this.TimeRan = _timeran;
        this.DaysRan = _daysran;
        this.FilesReady = _filesready;
        this.Bypass = _bypass;
        this.Unzip = _unzip;
        this.PresortPage = _presortpage;
        this.TimeStampField = _stampfield;
        this.FilesRequired = _filesreq;
        this.ChainJob = _chainjob;
        this.AutomateMoves = _automoves;
        this.GoMasterReady = _gaready;
        this.Onceaday = _onceaday;
        this.RanToday = _rantoday;
    }
}

module.exports = process;