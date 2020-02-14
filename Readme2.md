Some architecture ideas (By The working Architecture of Node.js Applications – Viktor Turskyi:).

Rule 1: Separate service class (implemented a command) for each endpoint

router.post( ‘/posts’, function( req, res){
	const context =  ;
	const params = req.body;

	const service = new PostCreate({context});
	const promise = service.run(params);

	renderPromiseAsJson(res, promise);
});

Code with meta programming:

import chista from ‘../chista.js’;

import PostsCreate from ‘../services/posts/Create’
import PostsUpdate from ‘../services/posts/Update’
import PostsDelete from ‘../services/posts/Delete’
import PostsList from ‘../services/posts/List’
import PostsShow from ‘../services/posts/Show’

export default {
	create : chista.makeServiceRunner(PostsCreate, req => req.body),
	update : chista.makeServiceRunner(PostsUpdate, req =>({...req.body, id: req.params.id})),
	delete : chista.makeServiceRunner(PostsDelete, req =>({id:req.params.id})),
	list : chista.makeServiceRunner(PostsList, req =>({...req.query, ...req.params})),
	show : chista.makeServiceRunner(PostsShow, req =>({id: req.params.id}))
}


 Service Base class

class Base {
	constructor(args){
		if(!args.context) throw new Error(‘CONTEXT_REQUIRED’);
		this.context = args.context;
	}
	run(params){
		return this.validate(params).then(cleanParams => {
			return this.execute(cleanParams);
		});
	}
}

import {} from ‘../utils.js’
const Post = mongoose.model(‘Post’);

export default class PostCreate extends Base{
	async validate(data){
		const rules = {
			data : [ ‘required’, { ‘nested_object’:{
				title 		: [‘required’],
				subtitle		: [‘required’],
				image		: [‘not_empty’, ‘url’],
				text		: [‘required’],
				isPublished	: [‘not_empty’]
			}}]
		};

		return validator.validate(data, rules);
	}


	async execute(data){
		const post = await Post.create(dada.data);
		return {
			dumpPost(post)
		};
	}
}


“run” method:

Template method in base class
Guarantees that all procedures are kept:
Data was validated
“execute” will be called only after validation
“execute” will receive only clean data Checks permissions before calling “execute”
Throws exception in case of validation errors.

Rule 2: Never return objects directly
async execute(data){
	const post = await Post.create(data.data);
	return {
		data : dumpPost(post)
	};
}

export function dumpPost(post){
	return {
		id	       : post. id,
		title	       : post. title,
		subtitle	       : post. subtitle,
		text	       : post. text,
		isPublished : post. isPublished,
		image	       : post. image
	};
}

In that case you know what you return (no internal/secret data there)and your API is stable

Rule 3: use await/async

Rule 4: Unified approach to validation
Do not trust any user input
Declarative validation (every field has described rule of validation)
Exclude all fields that do not have validation rules described
Do not return understandable error codes (neither error messages nor numeric codes)
It should be clear for the service user what is wrong with his data

LIVR for the validation: http://livr-spec.org/


Rule 5:Be aware of “Anemic domain model” antipattern
https://www.martinfowler.com/bliki/AnemicDomainModel.html
