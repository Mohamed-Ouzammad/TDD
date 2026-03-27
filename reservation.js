export function createReservation(res, reservations) {

  if (res.end <= res.start) {
    throw new Error("Invalid dates");
  }

  for (let r of reservations) {
    if (res.start < r.end && res.end > r.start) {
      throw new Error("Overlap");
    }
  }

  reservations.push(res);
  return reservations;
}

export function cancelReservation(id, now, reservations) {
  const res = reservations.find(r => r.id === id);

  const diff = res.start - now;

  if (diff < 172800000) {
    throw new Error("Too late");
  }

  return reservations.filter(r => r.id !== id);
}

export function getActiveReservations(date, reservations) {
  return reservations.filter(r =>
    date >= r.start && date < r.end
  );
}