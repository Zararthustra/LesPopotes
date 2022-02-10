import { capitalize } from "../assets/utils/capitalize";
import { icons } from "../assets/utils/importIcons";

export const Comment = ({ comment, recipeAuthor }) => {
  const checkedAuthor = capitalize(comment.author) === capitalize(recipeAuthor)
  const userNote = comment.note;

  const date =
    comment.createdAt?.split("T")[0].split("-")[2] +
    "-" +
    comment.createdAt?.split("T")[0].split("-")[1] +
    "-" +
    comment.createdAt?.split("T")[0].split("-")[0];

  const noteIcon = () => {
    if (userNote === 1) return icons.like1;
    if (userNote === 2) return icons.like2;
    if (userNote === 3) return icons.like3;
    if (userNote === 4) return icons.like4;
    if (userNote === 5) return icons.like5;
    else return icons.like0;
  };

  if (checkedAuthor)
    return (
      <div className="comment authorComment">
        <div className="commentHeader">
          <div className="commentTop">
            <div className="commentDate">{date}</div>
            <div className="pseudoAuthorComment">
              {comment.author && capitalize(comment.author)}
            </div>
          </div>
          <div className="commentInfos"></div>
        </div>
        <div className="commentContent">
          <div>{comment.content && capitalize(comment.content)}</div>
        </div>
      </div>
    );
  if (comment.content !== "")
    return (
      <div className="comment notAuthorComment">
        <div className="commentHeader">
          <div className="commentTop">
            <div className="pseudoComment">
              {comment.author && capitalize(comment.author)}
            </div>
            <div className="commentDate">{date}</div>
          </div>
          <div className="commentInfos">
            {!userNote ? (
              <div></div>
            ) : (
              <img className="likeCommentImg" src={noteIcon()} alt="note" />
            )}
          </div>
        </div>
        <div className="commentContent">
          <div>{comment.content && capitalize(comment.content)}</div>
        </div>
      </div>
    );
  return "";
};
