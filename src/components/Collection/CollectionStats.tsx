const CollectionStatsCard: React.FC<{
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}> = ({ label, value, icon, color }) => (
  <div className="relative overflow-hidden border !border-border bg-card rounded-md  shadow-soft hover:shadow-soft-lg transition-all duration-300 group">
    <div
      className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
    <div className="relative p-6">
      <div className="flex items-center justify-between mb-2">
        <div
          className={`p-2.5 rounded-lg bg-gradient-to-br ${color} bg-opacity-10`}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-copy-primary mb-1">{value}</p>
      <p className="text-sm  font-medium !text-textPrimary">{label}</p>
    </div>
  </div>
);
export default CollectionStatsCard;
