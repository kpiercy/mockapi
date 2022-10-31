class download {
    constructor(_guid, _jobguid, _isactive, _remote, _mask, _task, _pass, _local, _server, _ignore, _stamp, _rename, _newname, _append, _convert, _newdelim, _newext, _newcols) {
        this.pub_gid = _guid;
        this.jobid = _jobguid;
        this.isActive = _isactive;
        this.ftpDirectory = _remote;
        this.fileMask = _mask;
        this.addtlTaskAfter = _task;
        this.Password = _pass;
        this.localDirectory = _local;
        this.ftpServer = _server;
        this.ignoreFile = _ignore;
        this.timestampFile = _stamp;
        this.renameFile = _rename;
        this.newFilename = _newname;
        this.Append = _append;
        this.needsConversion = _convert;
        this.newDelim = _newdelim;
        this.newExt = _newext;
        this.headerCount = _newcols;
    }
}

module.exports = download;