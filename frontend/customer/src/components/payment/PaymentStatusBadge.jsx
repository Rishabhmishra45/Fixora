const statusColor = {
  PAID: "text-green-600",
  PENDING: "text-yellow-500",
  OFFLINE_PENDING: "text-blue-500",
  FAILED: "text-red-500"
};

const PaymentStatusBadge = ({ status }) => {
  return (
    <span className={`font-semibold ${statusColor[status]}`}>
      {status.replace("_", " ")}
    </span>
  );
};

export default PaymentStatusBadge;
