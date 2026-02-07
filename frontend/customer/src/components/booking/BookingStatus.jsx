const statusMap = {
  REQUESTED: "Requested",
  ACCEPTED: "Accepted",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled"
};

const BookingStatus = ({ status }) => {
  return (
    <div className="bg-card border border-border rounded p-4">
      <p className="text-lg font-semibold">
        Current Status
      </p>

      <p className="mt-2 text-primary font-bold">
        {statusMap[status] || status}
      </p>
    </div>
  );
};

export default BookingStatus;
