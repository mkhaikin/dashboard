
export default class Picture {
  constructor() {
    this.id = '';
    this.name = '';	
  }

  set picture(id, name){
    this.id = id;
    this.name = name;	
  }

  get picture(){
      return [this.id, this.name];
  }

  set id(id) {
    this.id = id;
  }
  get id() {
    return this.id;
  }

  set name(name) {
    this.name = name;
  }
  get name() {
    return this.name;
  }
}

