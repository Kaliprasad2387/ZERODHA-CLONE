export const getPnL = (item) => {
  const investment =
    Number(item?.qty || 0) *
    Number(item?.avg || 0);

  const current =
    Number(item?.qty || 0) *
    Number(item?.price || 0);

  return current - investment;
};

export const getPnLPercent = (item) => {
  const investment =
    Number(item?.qty || 0) *
    Number(item?.avg || 0);

  if (investment <= 0) {
    return 0;
  }

  const pnl = getPnL(item);

  return (pnl / investment) * 100;
};