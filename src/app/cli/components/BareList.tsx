const BareList = ({ items }: { items: string[] }) => (
  <>
    {items.map((i, idx) => (
      <p key={idx}>{`-> ${i}`}</p>
    ))}
  </>
);

export default BareList;
