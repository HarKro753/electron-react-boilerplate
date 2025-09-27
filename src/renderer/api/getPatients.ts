const mockEpaData = {
  Patient: {
    Name: 'Anna Mueller',
  },
  Diagnosen: [
    {
      datum: new Date('2024-03-15'),
      diagnose: 'M54.5',
      beschreibung: 'Rückenschmerzen',
      arzt: 'Dr. Schmidt',
    },
    {
      datum: new Date('2024-02-20'),
      diagnose: 'K59.0',
      beschreibung: 'Obstipation',
      arzt: 'Dr. Mueller',
    },
  ],
  Befunde: [
    {
      Datum: new Date('2024-03-10'),
      Typ: 0,
    },
    {
      Datum: new Date('2024-02-15'),
      Typ: 1,
    },
  ],
  Medikationen: [
    {
      startDatum: new Date('2024-03-15'),
      medikament: 'Ibuprofen',
      dosierung: '400mg 2x täglich',
      arzt: 'Dr. Schmidt',
    },
    {
      startDatum: new Date('2024-02-20'),
      medikament: 'Lactulose',
      dosierung: '15ml täglich',
      arzt: 'Dr. Mueller',
    },
  ],
  Impfungen: [
    {
      datum: new Date('2024-01-15'),
      impfung: 'COVID-19',
      hersteller: 'BioNTech',
    },
    {
      datum: new Date('2023-11-20'),
      impfung: 'Influenza',
      hersteller: 'Sanofi',
    },
  ],
};

export default function getEpaData() {
  return mockEpaData;
}
