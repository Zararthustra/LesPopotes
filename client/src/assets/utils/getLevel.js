export const getLevel = (recipes, notes, popotes, comments) => {
  const total = recipes * 2 + notes + popotes + comments;
  if (total === 0) return "Nouveau";
  if (1 <= total <= 5) return "Curieux";
  if (6 <= total <= 10) return "Amateur";
  if (11 <= total <= 20) return "Confirmé";
  if (total > 20) return "Master";
};
