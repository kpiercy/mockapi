class job {
    constructor (_guid, _clientguid, _name, _rootpath, _parentguid, _isactive) {
        this.job_pub_gid = _guid;
        this.job_clientid = _clientguid;
        this.JobName = _name;
        this.ClientRootPath = _rootpath;
        this.job_parent_clientid = _parentguid;
        this.isActive = _isactive;
    }
}

module.exports = job;