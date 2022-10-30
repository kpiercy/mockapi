class contact {
    constructor (_guid, _jobguid, _isactive, _type, _first, _last, _phone, _email) {
        this.pub_gid = _guid;
        this.isActive = _isactive;
        this.ContactType = _type;
        this.firstName = _first;
        this.lastName = _last;
        this.phone1 = _phone;
        this.email = _email;
    }
}

module.exports = contact;