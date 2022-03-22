export const getLevel = (recipes, notes, popotes, comments) => {
  const total = recipes * 2 + notes + popotes + comments;
  if (total < 5) return ["Nouveau", total];
  if (5 <= total && total <= 10) return ["Curieux", total];
  if (11 <= total && total <= 20) return ["Amateur", total];
  if (21 <= total && total < 40) return ["Habitué", total];
  if (total >= 40) return ["Maître", total];
};
