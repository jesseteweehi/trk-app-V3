export class StudentModel {
	constructor(
		public $key: string,
		public firstName: string,
		public lastName: string,
		public studentIdentification: string,
		public imageUrl: string, 
		){}

	static fromJsonList(array): StudentModel[] {
        return array.map( StudentModel.fromJson);
    }

    static fromJson({$key, firstName, lastName, studentIdentification, imageUrl}): StudentModel {
        return new StudentModel(
            $key,
            firstName,
            lastName,
            studentIdentification,
            imageUrl);
    }
}



