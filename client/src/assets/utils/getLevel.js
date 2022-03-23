export const getLevel = (recipes, notes, popotes, comments) => {
  const total = recipes * 1.5 + notes + popotes * 0.5 + comments;
  if (total < 5) return ["Visiteur", total];
  if (5 <= total && total <= 10) return ["Plongeur", total];
  if (11 <= total && total <= 20) return ["Apprenti", total];
  if (21 <= total && total < 40) return ["Commis", total];
  if (total >= 40) return ["Chef", total];
};
