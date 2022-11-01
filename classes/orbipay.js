class orbipay {
    constructor(_guid
        , _jobguid
        , _jobname
        , _status
        , _local
        , _partnerkey
        , _fileid
        , _type
        , _chainjob
        , _filesreqd
        , _logname
        , _wait
        , _waitLen
        , _procmask
        , _amfmask
        , _invmask1
        , _invmaskk2
        , _dafmask
        , _encrypt
        , _parsesuccess
        , _hasrpts
        , _rptdir
        , _rptmask
        , _paymask
        , _payftp
        , _zipmask
        , _uploadstart
        , _uploadend
        , _lastvers ) {
        this.pay_pub_gid = _guid;
      this.pay_jobid = _jobguid;
      this.jobName = _jobname;
      this.jobStatus = _status;
      this.rootDir = _local;
      this.partnerKey = _partnerkey;
      this.fileID = _fileid;
      this.jobType = _type;
      this.chainJob = _chainjob;
      this.filesReqd = _filesreqd;
      this.logName = _logname;
      this.wait = _wait;
      this.waitLength = _waitLen;
      this.procMask = _procmask;
      this.amfMask = _amfmask;
      this.invMask1 = _invmask1;
      this.invMask2 = _invmask2;
      this.dafMask = _dafmask;
      this.encrypt = _encrypt;
      this.parseSucccess = _parsesuccess;
      this.hasRpts = _hasrpts;
      this.reportDir = _rptdir;
      this.rptMask = _rptmask;
      this.payMask = _paymask;
      this.payFTP = _payftp;
      this.zipMask = _zipmask;
      this.uploadStart = _uploadstart;
      this.uploadEnd = _uploadend;
      this.lastJobVersRan = _lastvers;
    }
}

module.exports = orbipay;