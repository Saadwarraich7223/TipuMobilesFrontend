import { ORDER_STATUSES, normalizeStatus } from "./orders.constants";

const StatusBadge = ({ status }) => {
  const key = normalizeStatus(status);
  const config = ORDER_STATUSES[key] || ORDER_STATUSES.all;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex shadow-sm 
 items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
    >
      <Icon size={14} />
      {config.label}
    </span>
  );
};

export default StatusBadge;
