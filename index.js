import { createReservation, getActiveReservations } from "./reservation";

createReservation({
  id: 1,
  name: "Test",
  start: new Date("2026-05-08"),
  end: new Date("2026-05-10")
});

const result = getActiveReservations(new Date("2026-05-09"));

console.log(result);