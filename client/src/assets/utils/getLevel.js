export const getLevel = (recipes, notes, popotes, comments) => {
  const total = recipes * 2 + notes + popotes + comments;
  if (total === 0) return "Nouveau";
  if (1 <= total && total <= 10) return "Curieux";
  if (11 <= total && total <= 20) return "Amateur";
  if (21 <= total && total <= 30) return "Confirmé";
  if (total > 40) return "Master";
};
