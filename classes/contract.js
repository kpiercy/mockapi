class contract {
    constructor(_guid, _clientguid, _presented, _signed, _epsSigner1, _epsSigner2, _cxSigner1, _cxSigner2, _effective, _isactive) {
        this.pub_gid = _guid;
        this.clientid = _clientguid;
        this.presented = _presented;
        this.signed = _signed;
        this.epsSigner = _epsSigner1;
        this.epsSigner2 = _epsSigner2;
        this.cxSigner = _cxSigner1;
        this.cxSigner2 = _cxSigner2;
        this.effective = _effective;
        this.isActive = _isactive;
    }
}

module.exports = contract;