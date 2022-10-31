class returns {
    constructor(_guid, _jobguid, _remote, _mask, _task, _pass, _local, _server, _timebased, _uploadtime, _daysupl, _type, _zipname, _multiUp, _multiServer, _multiRemote) {
        this.pub_gid = _guid;
        this.jobid = _jobguid;
        this.isActive = _isactive;
        this.ftpDirectory = _remote;
        this.fileMask = _mask;
        this.addtlTaskAfter = _task;
        this.Password = _pass;
        this.localDirectory = _local;
        this.ftpServer = _server;
        this.timeBased = _timebased;
        this.uploadTime = _uploadtime;
        this.daysUploaded = _daysupl;
        this.uploadType = _type;
        this.zipName = _zipname;
        this.multiUpload = _multiUp;
        this.multiServer = _multiServer;
        this.multiFTPDirectory = _multiRemote;
    }
}

module.exports = returns;