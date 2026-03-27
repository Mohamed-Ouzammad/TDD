const TWO_DAYS = 48 * 60 * 60 * 1000;

function isOverlapping(a, b) {
  return a.start < b.end && a.end > b.start;
}

export function createReservation(res, reservations) {

  if (!res.name) {
    throw new Error("Name required");
  }

  if (res.end <= res.start) {
    throw new Error("Invalid dates");
  }

  for (let existing of reservations) {
    if (isOverlapping(res, existing)) {
      throw new Error("Overlap");
    }
  }

  return [...reservations, res];
}

export function cancelReservation(id, now, reservations) {
  const res = reservations.find(r => r.id === id);

  if (!res) {
    throw new Error("Not found");
  }

  const timeBeforeStart = res.start - now;

  if (timeBeforeStart < TWO_DAYS) {
    throw new Error("Too late");
  }

  return reservations.filter(r => r.id !== id);
}

export function getActiveReservations(date, reservations) {
  return reservations.filter(res =>
    date >= res.start && date < res.end
  );
}