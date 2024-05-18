const getTimeDifference = createdAt => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(createdAt)) / 1000);

  const units = [
    { unit: 'yr', value: 29030400 },
    { unit: 'm', value: 2419200 },
    { unit: 'w', value: 604800 },
    { unit: 'd', value: 86400 },
    { unit: 'h', value: 3600 },
    { unit: 'm', value: 60 },
    { unit: 's', value: 1 },
  ];

  for (const { unit, value } of units) {
    const amount = Math.floor(diffInSeconds / value);
    if (amount >= 1) {
      return `${amount}${unit} ago`;
    }
  }
};

module.exports = getTimeDifference;
