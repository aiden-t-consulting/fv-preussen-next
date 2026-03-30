import type { PortableTextBlock } from "@/types";

interface PortableTextProps {
  value: PortableTextBlock[];
}

function renderBlock(block: PortableTextBlock): React.ReactNode {
  if (block._type === "block") {
    const text = (block.children ?? []).map((child) => {
      let node: React.ReactNode = child.text;

      if (child.marks?.includes("strong")) {
        node = <strong key={child._key}>{node}</strong>;
      }
      if (child.marks?.includes("em")) {
        node = <em key={child._key}>{node}</em>;
      }

      const linkMark = (block.markDefs ?? []).find(
        (def) => child.marks?.includes(def._key) && def._type === "link"
      );
      if (linkMark?.href) {
        node = (
          <a
            key={child._key}
            href={linkMark.href}
            target={linkMark.href.startsWith("http") ? "_blank" : undefined}
            rel={linkMark.href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {node}
          </a>
        );
      }

      return <span key={child._key}>{node}</span>;
    });

    if (block.listItem === "bullet") {
      return <li key={block._key}>{text}</li>;
    }
    if (block.listItem === "number") {
      return <li key={block._key}>{text}</li>;
    }

    switch (block.style) {
      case "h2":
        return <h2 key={block._key}>{text}</h2>;
      case "h3":
        return <h3 key={block._key}>{text}</h3>;
      case "h4":
        return <h4 key={block._key}>{text}</h4>;
      case "blockquote":
        return <blockquote key={block._key}>{text}</blockquote>;
      default:
        return <p key={block._key}>{text}</p>;
    }
  }

  return null;
}

export function PortableText({ value }: PortableTextProps) {
  // Group consecutive list items
  const groups: { type: "list" | "ol" | "block"; items: PortableTextBlock[] }[] = [];

  value.forEach((block) => {
    if (block.listItem === "bullet") {
      const last = groups[groups.length - 1];
      if (last?.type === "list") last.items.push(block);
      else groups.push({ type: "list", items: [block] });
    } else if (block.listItem === "number") {
      const last = groups[groups.length - 1];
      if (last?.type === "ol") last.items.push(block);
      else groups.push({ type: "ol", items: [block] });
    } else {
      groups.push({ type: "block", items: [block] });
    }
  });

  return (
    <div className="prose-article">
      {groups.map((group, i) => {
        if (group.type === "list") {
          return (
            <ul key={i}>
              {group.items.map(renderBlock)}
            </ul>
          );
        }
        if (group.type === "ol") {
          return (
            <ol key={i}>
              {group.items.map(renderBlock)}
            </ol>
          );
        }
        return group.items.map(renderBlock);
      })}
    </div>
  );
}
