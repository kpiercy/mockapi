class filter {
    constructor(_guid, _specguid, _isactive, _filterfield, _filtervalue) {
        this.pub_gid = _guid;
        this.specid = _specguid;
        this.isActive = _isactive;
        this.filterField = _filterfield;
        this.filterValue = _filtervalue;
    }
}

module.exports = filter;