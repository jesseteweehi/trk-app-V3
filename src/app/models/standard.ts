export class StandardModel {
	constructor(
		public $key: string,
		public field: string,
		public subfield: string,
        public domain: string,
        public standardtype: string,
        public assessmenttype: string,
        public level: string,
        public number: string,
		public title: string,
		public credits: string, 
		){}

	static fromJsonList(array): StandardModel[] {
        return array.map( StandardModel.fromJson);
    }

    static fromJson({$key, 
                    field, 
                    subfield, 
                    domain, 
                    standardtype, 
                    assessmenttype, 
                    level,
                    number,
                    title,
                    credits
                }): StandardModel {
        return new StandardModel(
            $key,
            field,
            subfield,
            domain,
            standardtype,
            assessmenttype,
            level,
            number,
            title,
            credits);
    }
}