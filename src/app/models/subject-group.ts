export class SubjectGroupModel {
	constructor(
		public $key: string,
		public name: string,
        public description: string,
		public timeframe: string 
		){}

	static fromJsonList(array): SubjectGroupModel[] {
        return array.map( SubjectGroupModel.fromJson);
    }

    static fromJson({$key, name, description, timeframe}): SubjectGroupModel {
        return new SubjectGroupModel(
            $key,
            name,
            description,
            timeframe);
    }
}

