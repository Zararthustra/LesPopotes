export const getLevel = (recipes, notes, popotes, comments) => {
  const total = recipes * 2 + notes + popotes + comments;
  if (total < 5) return "Nouveau";
  if (5 <= total && total <= 10) return "Curieux";
  if (11 <= total && total <= 20) return "Amateur";
  if (21 <= total && total <= 30) return "Habitué";
  if (total > 40) return "Maître";
};
