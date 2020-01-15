
export default class Notice {
  constructor() {
    this.id = '';
    this.type = '';	
    this.text = '';	
    this.icon = '';	
    this.start = '';
    this.end = '';
    this.condo = '';
    this.status = '';
    this.created = '';
    this.modified = '';
  }

  set notice(id, type, text, icon, start, end, condo, status, created, modified){
    this.id = id;
    this.type = type;	
    this.text = text;	
    this.icon = icon;	
    this.start = start;
    this.end = end;
    this.condo = condo;
    this.status = status;
    this.created = created;
    this.modified = modified ;
  }

  get notice(){
      return [this.id, this.type, this.text, this.icon, this.start, this.end, this.condo, this.status, this.created, this.modified];
  }

  set id(id) {
    this.id = id;
  }
  get id() {
    return this.id;
  }

  set type(type) {
    this.type = type;
  }
  get type() {
    return this.type;
  }

  set text(text) {
    this.text = text;
  }
  get text() {
    return this.text;
  }

  set icon(icon) {
    this.icon = icon;
  }
  get icon() {
    return this.icon;
  }

  set start(start) {
    this.start = start;
  }
  get start() {
    return this.start;
  }

  set end(end) {
    this.end = end;
  }
  get end() {
    return this.end;
  }

  set condo(condo) {
    this.condo = condo;
  }
  get condo() {
    return this.condo;
  }
  
  set status(status) {
    this.status = status;
  }
  get status() {
    return this.status;
  }

  set created(created) {
    this.created = created;
  }
  get created() {
    return this.created;
  }

  set modified(modified) {
    this.modified = modified;
  }
  get modified() {
    return this.modified;
  }
}

