interface SpecsTableProps {
  logicEngine: string;
  integrationHub: string;
  dataPrivacy: string;
  setupTime: string;
}

const SpecsTable = ({ logicEngine, integrationHub, dataPrivacy, setupTime }: SpecsTableProps) => {
  return (
    <div className="bg-white border border-black rounded-none overflow-hidden">
      <div className="grid grid-cols-2 divide-x divide-black divide-y divide-black">
        <div className="p-4 border-b border-black">
          <div className="font-semibold mb-1">Logic Engine:</div>
          <div className="font-mono text-sm">{logicEngine}</div>
        </div>
        <div className="p-4 border-b border-black">
          <div className="font-semibold mb-1">Integration Hub:</div>
          <div className="font-mono text-sm">{integrationHub}</div>
        </div>
        <div className="p-4 border-b border-black">
          <div className="font-semibold mb-1">Data Privacy:</div>
          <div className="font-mono text-sm">{dataPrivacy}</div>
        </div>
        <div className="p-4">
          <div className="font-semibold mb-1">Setup Time:</div>
          <div className="font-mono text-sm">{setupTime}</div>
        </div>
      </div>
    </div>
  );
};

export default SpecsTable;
