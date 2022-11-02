class order {
    constructor(_guid, _jobid, _template, _current, _tempversid, _type, _xstatus, _svcpo, _pospo, _apiready, _neworderready, _autoneworderready, _previous, _next, _autoinv) {
        this.jobwo_pub_gid = _guid;
        this.wo_jobid = _jobguid;
        this.OrderTemplateNumber = _template;
        this.CurrentOrderNumber = _current;
        this.MasterVersionID = _tempversid;
        this.BillType = _type;
        this.xebraJobStatus = _xstatus;
        this.svcsPO = _svcpo;
        this.posPO = _pospo;
        this.apiReady = apiready;
        this.NewOrderReady = _neworderready;
        this.autoNewOrderReady = _autoneworderready;
        this.PrevOrderNum = _previous;
        this.NextOrderNum = _next;
        this.autoInv = _autoinv;
    }
}

module.exports = order;