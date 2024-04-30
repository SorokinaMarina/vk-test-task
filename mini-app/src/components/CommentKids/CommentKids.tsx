import { Group, MiniInfoCell, Paragraph } from "@vkontakte/vkui";
import { useState, useEffect } from "react";
import { getComments } from "../../utils/api";
import { IComment } from "../../utils/interface";
import { getDate } from "../../utils/constants";

interface CommentKids {
  item: number;
  setCountComment: React.Dispatch<React.SetStateAction<number>>;
}

export const CommentKids = ({ item, setCountComment }: CommentKids) => {
  const [commentKids, setCommentKids] = useState<IComment | null>(null);

  useEffect(() => {
    getComments(item).then((data: IComment) => {
      setCommentKids(data);
    });
  }, [item]);

  useEffect(() => {
    if (commentKids && !commentKids.text) {
      setCountComment((prev) => prev - 1);
    }
  }, [commentKids, setCountComment]);

  return (
    <div>
      {commentKids !== null && commentKids.text && (
        <Group style={{ marginLeft: 15 }}>
          <MiniInfoCell style={{ paddingTop: 15, paddingBottom: 0 }}>
            {commentKids.by}
          </MiniInfoCell>
          <MiniInfoCell style={{ paddingTop: 15 }}>
            {getDate(commentKids.time)}
          </MiniInfoCell>
          <Paragraph
            style={{
              paddingTop: 10,
              paddingBottom: 15,
              paddingLeft: 15,
              paddingRight: 15,
              display: "block",
            }}
          >
            {commentKids.text}
          </Paragraph>
        </Group>
      )}
    </div>
  );
};
