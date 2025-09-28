interface PatientDataProps {
  groupedRecords: Record<string, any[]>;
}

function PatientData({ groupedRecords }: PatientDataProps) {
  return (
    <div className="overflow-y-auto flex-[1] h-full bg-white rounded-sm border flex flex-col mr-4">
      <div>
        <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-gray-100 border-b border-gray-200 text-xs font-medium text-gray-700">
          <div className="col-span-2">Datum</div>
          <div className="col-span-1">Typ</div>
          <div className="col-span-9">Eintrag</div>
        </div>

        <div>
          {Object.entries(groupedRecords).map(
            ([dateKey, records], groupIndex) => (
              <div key={dateKey}>
                {records.map((record, recordIndex) => (
                  <div
                    key={`${record.typ}-${record.datum.getTime()}-${record.eintrag.slice(0, 20)}`}
                    className={`grid grid-cols-12 gap-2 px-3 py-2 text-xs hover:bg-gray-50 ${
                      groupIndex > 0 && recordIndex === 0
                        ? 'border-t border-gray-200'
                        : ''
                    }`}
                  >
                    <div className="col-span-2 text-gray-900 font-mono">
                      {recordIndex === 0 ? dateKey : ''}
                    </div>
                    <div className="col-span-1 text-gray-700 font-medium">
                      {record.typ}
                    </div>
                    <div className="col-span-9 text-gray-900">
                      {record.eintrag}
                    </div>
                  </div>
                ))}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientData;
