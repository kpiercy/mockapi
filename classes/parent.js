class parent {
    constructor (_guid, _name, _status, _erpid, _erpcode) {
        this.pub_gid = _guid;
        this.ParentName = _name;
        this.Status = _status;
        this.ERP_ID = _erpid;
        this.ERP_Code = _erpcode;
    }
}

module.exports = parent;