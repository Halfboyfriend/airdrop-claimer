export function formatAddress(addr) {
  if (!addr) return null;
  const address =
    addr.substring(0, 7) + "..." + addr.substring(35, addr.length);
  return address;
}

export function formatToTwoDecimalPlaces(number) {
  return parseFloat(number).toFixed(2);
}
export function reformatNumber(number) {
  if (number === null) return;
  if (number < 1000) {
    return number + " TH";
  } else if (number < 999999999) {
    return (number / 1000000).toFixed(2) + " M";
  } else if (number < 9999999999999) {
    return (number / 1000000000).toFixed(2) + " B";
  } else if (number < 9999999999999999) {
    return (number / 1000000000000).toFixed(2) + "T";
  } else {
    return;
  }
}

export function chakraToDollars(chakraAmount) {
  if (chakraAmount === null) return;
  if (chakraAmount) {
    const chakraToDollarRate = 0.000000001142;
    const dollarValue = chakraAmount * chakraToDollarRate;
    return dollarValue;
  }
}

export function DollarToChakra(chakraAmount) {
  if (chakraAmount === null) return;
  if (chakraAmount) {
    const eth = 719285964298.2149;
    const dollarValue = chakraAmount * eth;
    return dollarValue;
  }
}

export function getPercentage(total) {
  if (total === null) return;
  if (total) {
    const supply = 63000000000000;
    const percentag = (total / supply) * 100;
    return percentag.toFixed(2);
  }
}
export function calculateCountdown(lastLogin, callback) {
  function updateCountdown() {
    const lastLoginDate = new Date(lastLogin);
    const now = new Date();
    const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    const timeDifference = now - lastLoginDate;
    const timeRemaining = twentyFourHoursInMilliseconds - timeDifference;

    if (timeRemaining <= 0) {
      callback(`Claim Now`);
    } else {
      const hoursRemaining = Math.floor(timeRemaining / (60 * 60 * 1000));
      const minutesRemaining = Math.floor(
        (timeRemaining % (60 * 60 * 1000)) / (60 * 1000)
      );
      const secondsRemaining = Math.floor((timeRemaining % (60 * 1000)) / 1000);

      callback(`${hoursRemaining}:${minutesRemaining}:${secondsRemaining}`);
    }
  }

  const intervalId = setInterval(updateCountdown, 1000);
  return intervalId;
}
