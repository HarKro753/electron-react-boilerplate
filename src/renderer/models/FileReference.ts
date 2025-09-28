export enum FileTypeEnum {
  ArztBrief = 'arztbrief', // if arztbrief is in name
  Krankmeldung = 'krankmeldung', // if krankmeldung is in name
  Rezept = 'rezept', // if rezept is in name
  Befundbericht = 'befundbericht', // if befundbericht is in name
  DigitalerPatientenAusweiss = 'patient', // If patient is in name
  EPA = 'epa', // Electronic Patient Records
}

export interface FileReference {
  id: number;
  name: string;
  url: string;
  fileType: FileTypeEnum;
}
