import { useEffect, useState } from "react";
import { NOTION_DRAFT_DB } from "../../config/index";
import { Client as NotionClient } from "@notionhq/client";

const notion = new NotionClient({ auth: process.env.NEXT_PUBLIC_NOTION_KEY });

export const useGetNotionDrafts = () => {
  const [drafts, setDrafts] = useState([]);
  useEffect(() => {
    getProposals(notion, NOTION_DRAFT_DB)
      .then(setDrafts)
      .catch((e) => console.log(e));
  }, []);
  return drafts;
};

async function getProposals(notion: any, database_id: any) {
  return notion.databases.query({
    database_id,
    filter: {
      property: "Status",
      rich_text: { contains: "Ready for Review" },
    },
  });
}
