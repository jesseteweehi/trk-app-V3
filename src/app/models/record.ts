export class RecordModel {
	constructor(
		public $key: string,
        public created: Date,
        public modified: Date,
        public title: string,
        public content: string,

		){}

	static fromJsonList(array): RecordModel[] {
        return array.map( RecordModel.fromJson);
    }

    static fromJson({$key,
                     created,
                     modified,
                     title,
                     content,
        }): RecordModel {
        return new RecordModel(
            $key,
            created,
            modified,
            title,
            content);
    }
}