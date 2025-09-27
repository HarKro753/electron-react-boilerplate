export interface Diagnose {
  datum: Date;
  diagnose: string;
  beschreibung: string;
  arzt: string;
}

export interface Befund {
  Datum: Date;
  Typ: number;
}

export interface Medikation {
  startDatum: Date;
  medikament: string;
  dosierung: string;
  arzt: string;
}

export interface Impfung {
  datum: Date;
  impfung: string;
  hersteller: string;
}

export interface Patient {
  id: number;
  name: string;
  birthDate: Date;
  lastVisit: Date;
  Diagnosen: Diagnose[];
  Befunde: Befund[];
  Medikationen: Medikation[];
  Impfungen: Impfung[];
}
