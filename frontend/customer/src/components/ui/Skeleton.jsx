const Skeleton = ({ height = 20 }) => {
  return (
    <div
      className="animate-pulse bg-border rounded"
      style={{ height }}
    />
  );
};

export default Skeleton;
