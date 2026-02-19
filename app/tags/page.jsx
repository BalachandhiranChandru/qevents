'use client'
import Tag from "@/components/Tag";
import { useRouter } from "next/navigation";

const TagsPage = async () => {

  const router = useRouter();
  
  const data = await fetch("https://qevent-backend.labs.crio.do/tags");
  const tags = await data.json();
  
  
  return (
    <div className="h-[80vh] flex justify-center items-center">
      <div className="basis-3/4 p-4 flex justify-center flex-wrap gap-4">
        {tags.map((tag) => (
          <div onClick={() => router.push(`/events?tag=${tag.name}`)}>
          <Tag  text={tag.name} id={tag.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsPage;
