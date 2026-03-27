import { 
  createReservation, 
  cancelReservation, 
  getActiveReservations 
} from "../reservation";

describe("Reservation system", () => {


  test("should create a valid reservation", () => {
    const reservations = [];

    const result = createReservation({
      id: 1,
      name: "John",
      start: new Date("2026-05-08"),
      end: new Date("2026-05-10")
    }, reservations);

    expect(result.length).toBe(1);
  });

  test("should throw if end date is before start date", () => {
    const reservations = [];

    expect(() => createReservation({
      id: 1,
      name: "John",
      start: new Date("2026-05-10"),
      end: new Date("2026-05-08")
    }, reservations)).toThrow();
  });

  test("should throw if reservation overlaps", () => {
    const reservations = [{
      id: 1,
      start: new Date("2026-05-08"),
      end: new Date("2026-05-10")
    }];

    expect(() => createReservation({
      id: 2,
      start: new Date("2026-05-09"),
      end: new Date("2026-05-11")
    }, reservations)).toThrow();
  });


  test("should cancel reservation if more than 48h", () => {
    const reservations = [{
      id: 1,
      start: new Date(Date.now() + 72 * 60 * 60 * 1000)
    }];

    const result = cancelReservation(1, new Date(), reservations);

    expect(result.length).toBe(0);
  });

  test("should throw if cancel less than 48h", () => {
    const reservations = [{
      id: 1,
      start: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }];

    expect(() =>
      cancelReservation(1, new Date(), reservations)
    ).toThrow();
  });


  test("should return active reservations", () => {
    const reservations = [{
      id: 1,
      start: new Date("2026-05-08"),
      end: new Date("2026-05-10")
    }];

    const result = getActiveReservations(
      new Date("2026-05-09"),
      reservations
    );

    expect(result.length).toBe(1);
  });

});