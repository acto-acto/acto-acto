export type LinkedListItem = {
  title: string;
  link: string;
  isOpenSource?: boolean;
  openSourceLink?: string;
};

const LinkedList = ({ items }: { items: LinkedListItem[] }) => (
  <>
    {items.map((i, idx) => (
      <div
        key={idx}
        className="flex items-center gap-4 justify-between hover:bg-[#333]"
      >
        <p>{`-> ${i.title}`}</p>
        <div className="space-x-6">
          {i.isOpenSource && (
            <a
              href={i.openSourceLink ?? ""}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              view code
            </a>
          )}
          <a
            href={i.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            live view
          </a>
        </div>
      </div>
    ))}
  </>
);

export default LinkedList;
