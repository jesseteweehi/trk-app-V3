export class SubjectModel {
	constructor(
		public $key: string,
		public code: string,
		public name: string,
		public faculty: string,
		public description: string, 
		){}

	static fromJsonList(array): SubjectModel[] {
        return array.map( SubjectModel.fromJson);
    }

    static fromJson({$key, code, name, faculty, description}): SubjectModel {
        return new SubjectModel(
            $key,
            code,
            name,
            faculty,
            description);
    }
}



