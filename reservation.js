let reservations = [];

export function createReservation(res) {
    
    if (!res.name) {
        throw new Error("Nom requis");
    }

    if (res.end <= res.start) {
        throw new Error("Date invalide");
    }

    for (let r of reservations) {
        if (res.start < r.end && res.end > r.start) {
            throw new Error("Chevauchement interdit");
        }
    }

    reservations.push(res);
    return reservations;
}

export function cancelReservation(id, now = new Date()) {
    const res = reservations.find(r => r.id === id);

    if (!res) {
        throw new Error("Réservation introuvable");
    }

    const diff = res.start - now;

    if (diff < 172800000) {
        throw new Error("Trop tard pour annuler");
    }

    reservations = reservations.filter(r => r.id !== id);
    return reservations;
}

export function getActiveReservations(date) {
    return reservations.filter(r =>
        date >= r.start && date < r.end
    );
}

export function resetReservations() {
    reservations = [];
}