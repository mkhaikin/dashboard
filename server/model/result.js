
class Result {
  constructor() {
    this._data = '';
    this._message = '';	
  }

  setResult(res, mess){
    this._data = res;
    this._message = mess;	
  }

  getResult(){
      return [this._data, this._message];
  }

  set data(res) {
    this._data = res;
  }
  get data() {
    return this._data;
  }

  set message(mess) {
    this._message = mess;
  }
  get message() {
    return this._message;
  }
}

module.exports = new Result(); 