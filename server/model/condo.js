
export default class Condo {
  constructor() {
    this.id = '';
    this.code = ''; 
    this.name = '';	
    this.status = '';	
  }

  set condo(id, code, name, status){
    this.id = id;
    this.code = code;
    this.name = name;	
    this.status = status;	
  }

  get condo(){
      return [this.id, this.code, this.name, this.status];
  }

  set id(id) {
    this.id = id;
  }
  get id() {
    return this.id;
  }

  set code(code) {
    this.code = code;
  }
  get code() {
    return this.code;
  }

  set name(name) {
    this.name = name;
  }
  get name() {
    return this.name;
  }

  set status(status) {
    this.status = status;
  }
  get status() {
    return this.status;
  }
}

